import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class DiscordService {
  async connect(userId: string, oauthCode: string) {
    logger.info(`Connecting Discord for user ${userId}`);
    return prisma.signalSource.create({
      data: {
        userId,
        sourceType: 'DISCORD',
        name: 'Discord Source',
        isActive: true,
      },
    });
  }

  async getGuilds(userId: string) {
    return [];
  }

  async monitorChannel(channelId: string) {
    logger.info(`Monitoring Discord channel ${channelId}`);
  }
}

export const discordService = new DiscordService();