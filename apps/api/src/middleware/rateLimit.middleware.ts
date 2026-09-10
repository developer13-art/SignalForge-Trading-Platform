import rateLimit from 'express-rate-limit';
import { env } from '../config/env';

export const rateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many requests, please try again later.',
      code: 429,
    },
  },
  skip: (req) => {
    // Skip rate limiting entirely in development
    if (env.NODE_ENV === 'development') return true;
    // Always skip for health checks
    if (req.path === '/health') return true;
    return false;
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 1000 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many authentication attempts, please try again later.',
      code: 429,
    },
  },
  skipSuccessfulRequests: true,
});

export default rateLimiter;