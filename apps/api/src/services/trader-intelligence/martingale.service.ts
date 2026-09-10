export class MartingaleService {
  async detect(userId: string): Promise<boolean> {
    return false;
  }
}

export const martingaleService = new MartingaleService();