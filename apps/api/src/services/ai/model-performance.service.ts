import { prisma } from '../../config/database';

export class ModelPerformanceService {
  async getStats() {
    const totalParses = await prisma.signalParse.count();
    const avgConfidence = await prisma.signalParse.aggregate({
      _avg: { confidence: true },
    });

    return {
      totalParses,
      avgConfidence: avgConfidence._avg.confidence || 0,
    };
  }

  async getLatencyStats() {
    const parses = await prisma.signalParse.findMany({
      where: { latencyMs: { not: null } },
      select: { latencyMs: true },
    });

    if (parses.length === 0) return { avg: 0, min: 0, max: 0 };

    const latencies = parses.map(p => p.latencyMs!);
    return {
      avg: latencies.reduce((a, b) => a + b, 0) / latencies.length,
      min: Math.min(...latencies),
      max: Math.max(...latencies),
    };
  }
}

export const modelPerformanceService = new ModelPerformanceService();