import { env } from '../../config/env';
import { logger } from '@signalforge/logger';

export class EmailService {
  async send(to: string, subject: string, html: string): Promise<void> {
    logger.info(`Email would be sent to ${to}: ${subject}`);
  }

  async sendVerificationEmail(to: string, token: string) {
    const link = `${env.APP_URL}/verify-email?token=${token}`;
    await this.send(to, 'Verify your email', `<a href="${link}">Verify</a>`);
  }

  async sendPasswordReset(to: string, token: string) {
    const link = `${env.APP_URL}/reset-password?token=${token}`;
    await this.send(to, 'Reset your password', `<a href="${link}">Reset</a>`);
  }
}

export const emailService = new EmailService();