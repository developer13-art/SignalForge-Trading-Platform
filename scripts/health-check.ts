// scripts/health-check.ts
import { execSync } from 'child_process';
import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4000';
const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';

async function healthCheck() {
  console.log('🏥 SignalForge Health Check');
  console.log('==========================\n');

  // Check API
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log(`✅ API: ${response.status} - ${response.data.status}`);
  } catch (error) {
    console.log(`❌ API: Unreachable at ${API_URL}`);
    process.exitCode = 1;
  }

  // Check Web
  try {
    const response = await axios.get(WEB_URL);
    console.log(`✅ Web: ${response.status}`);
  } catch (error) {
    console.log(`❌ Web: Unreachable at ${WEB_URL}`);
    process.exitCode = 1;
  }

  // Check Database
  try {
    execSync('docker exec signalforge-postgres pg_isready -U signalforge', { stdio: 'pipe' });
    console.log('✅ PostgreSQL: Ready');
  } catch (error) {
    console.log('❌ PostgreSQL: Not ready');
    process.exitCode = 1;
  }

  // Check Redis
  try {
    execSync('docker exec signalforge-redis redis-cli ping', { stdio: 'pipe' });
    console.log('✅ Redis: Ready');
  } catch (error) {
    console.log('❌ Redis: Not ready');
    process.exitCode = 1;
  }

  console.log('\n==========================');
}

healthCheck();