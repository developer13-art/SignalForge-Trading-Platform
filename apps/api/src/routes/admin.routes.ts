import { Router } from 'express';
import { adminController } from '../controllers/admin.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

const router = Router();

router.use(requireAuthenticated());
router.use(requireRole('ADMIN', 'SUPER_ADMIN'));

router.get('/overview', adminController.getOverview);
router.get('/users', adminController.getUsers);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.get('/audit-logs', adminController.getAuditLogs);
router.get('/system-health', adminController.getSystemHealth);
router.get('/revenue', adminController.getRevenueStats);

export default router;