import { Job } from 'bullmq';
import { createWorker, QUEUE_NAMES } from '../queues/queue';
import { prisma } from '../config/database';
import { getWsServer } from '../websocket/websocket.server';
import { logger } from '@signalforge/logger';

export function startNotificationWorker() {
  return createWorker(QUEUE_NAMES.NOTIFICATION, async (job: Job) => {
    switch (job.name) {
      case 'send-notification': {
        const { userId, type, title, message, channels } = job.data;
        
        // Save notification
        const notification = await prisma.notification.create({
          data: {
            userId,
            type,
            title,
            message,
            channels: channels || ['IN_APP'],
          },
        });
        
        // Send real-time via WebSocket
        try {
          const ws = getWsServer();
          await ws.emitNotification(userId, notification);
        } catch (error) {
          logger.debug('WebSocket notification failed (non-critical)');
        }
        
        return notification;
      }
      
      case 'send-email': {
        // Email implementation would go here
        logger.info(`Email would be sent to ${job.data.to}`);
        return { sent: true };
      }
      
      default:
        throw new Error(`Unknown job: ${job.name}`);
    }
  });
}