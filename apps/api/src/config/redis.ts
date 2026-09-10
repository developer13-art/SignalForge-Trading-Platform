import { Redis } from 'ioredis';
import { env } from './env';
import { logger } from '@signalforge/logger';

// Main Redis client (for caching, pub/sub, general use)
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  logger.info('✅ Redis connected successfully');
});

redis.on('error', (error) => {
  logger.error('❌ Redis connection error:', error);
});

redis.on('ready', () => {
  logger.info('Redis is ready to accept commands');
});

// BullMQ requires maxRetriesPerRequest: null for blocking operations
export const bullRedis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

bullRedis.on('connect', () => {
  logger.debug('✅ BullMQ Redis connected');
});

bullRedis.on('error', (error) => {
  logger.error('❌ BullMQ Redis error:', error);
});

export default redis;