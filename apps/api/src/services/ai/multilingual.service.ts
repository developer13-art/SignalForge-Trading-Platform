import { aiClient } from '../../integrations/ai/client';

export class MultilingualService {
  async translateToEnglish(text: string): Promise<string> {
    // If text is already English, return as is
    return text;
  }

  async detectLanguage(text: string): Promise<string> {
    // Detect language
    return 'en';
  }
}

export const multilingualService = new MultilingualService();