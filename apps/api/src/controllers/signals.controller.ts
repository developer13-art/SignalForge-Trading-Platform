import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class SignalsController {
  async getLive(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const signals = await prisma.signal.findMany({
        where: { sourceMessage: { signalSource: { userId: req.user!.id } } },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      res.json({ success: true, data: signals });
    } catch (error) { next(error); }
  }

  async getHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const signals = await prisma.signal.findMany({
        where: { sourceMessage: { signalSource: { userId: req.user!.id } } },
        orderBy: { createdAt: 'desc' },
        take: 200,
      });
      res.json({ success: true, data: signals });
    } catch (error) { next(error); }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const signal = await prisma.signal.findFirst({
        where: {
          id: req.params.id,
          sourceMessage: { signalSource: { userId: req.user!.id } },
        },
        include: { parses: true, validations: true },
      });
      res.json({ success: true, data: signal });
    } catch (error) { next(error); }
  }
}

export const signalsController = new SignalsController();