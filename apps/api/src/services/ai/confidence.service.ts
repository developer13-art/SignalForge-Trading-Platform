import { ParsedSignal } from '../../types/ai.types';

export class ConfidenceService {
  calculateSignalConfidence(signal: Partial<ParsedSignal>): number {
    let score = 0.5; // Base

    // Symbol detection
    if (signal.symbol) score += 0.15;

    // Direction detection
    if (signal.action) score += 0.15;

    // Stop loss present
    if (signal.stopLoss) score += 0.1;

    // Take profit present
    if (signal.takeProfits && signal.takeProfits.length > 0) score += 0.1;

    // Entry price present (for limit orders)
    if (signal.entryPrice) score += 0.05;

    return Math.min(1, score);
  }

  calculateParseConfidence(signal: ParsedSignal, providerDnaConfidence?: number): number {
    let confidence = signal.confidence;

    // Boost confidence if we have Provider DNA
    if (providerDnaConfidence && providerDnaConfidence > 0.8) {
      confidence = Math.min(1, confidence + 0.05);
    }

    // Reduce confidence if critical fields are missing
    if (!signal.symbol) confidence *= 0.5;
    if (!signal.action) confidence *= 0.5;

    return confidence;
  }

  shouldExecute(signal: ParsedSignal, minConfidence: number = 0.8): boolean {
    return signal.confidence >= minConfidence && signal.action !== null && signal.symbol !== null;
  }
}

export const confidenceService = new ConfidenceService();