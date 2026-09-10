import { prisma } from '../../config/database';

export class DatasetService {
  async importMessages(providerId: string, messages: string[]) {
    return { imported: messages.length };
  }

  async getDataset(providerId: string) {
    return prisma.sourceMessage.findMany({
      where: { signalSource: { userId: providerId } },
      take: 1000,
    });
  }
}

export const datasetService = new DatasetService();