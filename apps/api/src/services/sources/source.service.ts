import { prisma } from '../../config/database';
import { AppError } from '../../middleware/error.middleware';
import { CreateSignalSourceRequest, UpdateSignalSourceRequest } from '../../types/source.types';

export class SourceService {
  async createSource(userId: string, data: CreateSignalSourceRequest) {
    const source = await prisma.signalSource.create({
      data: {
        userId,
        name: data.name,
        sourceType: data.sourceType,
        config: (data.config || {}) as any,
        isActive: true,
      },
    });

    return source;
  }

  async getUserSources(userId: string) {
    return prisma.signalSource.findMany({
      where: { userId },
      include: {
        channels: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSourceById(userId: string, sourceId: string) {
    const source = await prisma.signalSource.findFirst({
      where: { id: sourceId, userId },
      include: {
        channels: true,
        messages: {
          take: 50,
          orderBy: { receivedAt: 'desc' },
        },
      },
    });

    if (!source) {
      throw new AppError('Signal source not found', 404);
    }

    return source;
  }

  async updateSource(userId: string, sourceId: string, data: UpdateSignalSourceRequest) {
    const source = await prisma.signalSource.findFirst({
      where: { id: sourceId, userId },
    });

    if (!source) {
      throw new AppError('Signal source not found', 404);
    }

    return prisma.signalSource.update({
      where: { id: sourceId },
      data: {
        name: data.name,
        isActive: data.isActive,
        config: data.config as any,
      },
    });
  }

  async deleteSource(userId: string, sourceId: string) {
    const source = await prisma.signalSource.findFirst({
      where: { id: sourceId, userId },
    });

    if (!source) {
      throw new AppError('Signal source not found', 404);
    }

    await prisma.signalSource.delete({
      where: { id: sourceId },
    });

    return { success: true };
  }
}

export const sourceService = new SourceService();