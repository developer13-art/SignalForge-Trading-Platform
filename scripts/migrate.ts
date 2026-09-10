import { execSync } from 'child_process';

function runMigrations() {
  console.log('Running database migrations...');
  try {
    execSync('pnpm --filter @signalforge/database db:deploy', { stdio: 'inherit' });
    console.log('Migrations complete');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();