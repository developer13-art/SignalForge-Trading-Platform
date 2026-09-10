import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class ReplayController {
  async replayTrade(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const trade = await prisma.trade.findUnique({
        where: { id: req.params.id },
        include: { events: { orderBy: { createdAt: 'asc' } } },
      });
      res.json({ success: true, data: trade });
    } catch (error) { next(error); }
  }

  async replaySignal(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const signal = await prisma.signal.findUnique({
        where: { id: req.params.id },
        include: { parses: true, validations: true },
      });
      res.json({ success: true, data: signal });
    } catch (error) { next(error); }
  }

  async replayAi(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const parses = await prisma.signalParse.findMany({
        where: { signal: { sourceMessageId: req.params.messageId } },
      });
      res.json({ success: true, data: parses });
    } catch (error) { next(error); }
  }
}

export const replayController = new ReplayController();