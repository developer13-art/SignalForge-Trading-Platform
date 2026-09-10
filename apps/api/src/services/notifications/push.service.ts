export class PushService {
  async send(userId: string, title: string, body: string) {
    return { sent: true };
  }
}

export const pushService = new PushService();