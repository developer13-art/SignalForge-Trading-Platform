import { prisma } from '../../config/database';

export class RecoveryService {
  async generateRecoveryCodes(userId: string, count: number = 8): Promise<string[]> {
    const crypto = require('crypto');
    const codes: string[] = [];

    for (let i = 0; i < count; i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4, 8)}`);
    }

    await prisma.twoFactorAuth.upsert({
      where: { userId },
      create: {
        userId,
        secret: '',
        enabled: false,
        recoveryCodes: codes,
      },
      update: {
        recoveryCodes: codes,
      },
    });

    return codes;
  }

  async useRecoveryCode(userId: string, code: string): Promise<boolean> {
    const twoFactor = await prisma.twoFactorAuth.findUnique({
      where: { userId },
    });

    if (!twoFactor) {
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

export const recoveryService = new RecoveryService();