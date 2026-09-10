import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { JwtPayload } from '../../types/auth.types';
import { logger } from '@signalforge/logger';

export class TokenService {
  generateAccessToken(userId: string, email: string): string {
    const payload: JwtPayload = {
      userId,
      email,
      type: 'access',
    };

    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    });
  }

  generateRefreshToken(userId: string, email: string): string {
    const payload: JwtPayload = {
      userId,
      email,
      type: 'refresh',
    };

    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    });
  }

  generateTokens(userId: string, email: string): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.generateAccessToken(userId, email),
      refreshToken: this.generateRefreshToken(userId, email),
    };
  }

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
  }

  verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, env.JWT_REFRESH_SECRET) as JwtPayload;
  }

  hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  async createSession(userId: string, refreshToken: string, deviceInfo?: Record<string, unknown>, ipAddress?: string, userAgent?: string): Promise<void> {
    const tokenHash = this.hashToken(refreshToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await prisma.userSession.create({
      data: {
        userId,
        tokenHash,
        refreshToken: this.hashToken(refreshToken),
        deviceInfo: deviceInfo || {},
        ipAddress,
        userAgent,
        expiresAt,
      },
    });
  }

  async revokeSession(sessionId: string): Promise<void> {
    await prisma.userSession.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });
  }

  async revokeAllSessions(userId: string): Promise<void> {
    await prisma.userSession.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }

  async validateSession(tokenHash: string, userId: string): Promise<boolean> {
    const session = await prisma.userSession.findFirst({
      where: {
        userId,
        tokenHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
      },
    });

    return Boolean(session);
  }
}

export const tokenService = new TokenService();