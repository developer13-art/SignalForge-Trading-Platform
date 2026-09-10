import { Router } from 'express';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { prisma } from '../config/database';

const router = Router();
router.use(requireAuthenticated());
router.use(requireRole('COMPLIANCE_OFFICER', 'ADMIN', 'SUPER_ADMIN'));

router.get('/kyc/queue', async (req, res, next) => {
  try {
    const items = await prisma.kycApplication.findMany({
      where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
      include: { user: { select: { email: true, firstName: true, lastName: true } } },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ success: true, data: items });
  } catch (error) { next(error); }
});

router.get('/kyc/document-types', async (req, res, next) => {
  try {
    const types = await prisma.kycDocumentType.findMany();
    res.json({ success: true, data: types });
  } catch (error) { next(error); }
});

router.post('/kyc/document-types', async (req, res, next) => {
  try {
    const type = await prisma.kycDocumentType.create({ data: req.body });
    res.json({ success: true, data: type });
  } catch (error) { next(error); }
});

router.get('/reports', async (req, res, next) => {
  try {
    res.json({ success: true, data: [] });
  } catch (error) { next(error); }
});

export default router;