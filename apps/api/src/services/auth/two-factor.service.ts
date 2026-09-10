import { authenticator } from 'otplib';
import { prisma } from '../../config/database';

export class TwoFactorService {
  generateSecret(): string {
    return authenticator.generateSecret();
  }

  generateOtpAuthUrl(email: string, secret: string): string {
    return authenticator.keyuri(email, 'SignalForge AI', secret);
  }

  verifyCode(secret: string, code: string): boolean {
    return authenticator.verify({ token: code, secret });
  }

  generateRecoveryCodes(count: number = 8): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      const code = require('crypto').randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}`);
    }
    return codes;
  }

  async enableTwoFactor(userId: string, secret: string): Promise<string[]> {
    const recoveryCodes = this.generateRecoveryCodes();

    await prisma.twoFactorAuth.upsert({
      where: { userId },
      create: {
        userId,
        secret,
        enabled: true,
        verifiedAt: new Date(),
        recoveryCodes,
      },
      update: {
        secret,
        enabled: true,
        verifiedAt: new Date(),
        recoveryCodes,
      },
    });

    return recoveryCodes;
  }

  async disableTwoFactor(userId: string): Promise<void> {
    await prisma.twoFactorAuth.update({
      where: { userId },
      data: {
        enabled: false,
        secret: '',
        recoveryCodes: [],
      },
    });
  }

  async getTwoFactor(userId: string) {
    return prisma.twoFactorAuth.findUnique({
      where: { userId },
    });
  }

  async verifyRecoveryCode(userId: string, code: string): Promise<boolean> {
    const twoFactor = await this.getTwoFactor(userId);
    if (!twoFactor || !twoFactor.enabled) {
      return false;
    }

    const codeIndex = twoFactor.recoveryCodes.indexOf(code);
    if (codeIndex === -1) {
      return false;
    }

    const updatedCodes = [...twoFactor.recoveryCodes];
    updatedCodes.splice(codeIndex, 1);

    await prisma.twoFactorAuth.update({
      where: { userId },
      data: { recoveryCodes: updatedCodes },
    });

    return true;
  }
}

export const twoFactorService = new TwoFactorService();