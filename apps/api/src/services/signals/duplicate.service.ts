import crypto from 'crypto';
import { prisma } from '../../config/database';
import { redis } from '../../config/redis';

export class DuplicateService {
  generateFingerprint(signal: { symbol: string | null; direction: string | null; entryPrice: number | null }): string {
    const content = `${signal.symbol}:${signal.direction}:${signal.entryPrice || 0}`;
    return crypto.createHash('md5').update(content).digest('hex');
  }

  async isDuplicate(fingerprint: string, windowSeconds: number = 300): Promise<boolean> {
    const key = `signal_fp:${fingerprint}`;
    const exists = await redis.get(key);
    if (exists) return true;

    await redis.set(key, '1', 'EX', windowSeconds);
    return false;
  }

  async saveFingerprint(signalId: string, fingerprint: string): Promise<void> {
    await prisma.signalFingerprint.create({
      data: { signalId, fingerprint },
    });
  }
}

export const duplicateService = new DuplicateService();