export class RatiosService {
  calculateSharpe(returns: number[]): number {
    if (returns.length === 0) return 0;
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - avg, 2), 0) / returns.length;
    const stdDev = Math.sqrt(variance);
    return stdDev > 0 ? (avg / stdDev) * Math.sqrt(252) : 0;
  }

  calculateSortino(returns: number[]): number {
    if (returns.length === 0) return 0;
    const avg = returns.reduce((a, b) => a + b, 0) / returns.length;
    const downside = returns.filter(r => r < 0);
    const downsideDeviation = Math.sqrt(
      downside.reduce((sum, r) => sum + Math.pow(r, 2), 0) / returns.length
    );
    return downsideDeviation > 0 ? (avg / downsideDeviation) * Math.sqrt(252) : 0;
  }
}

export const ratiosService = new RatiosService();