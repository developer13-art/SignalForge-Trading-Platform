import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class InterventionService {
  async logIntervention(tradeId: string, userId: string, type: string, metadata?: any) {
    const event = await prisma.tradeEvent.create({
      data: {
        tradeId,
        eventType: type,
        actor: 'USER',
        metadata: { userId, ...metadata },
      },
    });
    logger.info(`Manual intervention logged: ${type} on trade ${tradeId}`);
    return event;
  }

  async getUserInterventions(userId: string) {
    return prisma.tradeEvent.findMany({
      where: {
        actor: 'USER',
        trade: { userId },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}

export const interventionService = new InterventionService();