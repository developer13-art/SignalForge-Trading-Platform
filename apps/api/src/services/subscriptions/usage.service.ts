import { prisma } from '../../config/database';

export class UsageService {
  async getUsage(userId: string) {
    const [signalSources, brokerAccounts] = await Promise.all([
      prisma.signalSource.count({ where: { userId } }),
      prisma.brokerAccount.count({ where: { userId } }),
    ]);

    return {
      signalSources,
      brokerAccounts,
      aiCalls: 0,
      apiRequests: 0,
    };
  }
}

export const usageService = new UsageService();