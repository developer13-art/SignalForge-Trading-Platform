import { prisma } from '../../config/database';

export class PositionService {
  async getOpenPositions(userId: string) {
    return prisma.trade.findMany({
      where: { userId, status: 'OPEN' },
    });
  }

  async getPositionById(userId: string, positionId: string) {
    return prisma.trade.findFirst({
      where: { id: positionId, userId, status: 'OPEN' },
    });
  }

  async getPositionsBySymbol(userId: string, symbol: string) {
    return prisma.trade.findMany({
      where: { userId, symbol, status: 'OPEN' },
    });
  }
}

export const positionService = new PositionService();