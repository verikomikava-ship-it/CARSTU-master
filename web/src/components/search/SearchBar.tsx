'use client';

import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, onClear, autoFocus }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`${t('common.search')}...`}
        autoFocus={autoFocus}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-input-bg
          text-text-primary placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue
          transition-all"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-muted hover:text-text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
