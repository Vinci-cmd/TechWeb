import { PrismaClient } from '@prisma/client';
export class ProfileService {
  constructor(private prisma: PrismaClient) {}
  async getStats(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        createdChallenges: true,
        attempts: true,
      },
    });
    if (!user) throw new Error('User not found');
    const createdCount = user.createdChallenges.length;
    const attemptsCount = user.attempts.length;
    const successfulAttempts = user.attempts.filter((a) => a.isSuccess);
    const solvedChallengeIds = new Set(successfulAttempts.map((a) => a.challengeId));
    const solvedCount = solvedChallengeIds.size;
    return {
      username: user.username,
      avatar: user.avatar,
      createdCount,
      attemptsCount,
      solvedCount,
    };
  }
  async updateAvatar(userId: number, avatarUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
      select: { id: true, username: true, avatar: true },
    });
  }
}