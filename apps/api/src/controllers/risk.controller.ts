import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { riskService } from '../services/risk/risk.service';

export class RiskController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await riskService.getRiskProfile(req.user!.id);
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await riskService.updateRiskProfile(req.user!.id, req.body);
      res.json({ success: true, data: profile });
    } catch (error) {
      next(error);
    }
  }

  async getRules(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rules = await riskService.getAutomationRules(req.user!.id);
      res.json({ success: true, data: rules });
    } catch (error) {
      next(error);
    }
  }

  async createRule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rule = await riskService.createAutomationRule(req.user!.id, req.body);
      res.status(201).json({ success: true, data: rule });
    } catch (error) {
      next(error);
    }
  }

  async updateRule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rule = await riskService.updateAutomationRule(req.user!.id, req.params.id, req.body);
      res.json({ success: true, data: rule });
    } catch (error) {
      next(error);
    }
  }

  async deleteRule(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await riskService.deleteAutomationRule(req.user!.id, req.params.id);
      res.json({ success: true });
    } catch (error) {
      next(error);
    }
  }
}

export const riskController = new RiskController();