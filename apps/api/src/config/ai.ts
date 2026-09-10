// apps/api/src/config/ai.ts
import { env } from './env';

export type AIProvider = 'anthropic' | 'openai';

export const aiConfig = {
  provider: env.AI_PROVIDER as AIProvider,
  
  anthropic: {
    apiKey: env.ANTHROPIC_API_KEY || '',
    model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    temperature: 0.1,
  },
  
  openai: {
    apiKey: env.OPENAI_API_KEY || '',
    model: env.OPENAI_MODEL || 'gpt-4o',
    maxTokens: 4096,
    temperature: 0.1,
  },
  
  isValid(): boolean {
    if (this.provider === 'anthropic') {
      return Boolean(this.anthropic.apiKey);
    }
    if (this.provider === 'openai') {
      return Boolean(this.openai.apiKey);
    }
    if (this.provider === 'both') {
      return Boolean(this.anthropic.apiKey || this.openai.apiKey);
    }
    return false;
  },
  
  getPrimaryProvider(): AIProvider {
    if (this.provider === 'both') {
      return this.anthropic.apiKey ? 'anthropic' : 'openai';
    }
    return this.provider;
  },
};

export default aiConfig;