import { prisma } from '../../config/database';

export class AutomationService {
  async getRules(userId: string) {
    return prisma.automationRule.findMany({
      where: { userId },
      orderBy: { priority: 'asc' },
    });
  }

  async createRule(userId: string, data: any) {
    return prisma.automationRule.create({
      data: { ...data, userId },
    });
  }

  async updateRule(userId: string, ruleId: string, data: any) {
    return prisma.automationRule.updateMany({
      where: { id: ruleId, userId },
      data,
    });
  }

  async deleteRule(userId: string, ruleId: string) {
    await prisma.automationRule.deleteMany({
      where: { id: ruleId, userId },
    });
  }
}

export const automationService = new AutomationService();