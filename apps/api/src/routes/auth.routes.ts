import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { requireAuthenticated } from '../middleware/auth.middleware';
import { validateBody } from '../middleware/validation.middleware';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from '../validators/auth.validator';
import { authRateLimiter } from '../middleware/rateLimit.middleware';

const router = Router();

// Public routes
router.post('/register', authRateLimiter, validateBody(registerSchema), authController.register);
router.post('/login', authRateLimiter, validateBody(loginSchema), authController.login);
router.post('/refresh', validateBody(refreshTokenSchema), authController.refreshToken);

// Protected routes
router.get('/me', requireAuthenticated(), authController.getCurrentUser);
router.post('/logout', requireAuthenticated(), authController.logout);

export default router;