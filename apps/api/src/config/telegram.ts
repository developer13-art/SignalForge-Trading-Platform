// apps/api/src/config/telegram.ts
import { env } from './env';

export const telegramConfig = {
  apiId: env.TELEGRAM_API_ID || '',
  apiHash: env.TELEGRAM_API_HASH || '',
  sessionTimeoutMs: 30 * 60 * 1000, // 30 minutes
  
  isValid(): boolean {
    return Boolean(this.apiId && this.apiHash);
  },
};

export default telegramConfig;