import { prisma } from '../../config/database';

export class MarketplaceSubscriptionService {
  async subscribe(userId: string, providerId: string, planId?: string) {
    return prisma.providerSubscription.create({
      data: { userId, providerId, isActive: true },
    });
  }

  async unsubscribe(userId: string, providerId: string) {
    await prisma.providerSubscription.updateMany({
      where: { userId, providerId },
      data: { isActive: false },
    });
  }

  async getUserSubscriptions(userId: string) {
    return prisma.providerSubscription.findMany({
      where: { userId, isActive: true },
      include: { provider: true },
    });
  }
}

export const marketplaceSubscriptionService = new MarketplaceSubscriptionService();