export class NewsExposureService {
  async analyze(userId: string): Promise<'low' | 'medium' | 'high'> {
    return 'low';
  }
}

export const newsExposureService = new NewsExposureService();