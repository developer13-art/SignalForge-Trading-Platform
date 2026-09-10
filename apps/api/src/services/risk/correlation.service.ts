const CORRELATION_GROUPS = [
  ['EURUSD', 'GBPUSD', 'AUDUSD', 'NZDUSD'],
  ['USDJPY', 'USDCHF', 'USDCAD'],
  ['XAUUSD', 'XAGUSD'],
];

export class CorrelationService {
  async checkCorrelation(userId: string, newSymbol: string): Promise<boolean> {
    const openTrades = await (await import('../../config/database')).prisma.trade.findMany({
      where: { userId, status: 'OPEN' },
      select: { symbol: true },
    });

    const openSymbols = openTrades.map(t => t.symbol);
    const group = CORRELATION_GROUPS.find(g => g.includes(newSymbol));
    if (!group) return true;

    const correlatedCount = openSymbols.filter(s => group.includes(s) && s !== newSymbol).length;
    return correlatedCount < 2;
  }
}

export const correlationService = new CorrelationService();