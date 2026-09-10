import { prisma } from '../../config/database';

export class TelegramChannelService {
  async discoverChannels(userId: string) {
    // In production, this queries the Telegram API using the user's session
    return [];
  }

  async selectChannel(userId: string, channelId: string, isMonitored: boolean) {
    return prisma.telegramChannel.update({
      where: { id: channelId },
      data: { isMonitored },
    });
  }

  async listMonitoredChannels(userId: string) {
    return prisma.telegramChannel.findMany({
      where: {
        isMonitored: true,
        telegramConnection: { userId },
      },
    });
  }
}

export const telegramChannelService = new TelegramChannelService();