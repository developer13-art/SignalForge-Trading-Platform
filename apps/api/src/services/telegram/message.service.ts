import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';
import { signalQueue } from '../../queues/signal.queue';

export class TelegramMessageService {
  async ingestMessage(payload: {
    signalSourceId: string;
    externalMessageId: string;
    messageText: string;
    senderName?: string;
    receivedAt: string;
  }) {
    const message = await prisma.sourceMessage.upsert({
      where: {
        signalSourceId_externalMessageId: {
          signalSourceId: payload.signalSourceId,
          externalMessageId: payload.externalMessageId,
        },
      },
      create: {
        signalSourceId: payload.signalSourceId,
        externalMessageId: payload.externalMessageId,
        senderName: payload.senderName,
        messageText: payload.messageText,
        processingStatus: 'PENDING',
        receivedAt: new Date(payload.receivedAt),
      },
      update: {
        messageText: payload.messageText,
        processingStatus: 'PENDING',
      },
    });

    await signalQueue.addProcessMessage({
      messageId: message.id,
      signalSourceId: payload.signalSourceId,
    });

    logger.debug(`Telegram message ingested: ${message.id}`);
    return message;
  }
}

export const telegramMessageService = new TelegramMessageService();