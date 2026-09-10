import { queues, QUEUE_NAMES } from './queue';

export interface ProcessMessageJob {
  messageId: string;
  signalSourceId: string;
  providerId?: string;
}

export interface FanoutSignalJob {
  signalId: string;
}

export const signalQueue = {
  async addProcessMessage(job: ProcessMessageJob) {
    return queues[QUEUE_NAMES.SIGNAL_PROCESSING].add('process-message', job, {
      jobId: `msg-${job.messageId}`,
    });
  },

  async addFanoutSignal(job: FanoutSignalJob) {
    return queues[QUEUE_NAMES.SIGNAL_PROCESSING].add('fanout-signal', job, {
      jobId: `fanout-${job.signalId}`,
    });
  },
};