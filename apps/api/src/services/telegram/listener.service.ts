import { telegramChannelService } from './channel.service';
import { telegramMessageService } from './message.service';
import { logger } from '@signalforge/logger';

export class TelegramListenerService {
  private isRunning = false;

  async start(userId: string) {
    this.isRunning = true;
    logger.info(`Telegram listener started for user ${userId}`);
    const channels = await telegramChannelService.listMonitoredChannels(userId);
    logger.info(`Monitoring ${channels.length} channels`);
  }

  async stop(userId: string) {
    this.isRunning = false;
    logger.info(`Telegram listener stopped for user ${userId}`);
  }

  async handleIncomingMessage(sourceId: string, message: any) {
    return telegramMessageService.ingestMessage({
      signalSourceId: sourceId,
      externalMessageId: message.id,
      messageText: message.text,
      senderName: message.senderName,
      receivedAt: new Date().toISOString(),
    });
  }
}

export const telegramListenerService = new TelegramListenerService();