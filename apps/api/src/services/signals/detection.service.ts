import { interpretationService } from '../ai/interpretation.service';
import { logger } from '@signalforge/logger';

export class DetectionService {
  async detectSignals(messages: string[]): Promise<Array<{ text: string; isSignal: boolean; classification: string }>> {
    const results = await Promise.all(
      messages.map(async (text) => {
        const result = await interpretationService.classifyMessage(text);
        return {
          text,
          isSignal: ['NEW_TRADE', 'TRADE_MANAGEMENT'].includes(result.classification),
          classification: result.classification,
        };
      })
    );
    logger.debug(`Detected ${results.filter(r => r.isSignal).length} signals`);
    return results;
  }
}

export const detectionService = new DetectionService();