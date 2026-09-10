import { prisma } from '../../config/database';

export class PatternService {
  async getPatterns(providerId: string) {
    const dna = await prisma.providerDna.findUnique({
      where: { providerId },
      include: { rules: true },
    });
    return dna?.rules || [];
  }

  async matchPattern(providerId: string, message: string): Promise<string | null> {
    const rules = await this.getPatterns(providerId);
    for (const rule of rules) {
      if (new RegExp(rule.pattern, 'i').test(message)) {
        return rule.action;
      }
    }
    return null;
  }

  async addPattern(providerId: string, pattern: string, action: string) {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    if (!dna) return;

    await prisma.providerDnaRule.create({
      data: {
        providerDnaId: dna.id,
        pattern,
        action,
        priority: 0,
        isActive: true,
      },
    });
  }
}

export const patternService = new PatternService();