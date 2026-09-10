import { prisma } from '../../config/database';

export class ExposureService {
  async getTotalExposure(userId: string): Promise<number> {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'OPEN' },
      select: { volume: true, entryPrice: true },
    });

    return trades.reduce((sum, t) => sum + t.volume * (t.entryPrice || 0), 0);
  }

  async getSymbolExposure(userId: string, symbol: string): Promise<number> {
    const trades = await prisma.trade.findMany({
      where: { userId, symbol, status: 'OPEN' },
      select: { volume: true, entryPrice: true },
    });

    return trades.reduce((sum, t) => sum + t.volume * (t.entryPrice || 0), 0);
  }
}

export const exposureService = new ExposureService();