import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());
router.use(requireRole('ADMIN', 'SUPER_ADMIN'));

router.get('/dashboard', async (req, res, next) => {
  try {
    const [users, trades, revenue] = await Promise.all([
      prisma.user.count(),
      prisma.trade.count(),
      prisma.payment.aggregate({ where: { status: 'SUCCESS' }, _sum: { amount: true } }),
    ]);
    res.json({ success: true, data: { users, trades, revenue: revenue._sum.amount || 0 } });
  } catch (error) { next(error); }
});

router.get('/revenue', async (req, res, next) => {
  try {
    res.json({ success: true, data: { mrr: 0, arr: 0, net: 0 } });
  } catch (error) { next(error); }
});

router.get('/growth', async (req, res, next) => {
  try {
    res.json({ success: true, data: { users: 0, providers: 0, traders: 0 } });
  } catch (error) { next(error); }
});

export default router;