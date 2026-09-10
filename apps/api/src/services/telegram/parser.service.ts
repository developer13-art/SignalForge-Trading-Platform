import { parserService } from '../ai/parser.service';

export class TelegramParserService {
  async parseMessage(messageText: string, providerId?: string) {
    return parserService.parseSignal({ messageText, providerId });
  }
}

export const telegramParserService = new TelegramParserService();