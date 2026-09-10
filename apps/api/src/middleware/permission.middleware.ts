// apps/api/src/middleware/permission.middleware.ts
import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from './error.middleware';
import { getPermissionsForRole, Permission } from '@signalforge/config';

export function requirePermission(permission: Permission) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const userPermissions = new Set<string>();
    
    req.user.roles.forEach(role => {
      const rolePermissions = getPermissionsForRole(role as any);
      rolePermissions.forEach(p => userPermissions.add(p));
    });

    if (!userPermissions.has(permission)) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}

export function requireAnyPermission(...permissions: Permission[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    const userPermissions = new Set<string>();
    
    req.user.roles.forEach(role => {
      const rolePermissions = getPermissionsForRole(role as any);
      rolePermissions.forEach(p => userPermissions.add(p));
    });

    const hasPermission = permissions.some(p => userPermissions.has(p));
    
    if (!hasPermission) {
      next(new AppError('Insufficient permissions', 403));
      return;
    }

    next();
  };
}