export class PreferenceService {
  async get(userId: string) {
    return {};
  }

  async update(userId: string, prefs: any) {
    return prefs;
  }
}

export const preferenceService = new PreferenceService();