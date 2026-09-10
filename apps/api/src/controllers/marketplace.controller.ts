import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class MarketplaceController {
  async getProviders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const providers = await prisma.provider.findMany({
        where: { isActive: true },
      });
      res.json({ success: true, data: providers });
    } catch (error) { next(error); }
  }

  async getTraders(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const traders = await prisma.traderProfile.findMany({
        where: { isPublic: true },
      });
      res.json({ success: true, data: traders });
    } catch (error) { next(error); }
  }

  async subscribe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sub = await prisma.providerSubscription.create({
        data: {
          userId: req.user!.id,
          providerId: req.params.id,
          isActive: true,
        },
      });
      res.json({ success: true, data: sub });
    } catch (error) { next(error); }
  }
}

export const marketplaceController = new MarketplaceController();