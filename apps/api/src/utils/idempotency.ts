// apps/api/src/utils/idempotency.ts
import { redis } from '../config/redis';
import crypto from 'crypto';

export async function checkIdempotency(key: string): Promise<boolean> {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  const redisKey = `idempotency:${hash}`;
  
  const result = await redis.set(redisKey, '1', 'EX', 86400, 'NX');
  return result === 'OK';
}

export async function releaseIdempotency(key: string): Promise<void> {
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  const redisKey = `idempotency:${hash}`;
  await redis.del(redisKey);
}

export function generateIdempotencyKey(source: string, messageId: string): string {
  return `${source}:${messageId}`;
}