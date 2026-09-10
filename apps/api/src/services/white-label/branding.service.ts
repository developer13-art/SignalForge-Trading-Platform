export class BrandingService {
  async updateBranding(projectId: string, branding: any) {
    return branding;
  }
}

export const brandingService = new BrandingService();