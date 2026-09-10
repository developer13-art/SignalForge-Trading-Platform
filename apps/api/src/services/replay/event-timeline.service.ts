import { prisma } from '../../config/database';

export class EventTimelineService {
  async getTimeline(resourceType: string, resourceId: string) {
    if (resourceType === 'trade') {
      return prisma.tradeEvent.findMany({
        where: { tradeId: resourceId },
        orderBy: { createdAt: 'asc' },
      });
    }
    return [];
  }
}

export const eventTimelineService = new EventTimelineService();