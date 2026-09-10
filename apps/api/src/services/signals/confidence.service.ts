export class SignalConfidenceService {
  calculate(signal: Partial<any>): number {
    let score = 0.5;
    if (signal.symbol) score += 0.15;
    if (signal.direction) score += 0.15;
    if (signal.stopLoss) score += 0.1;
    if (signal.takeProfits?.length || signal.takeProfit1) score += 0.1;
    return Math.min(1, score);
  }

  meetsThreshold(confidence: number, minConfidence: number = 0.8): boolean {
    return confidence >= minConfidence;
  }
}

export const signalConfidenceService = new SignalConfidenceService();