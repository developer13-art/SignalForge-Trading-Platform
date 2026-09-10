import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { adminService } from '../services/admin/admin.service';
import { getPaginationParams, createPaginatedResult } from '../utils/pagination';

export class AdminController {
  async getOverview(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await adminService.getOverview();
      res.json({ success: true, data });
    } catch (error) { next(error); }
  }

  async getUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const { users, total } = await adminService.getUsers({
        page: params.page,
        limit: params.limit,
        search: req.query.search as string,
      });
      res.json({ success: true, data: createPaginatedResult(users, total, params.page, params.limit) });
    } catch (error) { next(error); }
  }

  async updateUserStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { status, reason } = req.body;
      const user = await adminService.updateUserStatus(req.params.id, status, req.user!.id, reason);
      res.json({ success: true, data: user });
    } catch (error) { next(error); }
  }

  async getAuditLogs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const params = getPaginationParams(req.query);
      const { logs, total } = await adminService.getAuditLogs({
        page: params.page,
        limit: params.limit,
        action: req.query.action as string,
      });
      res.json({ success: true, data: createPaginatedResult(logs, total, params.page, params.limit) });
    } catch (error) { next(error); }
  }

  async getSystemHealth(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const health = await adminService.getSystemHealth();
      res.json({ success: true, data: health });
    } catch (error) { next(error); }
  }

  async getRevenueStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await adminService.getRevenueStats();
      res.json({ success: true, data: stats });
    } catch (error) { next(error); }
  }
}

export const adminController = new AdminController();