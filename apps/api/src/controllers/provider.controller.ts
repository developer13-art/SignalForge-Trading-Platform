import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class ProviderController {
  async getMyProvider(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const provider = await prisma.provider.findFirst({
        where: { userId: req.user!.id },
      });
      res.json({ success: true, data: provider });
    } catch (error) { next(error); }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await prisma.provider.updateMany({
        where: { userId: req.user!.id },
        data: req.body,
      });
      res.json({ success: true });
    } catch (error) { next(error); }
  }
}

export const providerController = new ProviderController();