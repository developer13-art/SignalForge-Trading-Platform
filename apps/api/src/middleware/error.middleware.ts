// apps/api/src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '@signalforge/logger';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  details?: Record<string, unknown>;

  constructor(message: string, statusCode: number, details?: Record<string, unknown>) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = (error as AppError).statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const isOperational = (error as AppError).isOperational || false;

  // Log error
  if (statusCode >= 500) {
    logger.error(`[${req.method}] ${req.originalUrl} - ${message}`, {
      error: error.stack,
      body: req.body,
      params: req.params,
      query: req.query,
    });
  } else {
    logger.warn(`[${req.method}] ${req.originalUrl} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: statusCode,
      details: (error as AppError).details,
      ...(process.env.NODE_ENV === 'development' && !isOperational && { stack: error.stack }),
    },
  });
}