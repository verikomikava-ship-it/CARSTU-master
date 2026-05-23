'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/theme-store';

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl border border-border text-text-secondary
        hover:bg-card-hover hover:text-text-primary transition-all"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
