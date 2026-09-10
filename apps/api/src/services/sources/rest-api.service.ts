import crypto from 'crypto';
import { prisma } from '../../config/database';
import { logger } from '@signalforge/logger';

export class RestApiService {
  async createApiSource(userId: string, name: string) {
    const apiKey = `sf_${crypto.randomBytes(24).toString('hex')}`;
    const source = await prisma.signalSource.create({
      data: {
        userId,
        sourceType: 'REST_API',
        name,
        isActive: true,
        config: { apiKey },
      },
    });
    logger.info(`REST API source created: ${source.id}`);
    return { source, apiKey };
  }

  async validateApiKey(apiKey: string) {
    return prisma.signalSource.findFirst({
      where: {
        sourceType: 'REST_API',
        config: { path: ['apiKey'], equals: apiKey },
      },
    });
  }
}

export const restApiService = new RestApiService();