import { prisma } from '../../config/database';
import { interpretationService } from './interpretation.service';
import { parserService } from './parser.service';
import { confidenceService } from './confidence.service';
import { dnaService } from '../provider-dna/dna.service';
import { ParsedSignal } from '../../types/ai.types';
import { logger } from '@signalforge/logger';

export class AiService {
  async processMessage(messageId: string) {
    const message = await prisma.sourceMessage.findUnique({
      where: { id: messageId },
      include: {
        signalSource: true,
      },
    });

    if (!message) {
      throw new Error('Message not found');
    }

    // Step 1: Classify
    const classification = await interpretationService.classifyMessage(message.messageText);

    logger.debug(`Message ${messageId} classified as ${classification.classification}`);

    // Only NEW_TRADE and TRADE_MANAGEMENT proceed
    if (!['NEW_TRADE', 'TRADE_MANAGEMENT'].includes(classification.classification)) {
      await prisma.sourceMessage.update({
        where: { id: messageId },
        data: { processingStatus: 'FILTERED', processedAt: new Date() },
      });
      return { classification, signal: null };
    }

    // Step 2: Parse (if NEW_TRADE)
    if (classification.classification === 'NEW_TRADE') {
      const providerId = message.signalSource.userId; // Using userId as providerId for now
      const dna = await dnaService.getProviderDna(providerId);

      const parsed = await parserService.parseSignal({
        messageText: message.messageText,
        providerId,
        context: {
          dnaRules: dna?.patterns.map(p => ({ pattern: p.pattern, action: p.action })),
        },
      });

      // Step 3: Calculate confidence
      const finalConfidence = confidenceService.calculateParseConfidence(
        parsed,
        dna?.confidence
      );

      parsed.confidence = finalConfidence;

      // Step 4: Save signal
      const signal = await this.saveSignal(message, parsed, classification);

      logger.info(`Signal created: ${signal.id} (${parsed.symbol} ${parsed.action})`);

      return { classification, signal };
    }

    // Handle TRADE_MANAGEMENT
    if (classification.classification === 'TRADE_MANAGEMENT') {
      const management = await parserService.parseTradeManagement(message.messageText);
      logger.info(`Trade management detected: ${management.action}`);
      return { classification, management };
    }

    return { classification, signal: null };
  }

  private async saveSignal(message: any, parsed: ParsedSignal, classification: any) {
    const idempotencyKey = `signal:${message.id}`;

    const signal = await prisma.signal.create({
      data: {
        sourceMessageId: message.id,
        providerId: message.signalSource.userId,
        symbol: parsed.symbol,
        direction: parsed.action,
        entryType: parsed.entryType,
        entryPrice: parsed.entryPrice,
        stopLoss: parsed.stopLoss,
        takeProfit1: parsed.takeProfits[0] || null,
        takeProfit2: parsed.takeProfits[1] || null,
        takeProfit3: parsed.takeProfits[2] || null,
        timeframe: parsed.timeframe,
        classification: classification.classification,
        confidence: parsed.confidence,
        status: 'ANALYZED',
        rawText: message.messageText,
        idempotencyKey,
      },
    });

    // Save parse record
    await prisma.signalParse.create({
      data: {
        signalId: signal.id,
        parserType: parsed.metadata?.path === 'FAST_PATH' ? 'FAST_PATH' : 'LEARNING_PATH',
        parserVersion: '1.0.0',
        confidence: parsed.confidence,
        aiModel: parsed.metadata?.model as string || null,
        latencyMs: parsed.metadata?.latencyMs as number || null,
        result: parsed as any,
      },
    });

    // Mark message as processed
    await prisma.sourceMessage.update({
      where: { id: message.id },
      data: {
        processingStatus: 'PROCESSED',
        processedAt: new Date(),
      },
    });

    // Update Provider DNA with new info
    if (parsed.symbol) {
      await dnaService.updateDnaFromMessage(message.signalSource.userId, message.messageText, parsed);
    }

    return signal;
  }

  async getProviderDna(providerId: string) {
    return dnaService.getProviderDna(providerId);
  }

  async testProviderDna(providerId: string, testMessage: string) {
    return dnaService.testDna(providerId, testMessage);
  }
}

export const aiService = new AiService();