import { prisma } from '../../config/database';
import { encrypt, decrypt } from '../../utils/encryption';

export class TelegramSessionManager {
  async saveSession(userId: string, phoneNumber: string, sessionToken: string): Promise<void> {
    const encryptedSession = encrypt(sessionToken);
    const encryptedPhone = encrypt(phoneNumber);

    await prisma.telegramConnection.upsert({
      where: { id: userId },
      create: {
        userId,
        sessionToken: encryptedSession,
        phoneNumber: encryptedPhone,
        apiId: process.env.TELEGRAM_API_ID || '',
        apiHash: process.env.TELEGRAM_API_HASH || '',
        isConnected: true,
        lastConnectedAt: new Date(),
      },
      update: {
        sessionToken: encryptedSession,
        isConnected: true,
        lastConnectedAt: new Date(),
      },
    });
  }

  async getSession(userId: string): Promise<string | null> {
    const connection = await prisma.telegramConnection.findUnique({
      where: { id: userId },
    });

    if (!connection || !connection.isConnected) {
      return null;
    }

    try {
      return decrypt(connection.sessionToken);
    } catch (error) {
      return null;
    }
  }

  async disconnect(userId: string): Promise<void> {
    await prisma.telegramConnection.updateMany({
      where: { userId },
      data: {
        isConnected: false,
        sessionToken: '',
      },
    });
  }

  async getConnection(userId: string) {
    return prisma.telegramConnection.findFirst({
      where: { userId },
      include: {
        channels: true,
      },
    });
  }
}

export const telegramSessionManager = new TelegramSessionManager();