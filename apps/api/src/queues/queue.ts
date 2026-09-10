import { Queue, QueueOptions, Worker, WorkerOptions, Job } from 'bullmq';
import { bullRedis } from '../config/redis';
import { logger } from '@signalforge/logger';

const defaultQueueOptions: QueueOptions = {
  connection: bullRedis,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: {
      age: 24 * 3600,
      count: 1000,
    },
    removeOnFail: {
      age: 7 * 24 * 3600,
    },
  },
};

export const QUEUE_NAMES = {
  SIGNAL_PROCESSING: 'signal-processing',
  AI_PROCESSING: 'ai-processing',
  EXECUTION: 'execution',
  NOTIFICATION: 'notification',
  ANALYTICS: 'analytics',
  REFERRAL: 'referral',
  KYC: 'kyc',
  ACCOUNT_SYNC: 'account-sync',
  PROVIDER_DNA: 'provider-dna',
} as const;

export type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];

export const queues: Record<QueueName, Queue> = {
  [QUEUE_NAMES.SIGNAL_PROCESSING]: new Queue(QUEUE_NAMES.SIGNAL_PROCESSING, defaultQueueOptions),
  [QUEUE_NAMES.AI_PROCESSING]: new Queue(QUEUE_NAMES.AI_PROCESSING, defaultQueueOptions),
  [QUEUE_NAMES.EXECUTION]: new Queue(QUEUE_NAMES.EXECUTION, defaultQueueOptions),
  [QUEUE_NAMES.NOTIFICATION]: new Queue(QUEUE_NAMES.NOTIFICATION, defaultQueueOptions),
  [QUEUE_NAMES.ANALYTICS]: new Queue(QUEUE_NAMES.ANALYTICS, defaultQueueOptions),
  [QUEUE_NAMES.REFERRAL]: new Queue(QUEUE_NAMES.REFERRAL, defaultQueueOptions),
  [QUEUE_NAMES.KYC]: new Queue(QUEUE_NAMES.KYC, defaultQueueOptions),
  [QUEUE_NAMES.ACCOUNT_SYNC]: new Queue(QUEUE_NAMES.ACCOUNT_SYNC, defaultQueueOptions),
  [QUEUE_NAMES.PROVIDER_DNA]: new Queue(QUEUE_NAMES.PROVIDER_DNA, defaultQueueOptions),
};

export function createWorker(
  name: QueueName,
  processor: (job: Job) => Promise<any>,
  options?: Partial<WorkerOptions>
): Worker {
  const worker = new Worker(name, processor, {
    connection: bullRedis,
    concurrency: 5,
    ...options,
  });

  worker.on('completed', (job) => {
    logger.debug(`Job completed: ${name} #${job.id}`);
  });

  worker.on('failed', (job, err) => {
    logger.error(`Job failed: ${name} #${job?.id}: ${err.message}`);
  });

  return worker;
}

export async function closeAllQueues() {
  await Promise.all(Object.values(queues).map(q => q.close()));
}