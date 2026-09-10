export const AI_MODELS = {
  ANTHROPIC: {
    SONNET: 'claude-sonnet-4-20250514',
    HAIKU: 'claude-haiku-4-20250514',
  },
  OPENAI: {
    GPT4O: 'gpt-4o',
    GPT4O_MINI: 'gpt-4o-mini',
  },
} as const;

export const DEFAULT_AI_CONFIG = {
  maxTokens: 4096,
  temperature: 0.1,
} as const;

export default AI_MODELS;