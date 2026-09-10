export class ComparisonService {
  async compare(providerIds: string[]) {
    return providerIds.map(id => ({ id }));
  }
}

export const comparisonService = new ComparisonService();