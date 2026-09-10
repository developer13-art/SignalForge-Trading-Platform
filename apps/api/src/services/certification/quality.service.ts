export class QualityService {
  calculateScore(data: {
    parsingAccuracy: number;
    consistency: number;
    performance: number;
    risk: number;
  }): number {
    return (
      data.parsingAccuracy * 0.3 +
      data.consistency * 0.25 +
      data.performance * 0.25 +
      data.risk * 0.2
    );
  }
}

export const qualityService = new QualityService();