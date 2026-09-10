import { prisma } from '../../config/database';

export class SymbolMappingService {
  async getMapping(providerId: string): Promise<Record<string, string>> {
    const dna = await prisma.providerDna.findUnique({
      where: { providerId },
    });
    return (dna?.abbreviations as Record<string, string>) || {};
  }

  async addMapping(providerId: string, alias: string, symbol: string): Promise<void> {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    if (!dna) return;

    const abbrevs = (dna.abbreviations as Record<string, string>) || {};
    abbrevs[alias] = symbol;

    await prisma.providerDna.update({
      where: { providerId },
      data: { abbreviations: abbrevs as any },
    });
  }
}

export const symbolMappingService = new SymbolMappingService();