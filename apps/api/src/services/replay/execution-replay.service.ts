import { prisma } from '../../config/database';

export class ExecutionReplayService {
  async replay(tradeId: string) {
    return prisma.tradeEvent.findMany({
      where: {
        tradeId,
        eventType: { in: ['EXECUTION_REQUESTED', 'EXECUTED'] },
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}

export const executionReplayService = new ExecutionReplayService();