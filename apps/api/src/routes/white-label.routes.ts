import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());
router.use(requireRole('ADMIN', 'SUPER_ADMIN'));

router.get('/dashboard', async (req, res, next) => {
  try {
    const projects = await prisma.whiteLabelProject.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: projects });
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const project = await prisma.whiteLabelProject.create({ data: req.body });
    res.json({ success: true, data: project });
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const project = await prisma.whiteLabelProject.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: project });
  } catch (error) { next(error); }
});

export default router;