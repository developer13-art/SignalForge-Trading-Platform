import { prisma } from '../../config/database';

export class RankingService {
  async rankProviders() {
    const providers = await prisma.provider.findMany({ where: { isActive: true } });
    return providers.sort((a, b) => (b.qualityScore || 0) - (a.qualityScore || 0));
  }

  async rankTraders() {
    return prisma.traderProfile.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const rankingService = new RankingService();