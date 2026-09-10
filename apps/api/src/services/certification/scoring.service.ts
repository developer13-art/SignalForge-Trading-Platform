import { accuracyService } from './accuracy.service';
import { qualityService } from './quality.service';

export class ScoringService {
  calculateOverallScore(metrics: any): number {
    return qualityService.calculateScore({
      parsingAccuracy: metrics.parsingAccuracy || 0,
      consistency: metrics.consistency || 0,
      performance: metrics.performance || 0,
      risk: metrics.risk || 0,
    });
  }
}

export const scoringService = new ScoringService();