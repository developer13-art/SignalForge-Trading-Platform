// apps/api/src/middleware/subscription.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from './error.middleware';
import { prisma } from '../config/database';

export function requireActiveSubscription() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: req.user.id,
        status: { in: ['ACTIVE', 'TRIAL', 'GRACE_PERIOD'] },
        currentPeriodEnd: { gt: new Date() },
      },
    });

    if (!subscription) {
      next(new AppError(
        'Active subscription required. Please subscribe to continue.',
        403,
        { subscriptionRequired: true }
      ));
      return;
    }

    next();
  };
}