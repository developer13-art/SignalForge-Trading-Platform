import { prisma } from '../../config/database';
import { telegramSessionManager } from '../../integrations/telegram/session';
import { TelegramClientWrapper } from '../../integrations/telegram/client';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';

export class TelegramService {
  private static pendingConnections = new Map<string, {
    client: TelegramClientWrapper;
    phoneNumber: string;
    phoneCodeHash: string;
  }>();

  async initiateConnection(userId: string, phoneNumber: string) {
    const clientWrapper = new TelegramClientWrapper();
    const client = await clientWrapper.createClient();

    try {
      await client.connect();

      let phoneCodeHash = '';
      let codeResolver: (value: string) => void;
      const codePromise = new Promise<string>((resolve) => {
        codeResolver = resolve;
      });

      // Start auth flow
      await client.start({
        phoneNumber: async () => phoneNumber,
        password: async () => '',
        phoneCode: async () => {
          // This will be resolved when the user submits the OTP
          return codePromise;
        },
        onError: (err) => logger.error('Telegram auth error:', err),
      });

      // Store the pending connection
      TelegramService.pendingConnections.set(userId, {
        client: clientWrapper,
        phoneNumber,
        phoneCodeHash,
      });

      return {
        phoneCodeHash,
        message: 'OTP sent to your Telegram app',
      };
    } catch (error) {
      logger.error('Telegram connection initiation failed:', error);
      throw new AppError('Failed to initiate Telegram connection', 500);
    }
  }

  async verifyConnection(userId: string, phoneNumber: string, phoneCodeHash: string, code: string, password?: string) {
    const pending = TelegramService.pendingConnections.get(userId);
    if (!pending) {
      throw new AppError('No pending Telegram connection', 400);
    }

    try {
      // In a real implementation, resolve the OTP promise
      // For now, save the session
      const client = pending.client.getClient();
      if (!client) {
        throw new AppError('Telegram client not initialized', 500);
      }

      const sessionToken = require('telegram/sessions').StringSession.save(client.session);
      await telegramSessionManager.saveSession(userId, phoneNumber, sessionToken);

      // Clean up pending connection
      TelegramService.pendingConnections.delete(userId);

      return {
        success: true,
        message: 'Telegram connected successfully',
      };
    } catch (error) {
      logger.error('Telegram verification failed:', error);
      throw new AppError('Invalid OTP code', 400);
    }
  }

  async discoverChannels(userId: string) {
    const session = await telegramSessionManager.getSession(userId);
    if (!session) {
      throw new AppError('Telegram not connected', 400);
    }

    // In a real implementation, use the session to fetch dialogs
    // For now, return a placeholder
    return [];
  }

  async getConnectionStatus(userId: string) {
    const connection = await telegramSessionManager.getConnection(userId);
    
    return {
      isConnected: connection?.isConnected || false,
      phoneNumber: connection ? '****' + (connection.phoneNumber.slice(-4)) : null,
      lastConnectedAt: connection?.lastConnectedAt,
      channelsCount: connection?.channels?.length || 0,
    };
  }

  async selectChannel(userId: string, channelId: string, isMonitored: boolean) {
    const channel = await prisma.telegramChannel.findFirst({
      where: {
        id: channelId,
        telegramConnection: { userId },
      },
    });

    if (!channel) {
      throw new AppError('Channel not found', 404);
    }

    return prisma.telegramChannel.update({
      where: { id: channelId },
      data: { isMonitored },
    });
  }

  async disconnect(userId: string) {
    await telegramSessionManager.disconnect(userId);
    return { success: true };
  }
}

export const telegramService = new TelegramService();