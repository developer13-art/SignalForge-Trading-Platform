import { prisma } from '../../config/database';

export class RulesEngineService {
  async evaluateRules(userId: string, context: any): Promise<Array<{ ruleId: string; action: string }>> {
    const rules = await prisma.automationRule.findMany({
      where: { userId, enabled: true },
      orderBy: { priority: 'asc' },
    });

    const triggered = [];

    for (const rule of rules) {
      const condition = rule.condition as any;
      if (this.evaluateCondition(condition, context)) {
        const action = rule.action as any;
        triggered.push({ ruleId: rule.id, action: action.type });
      }
    }

    return triggered;
  }

  private evaluateCondition(condition: any, context: any): boolean {
    const value = context[condition.type?.toLowerCase()];
    switch (condition.operator) {
      case 'GT': return value > condition.value;
      case 'LT': return value < condition.value;
      case 'GTE': return value >= condition.value;
      case 'LTE': return value <= condition.value;
      case 'EQ': return value === condition.value;
      default: return false;
    }
  }
}

export const rulesEngineService = new RulesEngineService();