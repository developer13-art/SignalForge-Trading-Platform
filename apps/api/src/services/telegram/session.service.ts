import { prisma } from '../../config/database';
import { encrypt, decrypt } from '../../utils/encryption';

export class TelegramSessionService {
  async saveSession(userId: string, sessionToken: string, phoneNumber: string): Promise<void> {
    await prisma.telegramConnection.upsert({
      where: { id: userId },
      create: {
        userId,
        sessionToken: encrypt(sessionToken),
        phoneNumber: encrypt(phoneNumber),
        apiId: process.env.TELEGRAM_API_ID || '',
        apiHash: process.env.TELEGRAM_API_HASH || '',
        isConnected: true,
        lastConnectedAt: new Date(),
      },
      update: {
        sessionToken: encrypt(sessionToken),
        phoneNumber: encrypt(phoneNumber),
        isConnected: true,
        lastConnectedAt: new Date(),
      },
    });
  }

  async getSession(userId: string): Promise<string | null> {
    const connection = await prisma.telegramConnection.findFirst({
      where: { userId, isConnected: true },
    });
    if (!connection) return null;
    try {
      return decrypt(connection.sessionToken);
    } catch {
      return null;
    }
  }

  async disconnect(userId: string): Promise<void> {
    await prisma.telegramConnection.updateMany({
      where: { userId },
      data: { isConnected: false },
    });
  }
}

export const telegramSessionService = new TelegramSessionService();