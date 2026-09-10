import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());

router.get('/', async (req, res, next) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    res.json({ success: true, data: settings });
  } catch (error) { next(error); }
});

router.get('/:key', async (req, res, next) => {
  try {
    const setting = await prisma.systemSetting.findUnique({
      where: { key: req.params.key },
    });
    res.json({ success: true, data: setting });
  } catch (error) { next(error); }
});

export default router;