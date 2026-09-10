import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class WhatsAppService {
  async connect(userId: string, sessionData: any) {
    logger.info(`Connecting WhatsApp for user ${userId}`);
    return prisma.signalSource.create({
      data: {
        userId,
        sourceType: 'WHATSAPP',
        name: 'WhatsApp Source',
        isActive: true,
      },
    });
  }

  async monitorGroup(groupId: string) {
    logger.info(`Monitoring WhatsApp group ${groupId}`);
  }
}

export const whatsappService = new WhatsAppService();