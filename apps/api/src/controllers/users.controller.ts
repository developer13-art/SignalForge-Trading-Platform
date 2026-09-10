import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';
import { passwordService } from '../services/auth/password.service';
import { deviceService } from '../services/auth/device.service';
import { AppError } from '../middleware/error.middleware';

export class UsersController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await prisma.userProfile.findUnique({
        where: { userId: req.user!.id },
      });

      const user = await prisma.user.findUnique({
        where: { id: req.user!.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
          phone: true,
          avatarUrl: true,
          kycStatus: true,
          accountType: true,
          emailVerifiedAt: true,
          phoneVerifiedAt: true,
          lastLoginAt: true,
          createdAt: true,
        },
      });

      res.json({
        success: true,
        data: { ...user, profile },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const userId = req.user!.id;

      if (data.username) {
        const existing = await prisma.user.findUnique({
          where: { username: data.username },
        });

        if (existing && existing.id !== userId) {
          throw new AppError('Username already taken', 409);
        }
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          phone: data.phone,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
          phone: true,
          kycStatus: true,
        },
      });

      const profile = await prisma.userProfile.upsert({
        where: { userId },
        create: {
          userId,
          country: data.country,
          address: data.address,
          bio: data.bio,
          tradingExperience: data.tradingExperience,
          languages: data.languages || [],
        },
        update: {
          country: data.country,
          address: data.address,
          bio: data.bio,
          tradingExperience: data.tradingExperience,
          languages: data.languages || [],
        },
      });

      res.json({
        success: true,
        data: { ...user, profile },
      });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user!.id;

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }

      const isValid = await passwordService.verifyPassword(currentPassword, user.passwordHash);
      if (!isValid) {
        throw new AppError('Current password is incorrect', 401);
      }

      const newHash = await passwordService.hashPassword(newPassword);
      await prisma.user.update({
        where: { id: userId },
        data: { passwordHash: newHash },
      });

      res.json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getSessions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sessions = await deviceService.getUserSessions(req.user!.id);
      res.json({ success: true, data: sessions });
    } catch (error) {
      next(error);
    }
  }

  async revokeSession(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const success = await deviceService.revokeSession(req.user!.id, id);

      if (!success) {
        throw new AppError('Session not found', 404);
      }

      res.json({ success: true, message: 'Session revoked' });
    } catch (error) {
      next(error);
    }
  }
}

export const usersController = new UsersController();