// apps/api/src/middleware/role.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from './error.middleware';

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const hasRole = req.user.roles.some(role => roles.includes(role));
    
    if (!hasRole) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}

export function requireAnyRole(...roles: string[]) {
  return requireRole(...roles);
}

export function requireAllRoles(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const hasAllRoles = roles.every(role => req.user!.roles.includes(role));
    
    if (!hasAllRoles) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}