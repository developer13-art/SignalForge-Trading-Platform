import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';

export class SupportController {
  async listTickets(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: [] });
    } catch (error) { next(error); }
  }

  async createTicket(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: { id: 'new' } });
    } catch (error) { next(error); }
  }

  async getTicket(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      res.json({ success: true, data: null });
    } catch (error) { next(error); }
  }
}

export const supportController = new SupportController();