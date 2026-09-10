import { prisma } from '../../config/database';

export class ProviderCertificationService {
  async getCertification(providerId: string) {
    return prisma.providerCertification.findFirst({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async startCertification(providerId: string) {
    return prisma.providerCertification.create({
      data: { providerId, status: 'PENDING' },
    });
  }
}

export const providerCertificationService = new ProviderCertificationService();