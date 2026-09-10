import { prisma } from '../../config/database';

export class DnaVersionService {
  async getVersion(providerId: string): Promise<number> {
    const dna = await prisma.providerDna.findUnique({ where: { providerId } });
    return dna?.version || 0;
  }

  async incrementVersion(providerId: string): Promise<number> {
    const dna = await prisma.providerDna.update({
      where: { providerId },
      data: { version: { increment: 1 } },
    });
    return dna.version;
  }
}

export const dnaVersionService = new DnaVersionService();