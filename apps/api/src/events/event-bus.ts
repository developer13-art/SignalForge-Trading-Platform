import { redis } from '../config/redis';
import { logger } from '@signalforge/logger';

export type EventType =
  | 'SignalReceived'
  | 'SignalClassified'
  | 'SignalParsed'
  | 'SignalValidated'
  | 'ProviderDNALearned'
  | 'RiskApproved'
  | 'RiskRejected'
  | 'TradeExecuted'
  | 'TradeClosed'
  | 'SubscriptionCreated'
  | 'PaymentCompleted'
  | 'KycSubmitted'
  | 'KycApproved'
  | 'KycRejected'
  | 'ReferralRewardCreated'
  | 'NotificationSent';

export interface Event<T = any> {
  type: EventType;
  data: T;
  userId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class EventBus {
  private static instance: EventBus;

  private constructor() {}

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  async publish<T = any>(type: EventType, data: T, options?: { userId?: string; metadata?: Record<string, unknown> }) {
    const event: Event<T> = {
      type,
      data,
      userId: options?.userId,
      timestamp: new Date().toISOString(),
      metadata: options?.metadata,
    };

    await redis.publish('signalforge:events', JSON.stringify(event));
    logger.debug(`Event published: ${type}`);
  }

  async publishToUser<T = any>(userId: string, type: string, data: T) {
    await redis.publish('signalforge:events', JSON.stringify({
      type,
      userId,
      data,
      timestamp: new Date().toISOString(),
    }));
  }

  subscribe(handler: (event: Event) => void | Promise<void>) {
    const subscriber = redis.duplicate();
    
    subscriber.subscribe('signalforge:events');
    subscriber.on('message', async (channel, message) => {
      try {
        const event = JSON.parse(message);
        await handler(event);
      } catch (error) {
        logger.error('Event handler error:', error);
      }
    });

    return () => subscriber.unsubscribe('signalforge:events');
  }
}

export const eventBus = EventBus.getInstance();