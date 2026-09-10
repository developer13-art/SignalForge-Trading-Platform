import { queues, QUEUE_NAMES } from './queue';
import { TradeExecutionRequest } from '../types/execution.types';

export const executionQueue = {
  async addExecution(request: TradeExecutionRequest, priority: number = 0) {
    return queues[QUEUE_NAMES.EXECUTION].add('execute-trade', request, {
      priority,
      jobId: `exec-${request.signalId}-${request.userId}`,
    });
  },

  async addClosePosition(userId: string, tradeId: string, volume?: number) {
    return queues[QUEUE_NAMES.EXECUTION].add('close-position', {
      userId,
      tradeId,
      volume,
    });
  },
};