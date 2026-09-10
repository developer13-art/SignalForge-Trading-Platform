import { subscriptionService } from '../services/subscriptions/subscription.service';
import { logger } from '@signalforge/logger';

export async function runSubscriptionRenewalCheck() {
  logger.info('Running subscription renewal check');
  const expired = await subscriptionService.checkExpiredSubscriptions();
  logger.info(`Marked ${expired} subscriptions as expired`);
  return { expired };
}

export async function runSubscriptionRenewals() {
  logger.info('Processing subscription renewals');
  // Renewal logic would be handled by payment provider webhooks
  return { renewed: 0 };
}