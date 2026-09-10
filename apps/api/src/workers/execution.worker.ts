import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { executionService } from '../services/trading/execution.service';
import { notificationQueue } from '../queues/notification.queue';
import { logger } from '@signalforge/logger';

export function startExecutionWorker() {
  return createWorker(QUEUE_NAMES.EXECUTION, async (job: Job) => {
    switch (job.name) {
      case 'execute-trade': {
        const result = await executionService.executeSignal(job.data);
        
        if (result.success) {
          await notificationQueue.addNotification({
            userId: job.data.userId,
            type: 'TRADE',
            title: 'Trade Executed',
            message: `${job.data.direction} ${job.data.symbol} ${job.data.volume} lots executed`,
          });
        } else {
          await notificationQueue.addNotification({
            userId: job.data.userId,
            type: 'TRADE',
            title: 'Trade Failed',
            message: `Failed to execute ${job.data.symbol}: ${result.error}`,
          });
        }
        
        return result;
      }
      
      case 'close-position': {
        const result = await executionService.closePosition(
          job.data.userId,
          job.data.tradeId,
          job.data.volume
        );
        
        await notificationQueue.addNotification({
          userId: job.data.userId,
          type: 'TRADE',
          title: 'Position Closed',
          message: `Position closed successfully`,
        });
        
        return result;
      }
      
      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  }, { concurrency: 10 });
}