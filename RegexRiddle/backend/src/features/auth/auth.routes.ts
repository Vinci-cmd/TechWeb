import { FastifyInstance } from 'fastify';
import { AuthService } from './auth.service.js';
export default async function authRoutes(server: FastifyInstance) {
  server.post('/register', async (request, reply) => {
    const authService = new AuthService(server.prisma);
    const { username, password } = request.body as any;
    try {
      const user = await authService.register(username, password);
      const token = server.jwt.sign({ id: user.id, username: user.username });
      return reply.code(201).send({ user, token });
    } catch (err: any) {
      return reply.code(400).send({ error: err.message });
    }
  });
  server.post('/login', async (request, reply) => {
    const authService = new AuthService(server.prisma);
    const { username, password } = request.body as any;
    try {
      const user = await authService.login(username, password);
      const token = server.jwt.sign({ id: user.id, username: user.username });
      return reply.send({ user, token });
    } catch (err: any) {
      return reply.code(401).send({ error: err.message });
    }
  });
}