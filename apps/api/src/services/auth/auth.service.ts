import { prisma } from '../../config/database';
import { tokenService } from './token.service';
import { passwordService } from './password.service';
import { verificationService } from './verification.service';
import { generateReferralCode, hashToken } from '../../utils/hashing';
import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';
import { AuthResponse, LoginRequest, RegisterRequest } from '../../types/auth.types';

export class AuthService {
  async register(data: RegisterRequest, deviceInfo?: Record<string, unknown>, ipAddress?: string, userAgent?: string): Promise<AuthResponse> {
    const { email, password, firstName, lastName, referralCode } = data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const passwordHash = await passwordService.hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        username: `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${Date.now().toString(36)}`,
        status: 'ACTIVE',
        kycStatus: 'NOT_STARTED',
        accountType: 'USER',
      },
    });

    // Create user profile
    await prisma.userProfile.create({
      data: {
        userId: user.id,
      },
    });

    // Assign USER role
    const userRole = await prisma.role.findUnique({
      where: { name: 'USER' },
    });

    if (userRole) {
      await prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: userRole.id,
        },
      });
    }

    // Handle referral code
    if (referralCode) {
      const referrerCode = await prisma.referralCode.findUnique({
        where: { code: referralCode },
      });

      if (referrerCode && referrerCode.userId !== user.id) {
        await prisma.referralRelationship.create({
          data: {
            referrerId: referrerCode.userId,
            referredUserId: user.id,
          },
        });
      }
    }

    // Generate referral code for the new user
    let uniqueCode = '';
    let isUnique = false;
    while (!isUnique) {
      uniqueCode = generateReferralCode();
      const existing = await prisma.referralCode.findUnique({
        where: { code: uniqueCode },
      });
      if (!existing) {
        isUnique = true;
      }
    }

    await prisma.referralCode.create({
      data: {
        userId: user.id,
        code: uniqueCode,
      },
    });

    // Create referral wallet
    await prisma.referralWallet.create({
      data: {
        userId: user.id,
      },
    });

    // Generate tokens
    const tokens = tokenService.generateTokens(user.id, user.email);
    await tokenService.createSession(user.id, tokens.refreshToken, deviceInfo, ipAddress, userAgent);

    logger.info(`User registered: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        kycStatus: user.kycStatus,
        accountType: user.accountType,
        roles: ['USER'],
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(data: LoginRequest, deviceInfo?: Record<string, unknown>, ipAddress?: string, userAgent?: string): Promise<AuthResponse> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        roles: {
          include: { role: true },
        },
      },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError('Account is not active', 403);
    }

    const isPasswordValid = await passwordService.verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401);
    }

    const tokens = tokenService.generateTokens(user.id, user.email);
    await tokenService.createSession(user.id, tokens.refreshToken, deviceInfo, ipAddress, userAgent);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    logger.info(`User logged in: ${user.email}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        kycStatus: user.kycStatus,
        accountType: user.accountType,
        roles: user.roles.map(ur => ur.role.name),
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = tokenService.verifyRefreshToken(refreshToken);
    const tokenHash = tokenService.hashToken(refreshToken);

    const isValid = await tokenService.validateSession(tokenHash, payload.userId);
    if (!isValid) {
      throw new AppError('Invalid refresh token', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new AppError('User not found or inactive', 401);
    }

    const tokens = tokenService.generateTokens(user.id, user.email);
    return tokens;
  }

  async logout(userId: string, refreshToken?: string): Promise<void> {
    if (refreshToken) {
      const tokenHash = tokenService.hashToken(refreshToken);
      await prisma.userSession.updateMany({
        where: { userId, tokenHash, revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        roles: {
          include: { role: true },
        },
        profile: true,
      },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      kycStatus: user.kycStatus,
      accountType: user.accountType,
      roles: user.roles.map(ur => ur.role.name),
      profile: user.profile,
    };
  }
}

export const authService = new AuthService();