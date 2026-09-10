import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/', async (req, res, next) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: (req as any).user.id },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    res.json({ success: true, data: notifications });
  } catch (error) { next(error); }
});

router.get('/unread', async (req, res, next) => {
  try {
    const count = await prisma.notification.count({
      where: { userId: (req as any).user.id, isRead: false },
    });
    res.json({ success: true, data: { count } });
  } catch (error) { next(error); }
});

router.patch('/:id/read', async (req, res, next) => {
  try {
    await prisma.notification.update({
      where: { id: req.params.id },
      data: { isRead: true },
    });
    res.json({ success: true });
  } catch (error) { next(error); }
});

router.patch('/read-all', async (req, res, next) => {
  try {
    await prisma.notification.updateMany({
      where: { userId: (req as any).user.id, isRead: false },
      data: { isRead: true },
    });
    res.json({ success: true });
  } catch (error) { next(error); }
});

router.put('/preferences', async (req, res, next) => {
  try {
    res.json({ success: true });
  } catch (error) { next(error); }
});

export default router;