import { Router } from 'express';
import { prisma } from '../config/database';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { AuthRequest } from '../middleware/auth.middleware';
import { Response, NextFunction } from 'express';

const router = Router();
router.use(requireAuthenticated());

router.get('/live', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signals = await prisma.signal.findMany({
      where: { sourceMessage: { signalSource: { userId: req.user!.id } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ success: true, data: signals });
  } catch (error) {
    next(error);
  }
});

router.get('/history', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signals = await prisma.signal.findMany({
      where: { sourceMessage: { signalSource: { userId: req.user!.id } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    res.json({ success: true, data: signals });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const signal = await prisma.signal.findFirst({
      where: {
        id: req.params.id,
        sourceMessage: { signalSource: { userId: req.user!.id } },
      },
      include: {
        parses: true,
        validations: true,
      },
    });
    res.json({ success: true, data: signal });
  } catch (error) {
    next(error);
  }
});

export default router;