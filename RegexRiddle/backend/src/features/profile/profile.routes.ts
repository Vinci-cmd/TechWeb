import { FastifyInstance } from 'fastify';
import { ProfileService } from './profile.service.js';
export default async function profileRoutes(server: FastifyInstance) {
  const profileService = new ProfileService(server.prisma);
  server.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err: any) {
      request.log.error(err, 'jwtVerify failed');
      reply.code(401).send({ error: 'Unauthorized', details: err.message });
    }
  });
  server.get('/stats', async (request, reply) => {
    const user = request.user as { id: number };
    try {
      const stats = await profileService.getStats(user.id);
      return reply.send(stats);
    } catch (err: any) {
      return reply.code(404).send({ error: err.message });
    }
  });
  server.put('/avatar', async (request, reply) => {
    const user = request.user as { id: number };
    const { avatar } = request.body as { avatar: string };
    try {
      const updated = await profileService.updateAvatar(user.id, avatar);
      return reply.send(updated);
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  });
}