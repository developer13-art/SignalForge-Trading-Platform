import { prisma } from '../../config/database';
import { generateReferralCode } from '../../utils/hashing';

export class ReferralCodeService {
  async getOrCreate(userId: string) {
    let code = await prisma.referralCode.findUnique({ where: { userId } });
    if (!code) {
      let uniqueCode = '';
      let isUnique = false;
      while (!isUnique) {
        uniqueCode = generateReferralCode();
        const existing = await prisma.referralCode.findUnique({ where: { code: uniqueCode } });
        if (!existing) isUnique = true;
      }
      code = await prisma.referralCode.create({ data: { userId, code: uniqueCode } });
    }
    return code;
  }

  async findByCode(code: string) {
    return prisma.referralCode.findUnique({ where: { code } });
  }
}

export const referralCodeService = new ReferralCodeService();