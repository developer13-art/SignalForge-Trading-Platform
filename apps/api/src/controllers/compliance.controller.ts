import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class ComplianceController {
  async getKycQueue(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const items = await prisma.kycApplication.findMany({
        where: { status: { in: ['PENDING', 'UNDER_REVIEW'] } },
        include: { user: { select: { email: true, firstName: true, lastName: true } } },
      });
      res.json({ success: true, data: items });
    } catch (error) { next(error); }
  }

  async getDocumentTypes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const types = await prisma.kycDocumentType.findMany();
      res.json({ success: true, data: types });
    } catch (error) { next(error); }
  }

  async createDocumentType(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const type = await prisma.kycDocumentType.create({ data: req.body });
      res.json({ success: true, data: type });
    } catch (error) { next(error); }
  }
}

export const complianceController = new ComplianceController();