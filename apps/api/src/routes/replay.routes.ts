import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/trade/:id', async (req, res, next) => {
  try {
    const trade = await prisma.trade.findUnique({
      where: { id: req.params.id },
      include: { events: { orderBy: { createdAt: 'asc' } } },
    });
    res.json({ success: true, data: trade });
  } catch (error) { next(error); }
});

router.get('/signal/:id', async (req, res, next) => {
  try {
    const signal = await prisma.signal.findUnique({
      where: { id: req.params.id },
      include: { parses: true, validations: true },
    });
    res.json({ success: true, data: signal });
  } catch (error) { next(error); }
});

router.get('/ai/:messageId', async (req, res, next) => {
  try {
    const parses = await prisma.signalParse.findMany({
      where: { signal: { sourceMessageId: req.params.messageId } },
    });
    res.json({ success: true, data: parses });
  } catch (error) { next(error); }
});

router.get('/events', async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
});

export default router;