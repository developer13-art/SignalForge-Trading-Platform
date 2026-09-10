import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class DashboardController {
  async getOverview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user!.id;
      const [openTrades, signals, activeSubscriptions] = await Promise.all([
        prisma.trade.count({ where: { userId, status: 'OPEN' } }),
        prisma.signal.count({ where: { sourceMessage: { signalSource: { userId } } } }),
        prisma.subscription.count({ where: { userId, status: 'ACTIVE' } }),
      ]);
      res.json({ success: true, data: { openTrades, signals, activeSubscriptions } });
    } catch (error) { next(error); }
  }
}

export const dashboardController = new DashboardController();