export class SystemService {
  async getHealth() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  async getSettings() {
    return [];
  }
}

export const systemService = new SystemService();