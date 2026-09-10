// apps/api/src/config/metaapi.ts
import { env } from './env';

export const metaApiConfig = {
  token: env.METAAPI_TOKEN || '',
  apiUrl: env.METAAPI_API_URL || 'https://mt-client-api-v1.new-york.agiliumtrade.ai',
  region: 'new-york',
  
  isValid(): boolean {
    return Boolean(this.token && this.token.length > 0);
  },
  
  getHeaders(): Record<string, string> {
    return {
      'auth-token': this.token,
      'Content-Type': 'application/json',
    };
  },
};

export default metaApiConfig;