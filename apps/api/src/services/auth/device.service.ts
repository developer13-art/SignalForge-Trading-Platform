import { prisma } from '../../config/database';

export class DeviceService {
  async getUserSessions(userId: string) {
    return prisma.userSession.findMany({
      where: {
        userId,
        revokedAt: null,
        tokenHash: { not: { startsWith: 'reset_' } },
        tokenHash: { not: { startsWith: 'verify_' } },
      },
      orderBy: { lastSeenAt: 'desc' },
      select: {
        id: true,
        deviceInfo: true,
        ipAddress: true,
        userAgent: true,
        lastSeenAt: true,
        createdAt: true,
        expiresAt: true,
      },
    });
  }

  async revokeSession(userId: string, sessionId: string): Promise<boolean> {
    const session = await prisma.userSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      return false;
    }

    await prisma.userSession.update({
      where: { id: sessionId },
      data: { revokedAt: new Date() },
    });

    return true;
  }

  async revokeAllOtherSessions(userId: string, currentSessionId: string): Promise<void> {
    await prisma.userSession.updateMany({
      where: {
        userId,
        id: { not: currentSessionId },
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }
}

export const deviceService = new DeviceService();