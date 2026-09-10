import { connectDatabase } from './config/database';
import { startAllWorkers } from './workers/worker-runner';
import { logger } from '@signalforge/logger';

async function startWorkerProcess() {
  try {
    await connectDatabase();
    await startAllWorkers();

    logger.info('✅ Worker process started successfully');

    const shutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down workers...`);
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    logger.error('Failed to start worker process:', error);
    process.exit(1);
  }
}

startWorkerProcess();