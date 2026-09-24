import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
export class AuthService {
  constructor(private prisma: PrismaClient) {}
  async register(username: string, passwordPlain: string) {
    const existing = await this.prisma.user.findUnique({ where: { username } });
    if (existing) {
      throw new Error('Utente Già Esistente');
    }
    const hash = await argon2.hash(passwordPlain, { type: argon2.argon2id });
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hash
      }
    });
    return { id: user.id, username: user.username, avatar: user.avatar };
  }
  async login(username: string, passwordPlain: string) {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) {
      throw new Error('Credenziali invalide');
    }
    const isValid = await argon2.verify(user.password, passwordPlain);
    if (!isValid) {
      throw new Error('Credenziali invalide');
    }
    return { id: user.id, username: user.username, avatar: user.avatar };
  }
}