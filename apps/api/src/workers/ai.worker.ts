import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { aiService } from '../services/ai/ai.service';
import { dnaService } from '../services/provider-dna/dna.service';
import { signalQueue } from '../queues/signal.queue';
import { logger } from '@signalforge/logger';

export function startAiWorker() {
  return createWorker(QUEUE_NAMES.AI_PROCESSING, async (job: Job) => {
    switch (job.name) {
      case 'process-message': {
        const { messageId } = job.data;
        
        const result = await aiService.processMessage(messageId);
        
        // If signal created, trigger fanout
        if (result.signal) {
          await signalQueue.addFanoutSignal({ signalId: result.signal.id });
        }
        
        return result;
      }
      
      case 'learn-dna': {
        const { providerId, messages } = job.data;
        await dnaService.buildDnaFromMessages(providerId, messages);
        return { providerId, status: 'learned' };
      }
      
      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  }, { concurrency: 3 });
}