import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class EmailSourceService {
  async connect(userId: string, email: string) {
    return prisma.signalSource.create({
      data: {
        userId,
        sourceType: 'EMAIL',
        name: 'Email Source',
        isActive: true,
        config: { email },
      },
    });
  }

  async processIncoming(email: any) {
    logger.info(`Processing incoming email from ${email.from}`);
  }
}

export const emailSourceService = new EmailSourceService();