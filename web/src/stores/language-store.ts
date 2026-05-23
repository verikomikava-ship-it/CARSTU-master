import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/i18n';

interface LanguageStore {
  language: 'ka' | 'en';
  setLanguage: (lang: 'ka' | 'en') => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'ka',
      setLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
