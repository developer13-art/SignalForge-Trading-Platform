import { AppError } from '../../middleware/error.middleware';
import { logger } from '@signalforge/logger';

export class TelegramAuthService {
  private pendingSessions = new Map<string, any>();

  async initiateLogin(userId: string, phoneNumber: string, countryCode: string) {
    logger.info(`Telegram login initiated for ${phoneNumber}`);
    const phoneCodeHash = Math.random().toString(36).substring(2, 15);
    this.pendingSessions.set(userId, { phoneNumber, phoneCodeHash });
    return { phoneCodeHash, message: 'OTP sent to your Telegram app' };
  }

  async verifyCode(userId: string, code: string) {
    const pending = this.pendingSessions.get(userId);
    if (!pending) throw new AppError('No pending authentication', 400);
    this.pendingSessions.delete(userId);
    return { sessionToken: 'mock-session-token' };
  }

  async verifyPassword(userId: string, password: string) {
    return { sessionToken: 'mock-session-token-2fa' };
  }
}

export const telegramAuthService = new TelegramAuthService();