import { prisma } from '../../config/database';
import { generateIdempotencyKey } from '../../utils/idempotency';
import { checkIdempotency } from '../../utils/idempotency';
import { logger } from '@signalforge/logger';
import { SourceMessagePayload } from '../../types/telegram.types';

export class MessageService {
  async ingestMessage(payload: SourceMessagePayload) {
    const idempotencyKey = generateIdempotencyKey(
      `msg:${payload.signalSourceId}`,
      payload.externalMessageId
    );

    // Check for duplicate
    const isNew = await checkIdempotency(idempotencyKey);
    if (!isNew) {
      logger.debug(`Duplicate message ignored: ${payload.externalMessageId}`);
      return null;
    }

    // Store raw message
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
        senderId: payload.senderId,
        senderName: payload.senderName,
        messageText: payload.messageText,
        mediaReference: payload.mediaReference,
        isEdited: payload.isEdited || false,
        isDeleted: payload.isDeleted || false,
        replyToMessageId: payload.replyToMessageId,
        processingStatus: 'PENDING',
        receivedAt: new Date(payload.receivedAt),
      },
      update: {
        messageText: payload.messageText,
        isEdited: payload.isEdited || false,
        isDeleted: payload.isDeleted || false,
        processingStatus: 'PENDING',
      },
    });

    logger.debug(`Message ingested: ${message.id}`);

    return message;
  }

  async getUserMessages(userId: string, sourceId?: string, limit: number = 50) {
    const where: any = {
      signalSource: { userId },
    };

    if (sourceId) {
      where.signalSourceId = sourceId;
    }

    return prisma.sourceMessage.findMany({
      where,
      include: {
        signalSource: {
          select: { name: true, sourceType: true },
        },
        signals: {
          select: {
            id: true,
            status: true,
            symbol: true,
            direction: true,
            confidence: true,
          },
        },
      },
      orderBy: { receivedAt: 'desc' },
      take: limit,
    });
  }

  async getMessageById(userId: string, messageId: string) {
    return prisma.sourceMessage.findFirst({
      where: {
        id: messageId,
        signalSource: { userId },
      },
      include: {
        signalSource: true,
        signals: true,
      },
    });
  }

  async markAsProcessed(messageId: string, status: string = 'PROCESSED') {
    await prisma.sourceMessage.update({
      where: { id: messageId },
      data: {
        processingStatus: status,
        processedAt: new Date(),
      },
    });
  }
}

export const messageService = new MessageService();