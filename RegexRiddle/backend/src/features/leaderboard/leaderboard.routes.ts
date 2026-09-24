import { FastifyInstance } from 'fastify';
import { LeaderboardService } from './leaderboard.service.js';
export default async function leaderboardRoutes(server: FastifyInstance) {
  const leaderboardService = new LeaderboardService(server.prisma);
  server.get('/', async (request, reply) => {
    try {
      const board = await leaderboardService.getLeaderboard();
      return reply.send(board);
    } catch (err: any) {
      return reply.code(500).send({ error: err.message });
    }
  });
}