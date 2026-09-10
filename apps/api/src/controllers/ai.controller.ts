import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { aiService } from '../services/ai/ai.service';
import { interpretationService } from '../services/ai/interpretation.service';
import { parserService } from '../services/ai/parser.service';
import { prisma } from '../config/database';

export class AiController {
  async parseMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { messageText } = req.body;
      const result = await parserService.parseSignal({ messageText });
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async classifyMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { messageText } = req.body;
      const result = await interpretationService.classifyMessage(messageText);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async processMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { messageId } = req.body;
      const result = await aiService.processMessage(messageId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getProviderDna(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { providerId } = req.params;
      const dna = await aiService.getProviderDna(providerId);
      res.json({ success: true, data: dna });
    } catch (error) {
      next(error);
    }
  }

  async testProviderDna(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { providerId, testMessage } = req.body;
      const result = await aiService.testProviderDna(providerId, testMessage);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getProcessingLogs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const logs = await prisma.signalParse.findMany({
        include: {
          signal: {
            select: {
              id: true,
              symbol: true,
              direction: true,
              rawText: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      });
      res.json({ success: true, data: logs });
    } catch (error) {
      next(error);
    }
  }
}

export const aiController = new AiController();