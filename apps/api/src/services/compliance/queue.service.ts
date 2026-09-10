import { prisma } from '../../config/database';

export class KycQueueService {
  async getQueue(status?: string) {
    return prisma.kycApplication.findMany({
      where: status ? { status } : { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getApplication(id: string) {
    return prisma.kycApplication.findUnique({
      where: { id },
      include: { documents: true, verifications: true, user: true },
    });
  }
}

export const kycQueueService = new KycQueueService();