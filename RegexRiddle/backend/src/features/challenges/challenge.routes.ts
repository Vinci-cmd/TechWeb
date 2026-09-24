import { FastifyInstance } from 'fastify';
import { ChallengeService } from './challenge.service.js';
export default async function challengeRoutes(server: FastifyInstance) {
  const challengeService = new ChallengeService(server.prisma);
  server.get('/', async (request, reply) => {
    const challenges = await challengeService.getChallenges();
    return challenges;
  });
  server.get('/:id', async (request, reply) => {
    const { id } = request.params as any;
    const challenge = await challengeService.getChallengeById(Number(id));
    if (!challenge) {
      return reply.code(404).send({ error: 'Challenge not found' });
    }
    return challenge;
  });
  server.register(async (protectedServer) => {
    protectedServer.addHook('onRequest', async (request, reply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.code(401).send({ error: 'Unauthorized' });
      }
    });
    protectedServer.post('/', async (request, reply) => {
      const { title, description, secretRegex, examplePositive, exampleNegative, controlPositive, controlNegative, difficulty } = request.body as any;
      const user = request.user as { id: number; username: string };
      try {
        const challenge = await challengeService.createChallenge(
          title,
          description,
          secretRegex,
          examplePositive,
          exampleNegative,
          controlPositive,
          controlNegative,
          user.id,
          difficulty
        );
        return reply.code(201).send(challenge);
      } catch (err: any) {
        return reply.code(400).send({ error: err.message });
      }
    });
    protectedServer.post('/attempts', async (request, reply) => {
      const { challengeId, regex } = request.body as any;
      const user = request.user as { id: number; username: string };
      try {
        const result = await challengeService.submitAttempt(user.id, Number(challengeId), regex);
        return reply.send(result);
      } catch (err: any) {
        return reply.code(400).send({ error: err.message });
      }
    });
  });
}