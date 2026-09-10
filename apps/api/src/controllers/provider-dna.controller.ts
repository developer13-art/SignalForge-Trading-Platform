import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { dnaService } from '../services/provider-dna/dna.service';

export class ProviderDnaController {
  async get(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const dna = await dnaService.getProviderDna(req.params.providerId);
      res.json({ success: true, data: dna });
    } catch (error) { next(error); }
  }

  async test(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { providerId, testMessage } = req.body;
      const result = await dnaService.testDna(providerId, testMessage);
      res.json({ success: true, data: result });
    } catch (error) { next(error); }
  }
}

export const providerDnaController = new ProviderDnaController();