export const storageService = {
  get<T>(key: string): T | null {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  clear(): void {
    localStorage.clear();
  },

  session: {
    get<T>(key: string): T | null {
      try {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      } catch {
        return null;
      }
    },
    set<T>(key: string, value: T): void {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove(key: string): void {
      sessionStorage.removeItem(key);
    },
  },
};