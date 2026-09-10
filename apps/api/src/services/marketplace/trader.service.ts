import { prisma } from '../../config/database';

export class MarketplaceTraderService {
  async list() {
    return prisma.traderProfile.findMany({
      where: { isPublic: true },
    });
  }

  async getById(id: string) {
    return prisma.traderProfile.findUnique({
      where: { id },
      include: { followers: true },
    });
  }
}

export const marketplaceTraderService = new MarketplaceTraderService();