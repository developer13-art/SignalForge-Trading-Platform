import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class CertificationController {
  async getDashboard(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: { status: 'NOT_CERTIFIED', score: 0 } });
    } catch (error) { next(error); }
  }

  async importHistory(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: { imported: 0 } });
    } catch (error) { next(error); }
  }

  async runCertification(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: { status: 'PENDING' } });
    } catch (error) { next(error); }
  }
}

export const certificationController = new CertificationController();