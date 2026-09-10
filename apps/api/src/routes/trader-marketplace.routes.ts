import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/traders', async (req, res, next) => {
  try {
    const traders = await prisma.traderProfile.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: traders });
  } catch (error) { next(error); }
});

router.get('/traders/:id', async (req, res, next) => {
  try {
    const trader = await prisma.traderProfile.findUnique({
      where: { id: req.params.id },
    });
    res.json({ success: true, data: trader });
  } catch (error) { next(error); }
});

router.post('/traders/:id/follow', async (req, res, next) => {
  try {
    const follower = await prisma.traderFollower.create({
      data: {
        traderProfileId: req.params.id,
        followerId: (req as any).user.id,
      },
    });
    res.json({ success: true, data: follower });
  } catch (error) { next(error); }
});

router.get('/my-followed', async (req, res, next) => {
  try {
    const follows = await prisma.traderFollower.findMany({
      where: { followerId: (req as any).user.id },
      include: { traderProfile: true },
    });
    res.json({ success: true, data: follows.map(f => f.traderProfile) });
  } catch (error) { next(error); }
});

export default router;