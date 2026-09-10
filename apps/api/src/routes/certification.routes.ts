import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/dashboard', async (req, res, next) => {
  try {
    res.json({ success: true, data: { status: 'NOT_CERTIFIED', score: 0 } });
  } catch (error) { next(error); }
});

router.get('/history', async (req, res, next) => {
  try {
    const history = await prisma.providerCertification.findMany({
      where: { provider: { userId: (req as any).user.id } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: history });
  } catch (error) { next(error); }
});

router.post('/import', async (req, res, next) => {
  try {
    res.json({ success: true, data: { imported: 0 } });
  } catch (error) { next(error); }
});

router.post('/run', async (req, res, next) => {
  try {
    res.json({ success: true, data: { status: 'PENDING' } });
  } catch (error) { next(error); }
});

export default router;