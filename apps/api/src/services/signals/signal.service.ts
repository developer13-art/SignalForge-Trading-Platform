import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';

export class SignalService {
  async getLive(userId: string, limit: number = 50) {
    return prisma.signal.findMany({
      where: { sourceMessage: { signalSource: { userId } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getHistory(userId: string, limit: number = 200) {
    return prisma.signal.findMany({
      where: { sourceMessage: { signalSource: { userId } } },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getById(userId: string, signalId: string) {
    const signal = await prisma.signal.findFirst({
      where: {
        id: signalId,
        sourceMessage: { signalSource: { userId } },
      },
      include: { parses: true, validations: true },
    });
    if (!signal) throw new AppError('Signal not found', 404);
    return signal;
  }

  async getProviderSignals(providerId: string) {
    return prisma.signal.findMany({
      where: { providerId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}

export const signalService = new SignalService();