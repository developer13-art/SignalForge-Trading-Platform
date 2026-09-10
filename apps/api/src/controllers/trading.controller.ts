import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { executionService } from '../services/trading/execution.service';
import { prisma } from '../config/database';
import { getPaginationParams, createPaginatedResult } from '../utils/pagination';

export class TradingController {
  async getOpenPositions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const positions = await prisma.trade.findMany({
        where: {
          userId: req.user!.id,
          status: 'OPEN',
        },
        include: {
          brokerAccount: {
            select: { nickname: true, platform: true },
          },
        },
        orderBy: { openedAt: 'desc' },
      });

      res.json({ success: true, data: positions });
    } catch (error) {
      next(error);
    }
  }

  async getTradeHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const where = { userId: req.user!.id };

      const [trades, total] = await Promise.all([
        prisma.trade.findMany({
          where,
          include: {
            brokerAccount: {
              select: { nickname: true, platform: true },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: (params.page - 1) * params.limit,
          take: params.limit,
        }),
        prisma.trade.count({ where }),
      ]);

      res.json({
        success: true,
        data: createPaginatedResult(trades, total, params.page, params.limit),
      });
    } catch (error) {
      next(error);
    }
  }

  async getTradeDetails(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const trade = await prisma.trade.findFirst({
        where: { id: req.params.id, userId: req.user!.id },
        include: {
          brokerAccount: true,
          signal: true,
          events: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });

      res.json({ success: true, data: trade });
    } catch (error) {
      next(error);
    }
  }

  async closeTrade(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { volume } = req.body;
      const result = await executionService.closePosition(
        req.user!.id,
        req.params.id,
        volume
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async modifyTrade(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await executionService.modifyPosition(
        req.user!.id,
        req.params.id,
        req.body
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async moveToBreakEven(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await executionService.moveToBreakEven(req.user!.id, req.params.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const tradingController = new TradingController();