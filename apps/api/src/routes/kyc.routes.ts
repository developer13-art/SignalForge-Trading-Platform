import { Router } from 'express';
import { kycController } from '../controllers/kyc.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { requireKycVerified, requireKycForTrading } from '../middleware/kyc.middleware';
import { requireRole } from '../middleware/role.middleware';
import { requirePermission } from '../middleware/permission.middleware';
import { validateBody } from '../middleware/validation.middleware';
import { uploadSingle } from '../middleware/upload.middleware';
import {
  kycPersonalInfoSchema,
  kycSubmitSchema,
  kycReviewSchema,
  kycDocumentTypeSchema,
} from '../validators/kyc.validator';
import { PERMISSIONS } from '@signalforge/config';

const router = Router();

// User KYC routes
router.use(requireAuthenticated());

router.get('/status', kycController.getStatus);
router.post('/start', kycController.startApplication);
router.post('/personal-info', validateBody(kycPersonalInfoSchema), kycController.submitPersonalInfo);
router.post('/documents', uploadSingle('document'), kycController.uploadDocument);
router.post('/submit', validateBody(kycSubmitSchema), kycController.submitForReview);
router.post('/resubmit', kycController.resubmit);
router.get('/document-types', kycController.getDocumentTypes);

// Admin KYC routes
router.get(
  '/admin/queue',
  requirePermission(PERMISSIONS.VIEW_KYC),
  kycController.getReviewQueue
);

router.get(
  '/admin/stats',
  requirePermission(PERMISSIONS.VIEW_KYC),
  kycController.getReviewStats
);

router.get(
  '/admin/applications/:id',
  requirePermission(PERMISSIONS.REVIEW_KYC),
  kycController.getApplicationForReview
);

router.post(
  '/admin/applications/:id/review',
  requirePermission(PERMISSIONS.APPROVE_KYC),
  validateBody(kycReviewSchema),
  kycController.reviewApplication
);

router.post(
  '/admin/document-types',
  requirePermission(PERMISSIONS.APPROVE_KYC),
  validateBody(kycDocumentTypeSchema),
  kycController.createDocumentType
);

router.patch(
  '/admin/document-types/:id',
  requirePermission(PERMISSIONS.APPROVE_KYC),
  kycController.updateDocumentType
);

export default router;