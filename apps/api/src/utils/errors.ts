// apps/api/src/utils/errors.ts
import { AppError } from '../middleware/error.middleware';

export function createError(message: string, statusCode: number, details?: Record<string, unknown>): AppError {
  return new AppError(message, statusCode, details);
}

export const Errors = {
  Unauthorized: () => new AppError('Unauthorized', 401),
  Forbidden: () => new AppError('Forbidden', 403),
  NotFound: (resource: string = 'Resource') => new AppError(`${resource} not found`, 404),
  Conflict: (message: string) => new AppError(message, 409),
  ValidationError: (details?: Record<string, unknown>) => new AppError('Validation failed', 422, details),
  InternalError: (message: string = 'Internal server error') => new AppError(message, 500),
  KYCRequired: () => new AppError('KYC verification required', 403, { kycRequired: true }),
  SubscriptionRequired: () => new AppError('Active subscription required', 403, { subscriptionRequired: true }),
  AccountSuspended: () => new AppError('Account is suspended', 403),
};