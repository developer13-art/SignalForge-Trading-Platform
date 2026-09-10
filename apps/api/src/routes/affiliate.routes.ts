import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/dashboard', async (req, res, next) => {
  try {
    res.json({ success: true, data: { referrals: 0, commissions: 0, links: 0 } });
  } catch (error) { next(error); }
});

router.get('/links', async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
});

router.get('/commissions', async (req, res, next) => {
  try {
    const commissions = await prisma.affiliateCommission.findMany({
      where: { affiliateId: (req as any).user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: commissions });
  } catch (error) { next(error); }
});

router.get('/ib/dashboard', async (req, res, next) => {
  try {
    res.json({ success: true, data: { referrals: 0, revenue: 0, links: 0 } });
  } catch (error) { next(error); }
});

router.get('/ib/referrals', async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
});

export default router;