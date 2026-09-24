import Fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from './core/db/prisma.js';
import authRoutes from './features/auth/auth.routes.js';
import challengeRoutes from './features/challenges/challenge.routes.js';
import leaderboardRoutes from './features/leaderboard/leaderboard.routes.js';
import profileRoutes from './features/profile/profile.routes.js';
import fastifyJwt from '@fastify/jwt';
const server = Fastify({ logger: true });
server.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
});
server.register(fastifyJwt, {
  secret: 'supersecret_change_me_in_production' // In prod, use process.env.JWT_SECRET
});
server.register(prismaPlugin);
server.register(authRoutes, { prefix: '/api/auth' });
server.register(challengeRoutes, { prefix: '/api/challenges' });
server.register(leaderboardRoutes, { prefix: '/api/leaderboard' });
server.register(profileRoutes, { prefix: '/api/profile' });
server.get('/health', async () => {
  return { status: 'ok' };
});
const start = async () => {
  try {
    await server.listen({ port: 3001, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3001');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();