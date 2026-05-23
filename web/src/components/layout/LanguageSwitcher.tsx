'use client';

import { useLanguageStore } from '@/stores/language-store';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <button
      onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
      className="px-3 py-1.5 rounded-xl text-[12px] font-semibold border border-border
        hover:bg-card-hover transition-all text-text-secondary"
    >
      {language === 'ka' ? 'EN' : 'KA'}
    </button>
  );
}
