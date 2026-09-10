import { Router, Response, NextFunction } from 'express';
import { requireAuthenticated, AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/overview', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;

    const [openTrades, recentSignals, activeSubscriptions, trades, accounts] = await Promise.all([
      prisma.trade.count({ where: { userId, status: 'OPEN' } }),
      prisma.signal.count({
        where: {
          sourceMessage: { signalSource: { userId } },
          createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        },
      }),
      prisma.subscription.count({ where: { userId, status: 'ACTIVE' } }),
      prisma.trade.findMany({
        where: { userId, status: 'CLOSED' },
        select: { realizedProfit: true },
      }),
      prisma.brokerAccount.findMany({
        where: { userId },
        select: { balance: true, equity: true },
      }),
    ]);

    const balance = accounts.reduce((sum, a) => sum + a.balance, 0);
    const equity = accounts.reduce((sum, a) => sum + a.equity, 0);
    const netPnL = trades.reduce((sum, t) => sum + (t.realizedProfit || 0), 0);
    const wins = trades.filter((t) => (t.realizedProfit || 0) > 0).length;
    const winRate = trades.length > 0 ? (wins / trades.length) * 100 : 0;

    res.json({
      success: true,
      data: { openTrades, recentSignals, activeSubscriptions, balance, equity, netPnL, winRate },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/recent-trades', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trades = await prisma.trade.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    res.json({ success: true, data: trades });
  } catch (error) {
    next(error);
  }
});

router.get('/active-signals', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signals = await prisma.signal.findMany({
      where: {
        sourceMessage: { signalSource: { userId: req.user!.id } },
        status: { in: ['ANALYZED', 'VALIDATED', 'APPROVED'] },
      },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    res.json({ success: true, data: signals });
  } catch (error) {
    next(error);
  }
});

export default router;