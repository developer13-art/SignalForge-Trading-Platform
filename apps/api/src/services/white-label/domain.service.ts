export class DomainService {
  async verifyDomain(domain: string): Promise<boolean> {
    return true;
  }
}

export const domainService = new DomainService();