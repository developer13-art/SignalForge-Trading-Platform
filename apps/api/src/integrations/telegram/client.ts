import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
import { telegramConfig } from '../../config/telegram';
import { logger } from '@signalforge/logger';

export interface TelegramClientConfig {
  session: string;
  phoneNumber: string;
  onCodeRequest: (phoneNumber: string) => Promise<string>;
  onPasswordRequest: () => Promise<string>;
}

export class TelegramClientWrapper {
  private client: TelegramClient | null = null;
  private apiId: number;
  private apiHash: string;

  constructor() {
    this.apiId = parseInt(telegramConfig.apiId);
    this.apiHash = telegramConfig.apiHash;
  }

  async createClient(session: string = ''): Promise<TelegramClient> {
    if (!telegramConfig.isValid()) {
      throw new Error('Telegram API credentials not configured');
    }

    const stringSession = new StringSession(session);

    this.client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
      connectionRetries: 5,
    });

    return this.client;
  }

  async connect(session: string, phoneNumber: string, callbacks: {
    onCodeRequest: (phoneNumber: string) => Promise<string>;
    onPasswordRequest: () => Promise<string>;
  }): Promise<string> {
    const client = await this.createClient(session);

    await client.start({
      phoneNumber: async () => phoneNumber,
      password: callbacks.onPasswordRequest,
      phoneCode: callbacks.onCodeRequest,
      onError: (err) => logger.error('Telegram client error:', err),
    });

    const newSession = (client.session as StringSession).save();
    logger.info('Telegram client connected successfully');

    return newSession;
  }

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.disconnect();
      this.client = null;
      logger.info('Telegram client disconnected');
    }
  }

  getClient(): TelegramClient | null {
    return this.client;
  }

  async getDialogs(): Promise<Array<{ id: string; name: string; type: string }>> {
    if (!this.client) {
      throw new Error('Telegram client not connected');
    }

    const dialogs = await this.client.getDialogs();
    return dialogs.map((dialog) => ({
      id: dialog.id?.toString() || '',
      name: dialog.title || dialog.name || '',
      type: dialog.isChannel ? 'channel' : dialog.isGroup ? 'group' : 'user',
    }));
  }
}