import { prisma } from '../../config/database';

export class NotificationService {
  async create(data: {
    userId: string;
    type: string;
    title: string;
    message: string;
    channels?: string[];
  }) {
    return prisma.notification.create({
      data: {
        ...data,
        channels: data.channels || ['IN_APP'],
      },
    });
  }

  async list(userId: string, limit: number = 50) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async markAsRead(userId: string, id: string) {
    return prisma.notification.updateMany({
      where: { id, userId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }
}

export const notificationService = new NotificationService();