import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';

export class ReviewService {
  async getReviewQueue(status?: string) {
    return prisma.kycApplication.findMany({
      where: status ? { status } : {},
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
        documents: {
          include: {
            documentType: true,
          },
        },
        verifications: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getApplicationForReview(applicationId: string) {
    return prisma.kycApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
            profile: true,
          },
        },
        documents: {
          include: {
            documentType: true,
          },
        },
        verifications: true,
      },
    });
  }

  async getReviewStats() {
    const [
      total,
      pending,
      underReview,
      verified,
      rejected,
      suspended,
    ] = await Promise.all([
      prisma.kycApplication.count(),
      prisma.kycApplication.count({ where: { status: 'PENDING' } }),
      prisma.kycApplication.count({ where: { status: 'UNDER_REVIEW' } }),
      prisma.kycApplication.count({ where: { status: 'VERIFIED' } }),
      prisma.kycApplication.count({ where: { status: 'REJECTED' } }),
      prisma.kycApplication.count({ where: { status: 'SUSPENDED' } }),
    ]);

    return {
      total,
      pending,
      underReview,
      verified,
      rejected,
      suspended,
    };
  }
}

export const reviewService = new ReviewService();