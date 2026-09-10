import { prisma } from '../../config/database';

export class ComplianceService {
  async getKycStats() {
    const [total, pending, underReview, verified, rejected] = await Promise.all([
      prisma.kycApplication.count(),
      prisma.kycApplication.count({ where: { status: 'PENDING' } }),
      prisma.kycApplication.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.kycApplication.count({ where: { status: 'VERIFIED' } }),
      prisma.kycApplication.count({ where: { status: 'REJECTED' } }),
    ]);
    return { total, pending, underReview, verified, rejected };
  }
}

export const complianceService = new ComplianceService();