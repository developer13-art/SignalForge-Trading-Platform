import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { prisma } from '../config/database';
import { AppError } from './error.middleware';
import { tokenService } from '../services/auth/token.service';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    roles: string[];
    kycStatus: string;
    accountType: string;
  };
}

export function requireAuthenticated() {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Authentication required', 401);
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new AppError('Authentication token missing', 401);
      }

      const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string };

      // Validate token by hash via token service
      const isValid = await tokenService.validateAccessToken(token, decoded.userId);
      if (!isValid) {
        throw new AppError('Session expired or invalid', 401);
      }

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: { roles: { include: { role: true } } },
      });

      if (!user) {
        throw new AppError('User not found', 401);
      }

      if (user.status !== 'ACTIVE') {
        throw new AppError('Account is not active', 403);
      }

      req.user = {
        id: user.id,
        email: user.email,
        roles: user.roles.map((ur) => ur.role.name),
        kycStatus: user.kycStatus,
        accountType: user.accountType,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError('Invalid token', 401));
      } else if (error instanceof jwt.TokenExpiredError) {
        next(new AppError('Token expired', 401));
      } else {
        next(error);
      }
    }
  };
}
