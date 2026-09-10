import { queues, QUEUE_NAMES } from './queue';

export interface AiProcessJob {
  messageId: string;
  priority?: number;
}

export const aiQueue = {
  async addProcessing(job: AiProcessJob) {
    return queues[QUEUE_NAMES.AI_PROCESSING].add('process-message', job, {
      jobId: `ai-${job.messageId}`,
      priority: job.priority || 0,
    });
  },

  async addDnaLearning(providerId: string, messages: string[]) {
    return queues[QUEUE_NAMES.AI_PROCESSING].add('learn-dna', {
      providerId,
      messages,
    });
  },
};