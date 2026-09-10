export class KnowledgeBaseService {
  async listArticles() {
    return [];
  }

  async getArticle(id: string) {
    return { id, title: '', content: '' };
  }
}

export const knowledgeBaseService = new KnowledgeBaseService();