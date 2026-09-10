import { dnaService } from './dna.service';
import { logger } from '@signalforge/logger';

export class DnaTrainingService {
  async trainFromHistory(providerId: string, messages: string[]) {
    if (messages.length < 10) {
      logger.warn(`Insufficient messages for training provider ${providerId}`);
      return;
    }
    await dnaService.buildDnaFromMessages(providerId, messages);
    logger.info(`DNA training complete for provider ${providerId}`);
  }

  async retrain(providerId: string) {
    logger.info(`Retraining provider DNA: ${providerId}`);
  }
}

export const dnaTrainingService = new DnaTrainingService();