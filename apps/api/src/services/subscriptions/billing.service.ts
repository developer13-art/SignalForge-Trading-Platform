import { subscriptionService } from './subscription.service';

export const billingService = {
  getUserSubscription: subscriptionService.getActiveSubscription.bind(subscriptionService),
};