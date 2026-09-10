export class PricingService {
  async updatePricing(projectId: string, pricing: any) {
    return pricing;
  }
}

export const pricingService = new PricingService();