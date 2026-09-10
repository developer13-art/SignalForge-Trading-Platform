import { prisma } from '../../config/database';

export class EmergencyStopService {
  async activate(userId: string) {
    await prisma.riskProfile.update({
      where: { userId },
      data: { emergencyStop: true },
    });
  }

  async deactivate(userId: string) {
    await prisma.riskProfile.update({
      where: { userId },
      data: { emergencyStop: false },
    });
  }

  async isActive(userId: string): Promise<boolean> {
    const profile = await prisma.riskProfile.findUnique({ where: { userId } });
    return profile?.emergencyStop || false;
  }
}

export const emergencyStopService = new EmergencyStopService();