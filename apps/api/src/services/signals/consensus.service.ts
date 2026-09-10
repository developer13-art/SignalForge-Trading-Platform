import { prisma } from '../../config/database';

export class ConsensusService {
  async computeConsensus(symbol: string, windowMinutes: number = 60) {
    const since = new Date(Date.now() - windowMinutes * 60 * 1000);

    const signals = await prisma.signal.findMany({
      where: {
        symbol,
        createdAt: { gte: since },
        status: { in: ['VALIDATED', 'APPROVED'] },
      },
    });

    const buys = signals.filter(s => s.direction === 'BUY');
    const sells = signals.filter(s => s.direction === 'SELL');

    const direction = buys.length > sells.length ? 'BUY' : sells.length > buys.length ? 'SELL' : null;
    const confidence = Math.max(buys.length, sells.length) / Math.max(1, signals.length);

    if (direction) {
      const consensus = await prisma.signalConsensus.create({
        data: {
          symbol,
          direction,
          confidence,
          agreement: Math.max(buys.length, sells.length),
          totalVotes: signals.length,
        },
      });

      for (const signal of signals) {
        await prisma.signalConsensusMember.create({
          data: {
            consensusId: consensus.id,
            signalId: signal.id,
            providerId: signal.providerId || 'unknown',
            direction: signal.direction || 'UNKNOWN',
            confidence: signal.confidence || 0,
          },
        });
      }

      return consensus;
    }

    return null;
  }
}

export const consensusService = new ConsensusService();