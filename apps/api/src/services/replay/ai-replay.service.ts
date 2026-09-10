import { prisma } from '../../config/database';

export class AiReplayService {
  async replay(messageId: string) {
    return prisma.signalParse.findMany({
      where: { signal: { sourceMessageId: messageId } },
    });
  }
}

export const aiReplayService = new AiReplayService();