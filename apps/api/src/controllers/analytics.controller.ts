import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { analyticsService } from '../services/analytics/analytics.service';

export class AnalyticsController {
  async getPerformance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { startDate, endDate } = req.query;
      const metrics = await analyticsService.getPerformanceMetrics(
        req.user!.id,
        startDate ? new Date(startDate as string) : undefined,
        endDate ? new Date(endDate as string) : undefined
      );
      res.json({ success: true, data: metrics });
    } catch (error) {
      next(error);
    }
  }

  async getEquityCurve(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const curve = await analyticsService.getEquityCurve(req.user!.id, days);
      res.json({ success: true, data: curve });
    } catch (error) {
      next(error);
    }
  }

  async getSymbolPerformance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getSymbolPerformance(req.user!.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getProviderPerformance(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getProviderPerformance(req.user!.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getTradingCalendar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const year = parseInt(req.query.year as string) || new Date().getFullYear();
      const month = parseInt(req.query.month as string) || new Date().getMonth() + 1;
      const data = await analyticsService.getTradingCalendar(req.user!.id, year, month);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }

  async getLatencyStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const data = await analyticsService.getExecutionLatencyStats(req.user!.id);
      res.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}

export const analyticsController = new AnalyticsController();