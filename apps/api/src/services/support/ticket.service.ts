export class TicketService {
  async create(userId: string, data: { subject: string; description: string; category: string; priority: string }) {
    return { id: 'new-ticket', ...data, userId, status: 'OPEN' };
  }

  async getById(userId: string, id: string) {
    return { id, userId };
  }

  async reply(userId: string, ticketId: string, message: string) {
    return { ticketId, message, createdAt: new Date() };
  }
}

export const ticketService = new TicketService();