export class GridService {
  async detect(userId: string): Promise<boolean> {
    return false;
  }
}

export const gridService = new GridService();