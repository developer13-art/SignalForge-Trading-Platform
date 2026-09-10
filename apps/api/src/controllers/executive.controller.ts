import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class ExecutiveController {
  async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const [users, trades] = await Promise.all([
        prisma.user.count(),
        prisma.trade.count(),
      ]);
      res.json({ success: true, data: { users, trades } });
    } catch (error) { next(error); }
  }

  async getRevenue(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const revenue = await prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true },
      });
      res.json({ success: true, data: { total: revenue._sum.amount || 0 } });
    } catch (error) { next(error); }
  }
}

export const executiveController = new ExecutiveController();