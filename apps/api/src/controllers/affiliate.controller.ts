import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class AffiliateController {
  async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: { referrals: 0, commissions: 0 } });
    } catch (error) { next(error); }
  }

  async getCommissions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const commissions = await prisma.affiliateCommission.findMany({
        where: { affiliateId: req.user!.id },
      });
      res.json({ success: true, data: commissions });
    } catch (error) { next(error); }
  }
}

export const affiliateController = new AffiliateController();