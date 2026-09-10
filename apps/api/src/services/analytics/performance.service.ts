import { analyticsService } from './analytics.service';

export const performanceService = {
  getMetrics: analyticsService.getPerformanceMetrics.bind(analyticsService),
};