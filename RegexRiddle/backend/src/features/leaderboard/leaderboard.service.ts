import { PrismaClient } from '@prisma/client';
export class LeaderboardService {
  constructor(private prisma: PrismaClient) {}
  async getLeaderboard() {
    const users = await this.prisma.user.findMany({
      include: {
        attempts: true,
      },
    });
    const leaderboard = users.map((user) => {
      const successfulAttempts = user.attempts.filter((a) => a.isSuccess);
      const solvedChallengeIds = new Set(successfulAttempts.map((a) => a.challengeId));
      const enigmasSolved = solvedChallengeIds.size;
      const totalAttempts = user.attempts.length;
      const avgAttempts = enigmasSolved > 0 ? totalAttempts / enigmasSolved : 0;
      return {
        userId: user.id,
        username: user.username,
        avatar: user.avatar,
        enigmasSolved,
        totalAttempts,
        avgAttempts,
      };
    });
    leaderboard.sort((a, b) => {
      if (b.enigmasSolved !== a.enigmasSolved) {
        return b.enigmasSolved - a.enigmasSolved;
      }
      return a.avgAttempts - b.avgAttempts;
    });
    return leaderboard;
  }
}