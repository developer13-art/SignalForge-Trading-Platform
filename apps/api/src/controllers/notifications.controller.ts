import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class NotificationsController {
  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const notifications = await prisma.notification.findMany({
        where: { userId: req.user!.id },
        orderBy: { createdAt: 'desc' },
      });
      res.json({ success: true, data: notifications });
    } catch (error) { next(error); }
  }

  async markAsRead(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await prisma.notification.update({
        where: { id: req.params.id },
        data: { isRead: true },
      });
      res.json({ success: true });
    } catch (error) { next(error); }
  }

  async markAllAsRead(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await prisma.notification.updateMany({
        where: { userId: req.user!.id, isRead: false },
        data: { isRead: true },
      });
      res.json({ success: true });
    } catch (error) { next(error); }
  }
}

export const notificationsController = new NotificationsController();