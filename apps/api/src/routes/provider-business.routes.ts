import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/me', async (req, res, next) => {
  try {
    const provider = await prisma.provider.findFirst({
      where: { userId: (req as any).user.id },
    });
    res.json({ success: true, data: provider });
  } catch (error) { next(error); }
});

router.patch('/profile', async (req, res, next) => {
  try {
    const provider = await prisma.provider.updateMany({
      where: { userId: (req as any).user.id },
      data: req.body,
    });
    res.json({ success: true, data: provider });
  } catch (error) { next(error); }
});

router.get('/subscribers', async (req, res, next) => {
  try {
    const subs = await prisma.providerSubscription.findMany({
      where: { provider: { userId: (req as any).user.id }, isActive: true },
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
    });
    res.json({ success: true, data: subs });
  } catch (error) { next(error); }
});

router.get('/revenue', async (req, res, next) => {
  try {
    res.json({ success: true, data: { total: 0, thisMonth: 0, available: 0 } });
  } catch (error) { next(error); }
});

export default router;