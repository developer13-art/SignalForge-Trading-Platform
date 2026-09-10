import { prisma } from '../../config/database';

export class SymbolAnalyticsService {
  async getPerformanceBySymbol(userId: string) {
    const trades = await prisma.trade.findMany({
      where: { userId, status: 'CLOSED' },
      select: { symbol: true, realizedProfit: true },
    });

    const bySymbol: Record<string, { trades: number; pnl: number; wins: number }> = {};
    for (const t of trades) {
      if (!bySymbol[t.symbol]) bySymbol[t.symbol] = { trades: 0, pnl: 0, wins: 0 };
      bySymbol[t.symbol].trades++;
      bySymbol[t.symbol].pnl += t.realizedProfit || 0;
      if ((t.realizedProfit || 0) > 0) bySymbol[t.symbol].wins++;
    }

    return Object.entries(bySymbol).map(([symbol, data]) => ({
      symbol,
      ...data,
      winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0,
    }));
  }
}

export const symbolAnalyticsService = new SymbolAnalyticsService();