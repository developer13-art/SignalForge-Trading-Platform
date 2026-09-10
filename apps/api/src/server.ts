import { createApp } from './app';
import { env } from './config/env';
import { connectDatabase, disconnectDatabase } from './config/database';
import { redis } from './config/redis';
import { logger } from '@signalforge/logger';
import { initializeWebSocket } from './websocket/websocket.server';
import http from 'http';

async function startServer() {
  try {
    await connectDatabase();

    const app = createApp();
    const server = http.createServer(app);

    // Initialize WebSocket
    initializeWebSocket(server);

    server.listen(env.API_PORT, () => {
      logger.info(`🚀 SignalForge API is running on port ${env.API_PORT}`);
      logger.info(`📚 Environment: ${env.NODE_ENV}`);
      logger.info(`🔗 API URL: ${env.API_URL}`);
      logger.info(`🔌 WebSocket: ws://localhost:${env.API_PORT}/ws`);
    });

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');
        await disconnectDatabase();
        await redis.quit();
        process.exit(0);
      });

      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 30000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();