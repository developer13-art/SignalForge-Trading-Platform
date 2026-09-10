export class StyleService {
  async classify(userId: string): Promise<string> {
    return 'Unknown';
  }
}

export const styleService = new StyleService();