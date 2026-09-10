import { prisma } from '../../config/database';

export class LatencyService {
  async getExecutionLatency(userId: string) {
    const events = await prisma.tradeEvent.findMany({
      where: {
        trade: { userId },
        eventType: { in: ['EXECUTION_REQUESTED', 'EXECUTED'] },
      },
      orderBy: { createdAt: 'asc' },
    });

    const latencies: number[] = [];
    const requests: Record<string, Date> = {};

    for (const event of events) {
      if (event.eventType === 'EXECUTION_REQUESTED') {
        requests[event.tradeId] = event.createdAt;
      } else if (event.eventType === 'EXECUTED' && requests[event.tradeId]) {
        latencies.push(event.createdAt.getTime() - requests[event.tradeId].getTime());
      }
    }

    if (latencies.length === 0) return { avg: 0, min: 0, max: 0, p95: 0 };

    latencies.sort((a, b) => a - b);
    return {
      avg: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      min: latencies[0],
      max: latencies[latencies.length - 1],
      p95: latencies[Math.floor(latencies.length * 0.95)],
    };
  }
}

export const latencyService = new LatencyService();