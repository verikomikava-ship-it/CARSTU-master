'use client';

import Link from 'next/link';
import { useLanguageStore } from '@/stores/language-store';
import { Category } from '@/types/category';

const EMOJI_MAP: Record<string, string> = {
  'tech-gadgets': '\uD83D\uDCF1',
  'cleaning-care': '\uD83E\uDDF9',
  'organization': '\uD83D\uDCE6',
  'comfort': '\uD83D\uDE0C',
  'interior-style': '\u2728',
  'safety-emergency': '\uD83D\uDEE0\uFE0F',
  'daily-essentials': '\uD83E\uDDF0',
  // Fallbacks for DB-driven icons
  'car-seat': '\uD83D\uDCBA',
  'car-side': '\uD83C\uDFA8',
  'tire': '\uD83D\uDEDE',
  'chip': '\uD83D\uDCF1',
  'lightbulb-on': '\uD83D\uDCA1',
  'engine': '\uD83D\uDD27',
  'air-filter': '\uD83E\uDE9F',
  'oil': '\uD83D\uDEE2\uFE0F',
  'shield-car': '\uD83D\uDEE1\uFE0F',
  'speaker': '\uD83C\uDFB5',
  'spray-bottle': '\uD83E\uDDFC',
  'truck-trailer': '\uD83D\uDCE6',
};

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const { language } = useLanguageStore();
  const name = language === 'ka' ? category.name_ka : category.name_en;
  const emoji = EMOJI_MAP[category.slug || category.icon || ''] || '\uD83D\uDE97';

  return (
    <Link
      href={`/category/${category.id}`}
      className="bg-card rounded-2xl border border-border p-4 flex flex-col items-center justify-center
        min-h-[120px] hover:shadow-card-hover hover:border-blue/20 transition-all duration-300 group"
    >
      <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center mb-3
        group-hover:scale-110 group-hover:bg-blue/15 transition-all">
        <span className="text-[28px]">{emoji}</span>
      </div>
      <span className="text-[13px] font-semibold text-text-primary text-center leading-[18px]">
        {name}
      </span>
    </Link>
  );
}
