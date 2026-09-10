import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';
import { AuthRequest } from '../middleware/auth.middleware';
import { Response, NextFunction } from 'express';
import { startOfDay, endOfDay } from '../utils/date';

const router = Router();
router.use(requireAuthenticated());

router.get('/overview', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.id;
    const today = new Date();

    const [openTrades, recentSignals, activeSubscriptions] = await Promise.all([
      prisma.trade.count({ where: { userId, status: 'OPEN' } }),
      prisma.signal.count({
        where: {
          sourceMessage: { signalSource: { userId } },
          createdAt: { gte: startOfDay(today), lte: endOfDay(today) },
        },
      }),
      prisma.subscription.count({ where: { userId, status: 'ACTIVE' } }),
    ]);

    res.json({
      success: true,
      data: { openTrades, recentSignals, activeSubscriptions },
    });
  } catch (error) { next(error); }
});

router.get('/recent-trades', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const trades = await prisma.trade.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });
    res.json({ success: true, data: trades });
  } catch (error) { next(error); }
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
  } catch (error) { next(error); }
});

export default router;