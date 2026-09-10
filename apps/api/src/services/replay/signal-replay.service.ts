import { prisma } from '../../config/database';

export class SignalReplayService {
  async replay(signalId: string) {
    return prisma.signal.findUnique({
      where: { id: signalId },
      include: { parses: true, validations: true, sourceMessage: true },
    });
  }
}

export const signalReplayService = new SignalReplayService();