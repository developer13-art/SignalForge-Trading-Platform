import { prisma } from '../../config/database';

export class RiskBehaviorService {
  async analyzeRiskStyle(providerId: string) {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    return (dna?.riskStyle as any) || {};
  }

  async updateRiskStyle(providerId: string, riskStyle: any) {
    await prisma.providerDna.update({
      where: { providerId },
      data: { riskStyle },
    });
  }
}

export const riskBehaviorService = new RiskBehaviorService();