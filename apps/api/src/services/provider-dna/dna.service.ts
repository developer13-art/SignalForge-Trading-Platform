import { prisma } from '../../config/database';
import { aiClient } from '../../integrations/ai/client';
import { DNA_ANALYSIS_SYSTEM_PROMPT } from '../../integrations/ai/prompts';
import { ProviderDnaProfile } from '../../types/ai.types';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';

export class DnaService {
  async getProviderDna(providerId: string): Promise<ProviderDnaProfile | null> {
    const dna = await prisma.providerDna.findUnique({
      where: { providerId },
      include: { rules: true },
    });

    if (!dna) return null;

    return {
      providerId,
      language: dna.language || 'en',
      symbols: dna.symbols,
      abbreviations: (dna.abbreviations as Record<string, string>) || {},
      patterns: dna.rules.map(r => ({
        pattern: r.pattern,
        meaning: r.action,
        action: r.action,
      })),
      riskStyle: (dna.riskStyle as Record<string, unknown>) || {},
      confidence: dna.confidence || 0.5,
      version: dna.version,
    };
  }

  async buildDnaFromMessages(providerId: string, sampleMessages: string[]): Promise<void> {
    if (sampleMessages.length < 10) {
      throw new AppError('At least 10 messages required to build DNA', 400);
    }

    const combinedText = sampleMessages.slice(0, 50).join('\n---\n');

    try {
      const response = await aiClient.generateCompletion(
        DNA_ANALYSIS_SYSTEM_PROMPT,
        combinedText,
        { maxTokens: 2048, temperature: 0.1 }
      );

      const parsed = JSON.parse(this.extractJson(response.content));

      await this.saveDna(providerId, {
        language: parsed.language,
        symbols: parsed.symbols || [],
        abbreviations: parsed.abbreviations || {},
        patterns: parsed.patterns || [],
        riskStyle: parsed.riskStyle || {},
        confidence: parsed.confidence || 0.5,
      });

      logger.info(`Provider DNA built for ${providerId}`);
    } catch (error) {
      logger.error('DNA build failed:', error);
      throw new AppError('Failed to build Provider DNA', 500);
    }
  }

  async saveDna(
    providerId: string,
    data: {
      language: string;
      symbols: string[];
      abbreviations: Record<string, string>;
      patterns: Array<{ pattern: string; meaning: string; action: string }>;
      riskStyle: Record<string, unknown>;
      confidence: number;
    }
  ): Promise<void> {
    const existing = await prisma.providerDna.findUnique({
      where: { providerId },
    });

    const version = existing ? existing.version + 1 : 1;

    // Upsert Provider DNA
    const dna = await prisma.providerDna.upsert({
      where: { providerId },
      create: {
        providerId,
        language: data.language,
        symbols: data.symbols,
        abbreviations: data.abbreviations as any,
        riskStyle: data.riskStyle as any,
        confidence: data.confidence,
        version,
      },
      update: {
        language: data.language,
        symbols: data.symbols,
        abbreviations: data.abbreviations as any,
        riskStyle: data.riskStyle as any,
        confidence: data.confidence,
        version,
        lastUpdated: new Date(),
      },
    });

    // Replace rules
    await prisma.providerDnaRule.deleteMany({
      where: { providerDnaId: dna.id },
    });

    if (data.patterns.length > 0) {
      await prisma.providerDnaRule.createMany({
        data: data.patterns.map((p, index) => ({
          providerDnaId: dna.id,
          pattern: p.pattern,
          action: p.action,
          priority: index,
          isActive: true,
        })),
      });
    }
  }

  async updateDnaFromMessage(providerId: string, messageText: string, parsedSignal: any) {
    const dna = await prisma.providerDna.findUnique({
      where: { providerId },
      include: { rules: true },
    });

    if (!dna) return;

    // Update symbol list if new symbol found
    if (parsedSignal.symbol && !dna.symbols.includes(parsedSignal.symbol)) {
      await prisma.providerDna.update({
        where: { providerId },
        data: {
          symbols: [...dna.symbols, parsedSignal.symbol],
        },
      });
    }
  }

  async testDna(providerId: string, testMessage: string) {
    const dna = await this.getProviderDna(providerId);

    if (!dna) {
      throw new AppError('Provider DNA not found', 404);
    }

    const matchedRules = dna.patterns.filter(p => 
      new RegExp(p.pattern, 'i').test(testMessage)
    );

    return {
      dna,
      matchedRules,
      message: testMessage,
    };
  }

  private extractJson(content: string): string {
    const match = content.match(/\{[\s\S]*\}/);
    return match ? match[0] : content;
  }
}

export const dnaService = new DnaService();