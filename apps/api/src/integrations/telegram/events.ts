import { telegramMessageService } from '../../services/telegram/message.service';
import { logger } from '@signalforge/logger';

export const telegramEvents = {
  async onNewMessage(payload: {
    sourceId: string;
    messageId: string;
    text: string;
    senderName?: string;
  }) {
    try {
      await telegramMessageService.ingestMessage({
        signalSourceId: payload.sourceId,
        externalMessageId: payload.messageId,
        messageText: payload.text,
        senderName: payload.senderName,
        receivedAt: new Date().toISOString(),
      });
    } catch (error) {
      logger.error('Failed to ingest Telegram message:', error);
    }
  },

  onMessageEdited(payload: any) {
    logger.info('Telegram message edited', payload);
  },

  onMessageDeleted(payload: any) {
    logger.info('Telegram message deleted', payload);
  },
};

export default telegramEvents;