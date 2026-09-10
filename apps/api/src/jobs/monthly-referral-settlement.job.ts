import { referralSettlementService } from '../services/referrals/settlement.service';
import { referralQueue } from '../queues/referral.queue';
import { logger } from '@signalforge/logger';
import { startOfMonth, endOfMonth } from '../utils/date';

export async function runMonthlyReferralSettlement() {
  const now = new Date();
  const periodStart = startOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));
  const periodEnd = endOfMonth(new Date(now.getFullYear(), now.getMonth() - 1, 1));

  logger.info(`Running monthly referral settlement for ${periodStart} to ${periodEnd}`);

  try {
    const result = await referralSettlementService.settle(periodStart, periodEnd);
    logger.info(`Referral settlement complete: ${result.count} rewards, $${result.total}`);
    return result;
  } catch (error) {
    logger.error('Referral settlement failed:', error);
    throw error;
  }
}

export async function scheduleMonthlyReferralSettlement() {
  await referralQueue.addMonthlySettlement(
    new Date().toISOString(),
    new Date().toISOString()
  );
  logger.info('Monthly referral settlement scheduled');
}