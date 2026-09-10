import { prisma } from '../../config/database';

export class RiskReplayService {
  async replay(signalId: string) {
    return prisma.signalValidation.findMany({
      where: { signalId },
    });
  }
}

export const riskReplayService = new RiskReplayService();