import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/providers', async (req, res, next) => {
  try {
    const providers = await prisma.provider.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: providers });
  } catch (error) { next(error); }
});

router.get('/providers/:id', async (req, res, next) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id: req.params.id },
    });
    res.json({ success: true, data: provider });
  } catch (error) { next(error); }
});

router.post('/providers/:id/subscribe', async (req, res, next) => {
  try {
    const subscription = await prisma.providerSubscription.create({
      data: {
        userId: (req as any).user.id,
        providerId: req.params.id,
        isActive: true,
      },
    });
    res.json({ success: true, data: subscription });
  } catch (error) { next(error); }
});

router.get('/my-providers', async (req, res, next) => {
  try {
    const subs = await prisma.providerSubscription.findMany({
      where: { userId: (req as any).user.id, isActive: true },
      include: { provider: true },
    });
    res.json({ success: true, data: subs.map(s => s.provider) });
  } catch (error) { next(error); }
});

export default router;