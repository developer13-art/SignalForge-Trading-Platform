import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { securityHeaders } from './middleware/security.middleware';
import { rateLimiter } from './middleware/rateLimit.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import kycRoutes from './routes/kyc.routes';
import subscriptionRoutes from './routes/subscriptions.routes';
import webhookRoutes from './routes/webhooks.routes';
import signalSourceRoutes from './routes/signal-sources.routes';
import aiRoutes from './routes/ai.routes';
import tradingRoutes from './routes/trading.routes';
import riskRoutes from './routes/risk.routes';
import analyticsRoutes from './routes/analytics.routes';
import referralRoutes from './routes/referrals.routes';
import brokerRoutes from './routes/brokers.routes';

import dashboardRoutes from './routes/dashboard.routes';
// ...


export function createApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(securityHeaders);
  app.use(cors({
    origin: env.APP_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  }));

  app.use('/api/webhooks', webhookRoutes);

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(compression());

  if (env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined'));
  }

  app.use('/api', rateLimiter);

  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'signalforge-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // All API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/kyc', kycRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);
  app.use('/api/signal-sources', signalSourceRoutes);
  app.use('/api/ai', aiRoutes);
  app.use('/api/trading', tradingRoutes);
  app.use('/api/risk', riskRoutes);
  app.use('/api/analytics', analyticsRoutes);
  app.use('/api/referrals', referralRoutes);
  app.use('/api/brokers', brokerRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export default createApp;