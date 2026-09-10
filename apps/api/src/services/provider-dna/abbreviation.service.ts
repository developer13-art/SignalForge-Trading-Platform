import { prisma } from '../../config/database';

export class AbbreviationService {
  async getAbbreviations(providerId: string): Promise<Record<string, string>> {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    return (dna?.abbreviations as Record<string, string>) || {};
  }

  async learnAbbreviation(providerId: string, abbr: string, meaning: string) {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    if (!dna) return;

    const abbrevs = (dna.abbreviations as Record<string, string>) || {};
    abbrevs[abbr] = meaning;

    await prisma.providerDna.update({
      where: { providerId },
      data: { abbreviations: abbrevs as any },
    });
  }
}

export const abbreviationService = new AbbreviationService();