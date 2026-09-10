import { prisma } from '../../config/database';

export class RiskProfileService {
  async getOrCreate(userId: string) {
    let profile = await prisma.riskProfile.findUnique({ where: { userId } });
    if (!profile) {
      profile = await prisma.riskProfile.create({
        data: {
          userId,
          riskPercent: 1,
          maxDailyLoss: 3,
          maxDrawdown: 10,
          maxOpenTrades: 5,
        },
      });
    }
    return profile;
  }

  async update(userId: string, data: any) {
    return prisma.riskProfile.update({
      where: { userId },
      data,
    });
  }
}

export const riskProfileService = new RiskProfileService();