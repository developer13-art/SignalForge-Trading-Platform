export class AccuracyService {
  calculateAccuracy(correct: number, total: number): number {
    if (total === 0) return 0;
    return (correct / total) * 100;
  }
}

export const accuracyService = new AccuracyService();