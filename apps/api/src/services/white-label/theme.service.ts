export class ThemeService {
  async updateTheme(projectId: string, theme: any) {
    return theme;
  }
}

export const themeService = new ThemeService();