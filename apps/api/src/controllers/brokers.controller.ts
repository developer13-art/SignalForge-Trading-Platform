import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { brokerService } from '../services/brokers/broker.service';

export class BrokersController {
  async getBrokers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const brokers = await brokerService.getBrokers();
      res.json({ success: true, data: brokers });
    } catch (error) {
      next(error);
    }
  }

  async connect(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const account = await brokerService.connectBroker(req.user!.id, req.body);
      res.status(201).json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async getAccounts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const accounts = await brokerService.getUserAccounts(req.user!.id);
      res.json({ success: true, data: accounts });
    } catch (error) {
      next(error);
    }
  }

  async getAccount(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const account = await brokerService.getAccountDetails(req.user!.id, req.params.id);
      res.json({ success: true, data: account });
    } catch (error) {
      next(error);
    }
  }

  async disconnect(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await brokerService.disconnectAccount(req.user!.id, req.params.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async sync(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await brokerService.syncAccount(req.user!.id, req.params.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const brokersController = new BrokersController();