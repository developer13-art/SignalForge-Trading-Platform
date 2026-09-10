import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { messageService } from '../services/sources/message.service';
import { aiQueue } from '../queues/ai.queue';
import { fanoutService } from '../services/signals/fanout.service';
import { logger } from '@signalforge/logger';

export function startSignalWorker() {
  return createWorker(QUEUE_NAMES.SIGNAL_PROCESSING, async (job: Job) => {
    switch (job.name) {
      case 'process-message': {
        const { messageId } = job.data;
        logger.info(`Processing message: ${messageId}`);
        
        // Send to AI queue
        await aiQueue.addProcessing({ messageId });
        
        return { messageId, status: 'queued' };
      }
      
      case 'fanout-signal': {
        const { signalId } = job.data;
        logger.info(`Fanning out signal: ${signalId}`);
        
        const result = await fanoutService.fanoutSignal(signalId);
        return result;
      }
      
      default:
        throw new Error(`Unknown job type: ${job.name}`);
    }
  });
}