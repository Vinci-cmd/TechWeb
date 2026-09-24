import { PrismaClient } from '@prisma/client';
import { AttemptEvaluator } from '../../regex/attempt-evaluator.js';
export class ChallengeService {
  constructor(private prisma: PrismaClient) {}
  async createChallenge(
    title: string,
    description: string,
    secretRegex: string,
    examplePositive: string,
    exampleNegative: string,
    positiveChecks: string[],
    negativeChecks: string[],
    creatorId: number,
    difficulty: string = 'Facile'
  ) {
    if (!positiveChecks || positiveChecks.length === 0 || !negativeChecks || negativeChecks.length === 0) {
      throw new Error('Must provide at least one positive and one negative check string.');
    }
    const userExists = await this.prisma.user.findUnique({ where: { id: creatorId } });
    if (!userExists) {
      throw new Error('Invalid or expired session. User does not exist in the database. Please logout and login again.');
    }
    return this.prisma.challenge.create({
      data: {
        title,
        description,
        secretRegex,
        examplePositive,
        exampleNegative,
        positiveChecks,
        negativeChecks,
        difficulty,
        creatorId
      }
    });
  }
  async getChallenges() {
    return this.prisma.challenge.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        examplePositive: true,
        exampleNegative: true,
        difficulty: true,
        creator: {
          select: {
            username: true
          }
        },
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }
  async getChallengeById(id: number) {
    return this.prisma.challenge.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        examplePositive: true,
        exampleNegative: true,
        difficulty: true,
        creatorId: true,
        creator: {
          select: {
            username: true
          }
        },
        createdAt: true,
        updatedAt: true,
        attempts: true // We need this to check if solved in frontend
      }
    });
  }
  async submitAttempt(userId: number, challengeId: number, regex: string) {
    const challenge = await this.prisma.challenge.findUnique({
      where: { id: challengeId }
    });
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    if (challenge.creatorId === userId) {
      throw new Error('Non puoi giocare alle tue stesse sfide.');
    }
    const previousSuccess = await this.prisma.attempt.findFirst({
      where: {
        userId,
        challengeId,
        isSuccess: true
      }
    });
    if (previousSuccess) {
      throw new Error('Hai già risolto questa sfida.');
    }
    const evaluation = AttemptEvaluator.evaluate(
      regex,
      challenge.positiveChecks,
      challenge.negativeChecks
    );
    const attempt = await this.prisma.attempt.create({
      data: {
        userId,
        challengeId,
        regex,
        isSuccess: evaluation.isSuccess
      }
    });
    return {
      attempt,
      evaluation
    };
  }
}