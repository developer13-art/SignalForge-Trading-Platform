import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from './error.middleware';
import { env } from '../config/env';
import { prisma } from '../config/database';

export function requireKycVerified() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    // Re-check KYC status from database for security
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { kycStatus: true },
    });

    if (!user || user.kycStatus !== 'VERIFIED') {
      next(new AppError(
        'Account not verified. Complete KYC to unlock this feature.',
        403,
        { kycRequired: true, kycStatus: user?.kycStatus || 'NOT_STARTED' }
      ));
      return;
    }

    next();
  };
}

export function requireKycForTrading() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!env.KYC_REQUIRED_FOR_TRADING) {
      next();
      return;
    }
    return requireKycVerified()(req, res, next);
  };
}

export function requireKycForSubscription() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!env.KYC_REQUIRED_FOR_SUBSCRIPTION) {
      next();
      return;
    }
    return requireKycVerified()(req, res, next);
  };
}

export function requireKycForReferral() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!env.KYC_REQUIRED_FOR_REFERRAL) {
      next();
      return;
    }
    return requireKycVerified()(req, res, next);
  };
}