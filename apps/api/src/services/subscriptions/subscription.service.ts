import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { addDays, addMonths, addYears, startOfDay, endOfDay } from '../../utils/date';

export class SubscriptionService {
  async getActiveSubscription(userId: string) {
    return prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ['ACTIVE', 'TRIAL', 'GRACE_PERIOD'] },
        currentPeriodEnd: { gt: new Date() },
      },
      include: {
        plan: true,
      },
    });
  }

  async getSubscriptionHistory(userId: string) {
    return prisma.subscription.findMany({
      where: { userId },
      include: {
        plan: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSubscription(
    userId: string,
    planId: string,
    paymentRef?: string,
    autoRenew: boolean = false
  ) {
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    });

    if (!plan || !plan.isActive) {
      throw new AppError('Subscription plan not found or inactive', 404);
    }

    // Check if user already has an active subscription
    const existingSubscription = await this.getActiveSubscription(userId);
    if (existingSubscription) {
      throw new AppError('User already has an active subscription', 409);
    }

    const now = new Date();
    let periodEnd: Date;

    switch (plan.period) {
      case 'MONTHLY':
        periodEnd = addMonths(now, 1);
        break;
      case 'YEARLY':
        periodEnd = addYears(now, 1);
        break;
      case 'LIFETIME':
        periodEnd = addYears(now, 100);
        break;
      case 'ENTERPRISE':
        periodEnd = addYears(now, 1);
        break;
      default:
        periodEnd = addMonths(now, 1);
    }

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        planId,
        status: 'ACTIVE',
        startDate: now,
        endDate: periodEnd,
        autoRenew,
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
      },
      include: {
        plan: true,
      },
    });

    logger.info(`Subscription created for user ${userId}: ${plan.name}`);

    return subscription;
  }

  async renewSubscription(subscriptionId: string) {
    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { plan: true },
    });

    if (!subscription) {
      throw new AppError('Subscription not found', 404);
    }

    const now = new Date();
    let periodEnd: Date;

    switch (subscription.plan.period) {
      case 'MONTHLY':
        periodEnd = addMonths(now, 1);
        break;
      case 'YEARLY':
        periodEnd = addYears(now, 1);
        break;
      case 'LIFETIME':
        periodEnd = addYears(now, 100);
        break;
      default:
        periodEnd = addMonths(now, 1);
    }

    return prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'ACTIVE',
        currentPeriodStart: now,
        currentPeriodEnd: periodEnd,
        endDate: periodEnd,
      },
    });
  }

  async cancelSubscription(userId: string, reason?: string) {
    const subscription = await this.getActiveSubscription(userId);

    if (!subscription) {
      throw new AppError('No active subscription found', 404);
    }

    const updated = await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'CANCELLED',
        cancelledAt: new Date(),
        autoRenew: false,
      },
    });

    logger.info(`Subscription cancelled for user ${userId}: ${subscription.id}`);

    return updated;
  }

  async checkExpiredSubscriptions() {
    const now = new Date();
    const expiredSubscriptions = await prisma.subscription.findMany({
      where: {
        status: 'ACTIVE',
        currentPeriodEnd: { lt: now },
      },
    });

    for (const subscription of expiredSubscriptions) {
      await prisma.subscription.update({
        where: { id: subscription.id },
        data: { status: 'EXPIRED' },
      });

      logger.info(`Subscription ${subscription.id} marked as EXPIRED`);
    }

    return expiredSubscriptions.length;
  }

  async getUserSubscriptionStatus(userId: string) {
    const subscription = await this.getActiveSubscription(userId);

    return {
      hasActiveSubscription: Boolean(subscription),
      subscription: subscription ? {
        id: subscription.id,
        planId: subscription.planId,
        planName: subscription.plan.name,
        status: subscription.status,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        currentPeriodEnd: subscription.currentPeriodEnd,
        autoRenew: subscription.autoRenew,
      } : null,
    };
  }
}

export const subscriptionService = new SubscriptionService();