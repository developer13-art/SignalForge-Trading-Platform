import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { prisma } from '../config/database';

export class WhiteLabelController {
  async list(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const projects = await prisma.whiteLabelProject.findMany();
      res.json({ success: true, data: projects });
    } catch (error) { next(error); }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await prisma.whiteLabelProject.create({ data: req.body });
      res.json({ success: true, data: project });
    } catch (error) { next(error); }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await prisma.whiteLabelProject.update({
        where: { id: req.params.id },
        data: req.body,
      });
      res.json({ success: true, data: project });
    } catch (error) { next(error); }
  }
}

export const whiteLabelController = new WhiteLabelController();