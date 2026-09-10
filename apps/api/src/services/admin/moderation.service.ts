export class ModerationService {
  async flagContent(resourceType: string, resourceId: string, reason: string) {
    return { flagged: true };
  }

  async reviewQueue() {
    return [];
  }
}

export const moderationService = new ModerationService();