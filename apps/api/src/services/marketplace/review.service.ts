import { prisma } from '../../config/database';

export class ReviewService {
  async create(providerId: string, userId: string, rating: number, comment?: string) {
    return prisma.review.create({
      data: { providerId, userId, rating, comment },
    });
  }

  async listForProvider(providerId: string) {
    return prisma.review.findMany({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAverageRating(providerId: string): Promise<number> {
    const reviews = await prisma.review.findMany({
      where: { providerId },
      select: { rating: true },
    });
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }
}

export const reviewService = new ReviewService();