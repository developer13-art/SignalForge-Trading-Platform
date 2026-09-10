import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { prisma } from '../../config/database';
import { env } from '../../config/env';

export class PasswordService {
  private readonly SALT_ROUNDS = 12;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  async generateResetToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

    await prisma.userSession.deleteMany({
      where: { userId, tokenHash: { startsWith: 'reset_' } },
    });

    await prisma.userSession.create({
      data: {
        userId,
        tokenHash: `reset_${token}`,
        expiresAt,
      },
    });

    return token;
  }

  async validateResetToken(token: string): Promise<string | null> {
    const session = await prisma.userSession.findFirst({
      where: {
        tokenHash: `reset_${token}`,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return null;
    }

    return session.userId;
  }

  async consumeResetToken(token: string): Promise<void> {
    await prisma.userSession.updateMany({
      where: { tokenHash: `reset_${token}` },
      data: { revokedAt: new Date() },
    });
  }

  generateStrongPassword(length: number = 16): string {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }
}

export const passwordService = new PasswordService();