import crypto from 'crypto';
import { prisma } from '../../config/database';

export class VerificationService {
  generateOtp(length: number = 6): string {
    return crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
  }

  async generateEmailVerificationToken(userId: string): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

    await prisma.userSession.create({
      data: {
        userId,
        tokenHash: `verify_${token}`,
        expiresAt,
      },
    });

    return token;
  }

  async verifyEmailToken(token: string): Promise<string | null> {
    const session = await prisma.userSession.findFirst({
      where: {
        tokenHash: `verify_${token}`,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    if (!session) {
      return null;
    }

    await prisma.userSession.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });

    return session.userId;
  }
}

export const verificationService = new VerificationService();