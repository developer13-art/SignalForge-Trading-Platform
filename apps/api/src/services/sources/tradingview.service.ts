import { prisma } from '../../config/database';
import crypto from 'crypto';
import { logger } from '@signalforge/logger';

export class TradingViewService {
  async createWebhook(userId: string, name: string) {
    const source = await prisma.signalSource.create({
      data: {
        userId,
        sourceType: 'TRADINGVIEW',
        name,
        isActive: true,
        config: { secret: crypto.randomBytes(16).toString('hex') },
      },
    });
    logger.info(`TradingView webhook created: ${source.id}`);
    return source;
  }

  async receiveAlert(sourceId: string, payload: any) {
    logger.info(`TradingView alert received for source ${sourceId}`);
    return payload;
  }

  verifySignature(payload: string, signature: string, secret: string): boolean {
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    return expected === signature;
  }
}

export const tradingViewService = new TradingViewService();