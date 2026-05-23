import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

interface ThemeStore {
  theme: 'light' | 'dark' | 'system';
  resolvedTheme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: getSystemTheme(),
      toggleTheme: () => {
        const current = get().resolvedTheme;
        const newTheme = current === 'light' ? 'dark' : 'light';
        set({ theme: newTheme, resolvedTheme: newTheme });
      },
      setTheme: (theme) => {
        const resolved = theme === 'system' ? getSystemTheme() : theme;
        set({ theme, resolvedTheme: resolved });
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
