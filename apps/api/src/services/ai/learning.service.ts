import { prisma } from '../../config/database';
import { dnaService } from '../provider-dna/dna.service';
import { logger } from '@signalforge/logger';

export class LearningService {
  async learnFromMessage(providerId: string, messageText: string, parsedSignal: any) {
    logger.debug(`Learning from message for provider ${providerId}`);
    await dnaService.updateDnaFromMessage(providerId, messageText, parsedSignal);
  }

  async batchLearn(providerId: string, messages: string[]) {
    await dnaService.buildDnaFromMessages(providerId, messages);
  }
}

export const learningService = new LearningService();