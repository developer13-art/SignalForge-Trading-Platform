import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { referralService } from '../services/referrals/referral.service';

export class ReferralsController {
  async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const dashboard = await referralService.getReferralDashboard(req.user!.id);
      res.json({ success: true, data: dashboard });
    } catch (error) {
      next(error);
    }
  }

  async getWallet(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const wallet = await referralService.getReferralWallet(req.user!.id);
      res.json({ success: true, data: wallet });
    } catch (error) {
      next(error);
    }
  }

  async getRewards(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rewards = await referralService.getReferralRewards(req.user!.id);
      res.json({ success: true, data: rewards });
    } catch (error) {
      next(error);
    }
  }

  async getLeaderboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await referralService.getLeaderboard(limit);
      res.json({ success: true, data: leaderboard });
    } catch (error) {
      next(error);
    }
  }
}

export const referralsController = new ReferralsController();