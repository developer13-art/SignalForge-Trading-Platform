import { queues, QUEUE_NAMES } from './queue';

export interface SendNotificationJob {
  userId: string;
  type: string;
  title: string;
  message: string;
  channels?: string[];
  metadata?: Record<string, unknown>;
}

export const notificationQueue = {
  async addNotification(job: SendNotificationJob) {
    return queues[QUEUE_NAMES.NOTIFICATION].add('send-notification', job);
  },

  async addEmail(to: string, subject: string, html: string) {
    return queues[QUEUE_NAMES.NOTIFICATION].add('send-email', { to, subject, html });
  },
};