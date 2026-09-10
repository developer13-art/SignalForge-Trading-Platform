import { prisma } from '../config/database';
import { dnaService } from '../services/provider-dna/dna.service';
import { logger } from '@signalforge/logger';

export async function runProviderDnaLearning() {
  logger.info('Running Provider DNA learning job');

  const providers = await prisma.provider.findMany({
    where: { isActive: true },
  });

  for (const provider of providers) {
    try {
      const messages = await prisma.sourceMessage.findMany({
        where: { signalSource: { userId: provider.userId } },
        take: 500,
        orderBy: { receivedAt: 'desc' },
      });

      if (messages.length >= 10) {
        await dnaService.buildDnaFromMessages(
          provider.id,
          messages.map(m => m.messageText)
        );
        logger.info(`DNA updated for provider ${provider.id}`);
      }
    } catch (error) {
      logger.error(`DNA learning failed for provider ${provider.id}:`, error);
    }
  }
}