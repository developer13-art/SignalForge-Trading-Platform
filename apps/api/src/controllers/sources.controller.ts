import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { sourceService } from '../services/sources/source.service';
import { telegramService } from '../services/sources/telegram.service';
import { messageService } from '../services/sources/message.service';

export class SourcesController {
  async createSource(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const source = await sourceService.createSource(req.user!.id, req.body);
      res.status(201).json({ success: true, data: source });
    } catch (error) {
      next(error);
    }
  }

  async getSources(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const sources = await sourceService.getUserSources(req.user!.id);
      res.json({ success: true, data: sources });
    } catch (error) {
      next(error);
    }
  }

  async getSource(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const source = await sourceService.getSourceById(req.user!.id, req.params.id);
      res.json({ success: true, data: source });
    } catch (error) {
      next(error);
    }
  }

  async updateSource(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const source = await sourceService.updateSource(req.user!.id, req.params.id, req.body);
      res.json({ success: true, data: source });
    } catch (error) {
      next(error);
    }
  }

  async deleteSource(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await sourceService.deleteSource(req.user!.id, req.params.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // Telegram
  async initiateTelegramConnection(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await telegramService.initiateConnection(req.user!.id, req.body.phoneNumber);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async verifyTelegramConnection(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await telegramService.verifyConnection(
        req.user!.id,
        req.body.phoneNumber,
        req.body.phoneCodeHash,
        req.body.code,
        req.body.password
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getTelegramStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const status = await telegramService.getConnectionStatus(req.user!.id);
      res.json({ success: true, data: status });
    } catch (error) {
      next(error);
    }
  }

  async discoverTelegramChannels(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const channels = await telegramService.discoverChannels(req.user!.id);
      res.json({ success: true, data: channels });
    } catch (error) {
      next(error);
    }
  }

  async selectTelegramChannel(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await telegramService.selectChannel(
        req.user!.id,
        req.body.channelId,
        req.body.isMonitored
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async disconnectTelegram(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const result = await telegramService.disconnect(req.user!.id);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  // Messages
  async getMessages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { sourceId, limit } = req.query;
      const messages = await messageService.getUserMessages(
        req.user!.id,
        sourceId as string,
        limit ? parseInt(limit as string) : 50
      );
      res.json({ success: true, data: messages });
    } catch (error) {
      next(error);
    }
  }

  async getMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const message = await messageService.getMessageById(req.user!.id, req.params.id);
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }
}

export const sourcesController = new SourcesController();