// apps/api/src/config/env.ts
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  APP_NAME: z.string().default('SignalForge AI'),
  API_PORT: z.string().default('4000'),
  APP_URL: z.string().default('http://localhost:3000'),
  API_URL: z.string().default('http://localhost:4000'),
  
  DATABASE_URL: z.string(),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  
  ENCRYPTION_KEY: z.string().min(32),
  
  METAAPI_TOKEN: z.string().optional(),
  METAAPI_API_URL: z.string().default('https://mt-client-api-v1.new-york.agiliumtrade.ai'),
  
  TELEGRAM_API_ID: z.string().optional(),
  TELEGRAM_API_HASH: z.string().optional(),
  
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-sonnet-4-20250514'),
  AI_PROVIDER: z.enum(['anthropic', 'openai', 'both']).default('anthropic'),
  
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-4o'),
  
  PAYSTACK_SECRET_KEY: z.string().optional(),
  PAYSTACK_PUBLIC_KEY: z.string().optional(),
  PAYSTACK_WEBHOOK_SECRET: z.string().optional(),
  
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().optional(),
  
  S3_ACCESS_KEY: z.string().optional(),
  S3_SECRET_KEY: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_ENDPOINT: z.string().optional(),
  
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX_REQUESTS: z.string().default('100'),
  
  KYC_REQUIRED_FOR_SUBSCRIPTION: z.string().default('true'),
  KYC_REQUIRED_FOR_TRADING: z.string().default('true'),
  KYC_REQUIRED_FOR_REFERRAL: z.string().default('true'),
  REFERRAL_REWARD_RATE: z.string().default('0.001'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  ...parsed.data,
  API_PORT: parseInt(parsed.data.API_PORT),
  RATE_LIMIT_WINDOW_MS: parseInt(parsed.data.RATE_LIMIT_WINDOW_MS),
  RATE_LIMIT_MAX_REQUESTS: parseInt(parsed.data.RATE_LIMIT_MAX_REQUESTS),
  KYC_REQUIRED_FOR_SUBSCRIPTION: parsed.data.KYC_REQUIRED_FOR_SUBSCRIPTION === 'true',
  KYC_REQUIRED_FOR_TRADING: parsed.data.KYC_REQUIRED_FOR_TRADING === 'true',
  KYC_REQUIRED_FOR_REFERRAL: parsed.data.KYC_REQUIRED_FOR_REFERRAL === 'true',
  REFERRAL_REWARD_RATE: parseFloat(parsed.data.REFERRAL_REWARD_RATE),
} as const;