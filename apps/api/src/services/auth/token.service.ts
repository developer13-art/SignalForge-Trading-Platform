import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '../../config/env';
import { prisma } from '../../config/database';
import { JwtPayload } from '../../types/auth.types';
import { logger } from '@signalforge/logger';

export class TokenService {
  generateAccessToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'access' },
      env.JWT_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
    );
  }

  generateRefreshToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email, type: 'refresh' },
      env.JWT_REFRESH_SECRET,
      { expiresIn: env.JWT_REFRESH_EXPIRES_IN }
    );
  }

  generateTokens(userId: string, email: string) {
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

  /**
   * Creates a session. Stores the ACCESS token hash in `tokenHash`
   * (validated by auth middleware) and the REFRESH token hash in
   * `refreshToken` (used for refresh flow validation).
   */
  async createSession(
    userId: string,
    tokens: { accessToken: string; refreshToken: string },
    deviceInfo?: Record<string, unknown>,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.userSession.create({
      data: {
        userId,
        tokenHash: this.hashToken(tokens.accessToken),
        refreshToken: this.hashToken(tokens.refreshToken),
        deviceInfo: deviceInfo || {},
        ipAddress,
        userAgent,
        expiresAt,
      },
    });
  }

  /**
   * Rotates tokens for an existing session.
   * Called by /auth/refresh. Updates the SAME session row
   * so future access-token validations succeed.
   */
  async rotateSession(
    sessionId: string,
    tokens: { accessToken: string; refreshToken: string }
  ): Promise<void> {
    await prisma.userSession.update({
      where: { id: sessionId },
      data: {
        tokenHash: this.hashToken(tokens.accessToken),
        refreshToken: this.hashToken(tokens.refreshToken),
        lastSeenAt: new Date(),
      },
    });
  }

  /**
   * Validates an access token by looking up its hash in user_sessions.
   */
  async validateAccessToken(accessToken: string, userId: string): Promise<boolean> {
    const tokenHash = this.hashToken(accessToken);
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

  /**
   * Finds a session by the refresh token hash (used during /auth/refresh).
   */
  async findSessionByRefreshToken(refreshToken: string, userId: string) {
    const refreshHash = this.hashToken(refreshToken);
    return prisma.userSession.findFirst({
      where: {
        userId,
        refreshToken: refreshHash,
        revokedAt: null,
        expiresAt: { gt: new Date() },
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
}

export const tokenService = new TokenService();
