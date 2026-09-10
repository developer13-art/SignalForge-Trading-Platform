import { prisma } from '../../config/database';

export class MarketplaceProviderService {
  async list(filters?: any) {
    return prisma.provider.findMany({
      where: { isActive: true, ...filters },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    return prisma.provider.findUnique({
      where: { id },
      include: { reviews: true, certifications: true },
    });
  }

  async search(query: string) {
    return prisma.provider.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }
}

export const marketplaceProviderService = new MarketplaceProviderService();