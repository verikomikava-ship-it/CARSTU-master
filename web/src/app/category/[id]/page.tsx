'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { useLanguageStore } from '@/stores/language-store';
import { getCategoryById, getSubcategories } from '@/services/category-service';
import { getProducts } from '@/services/product-service';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  // Resolved real category ID (UUID) after lookup
  const [catId, setCatId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getCategoryById(id)
        .then((cat) => {
          setCategory(cat);
          if (cat) {
            setCatId(cat.id);
            return getSubcategories(cat.id);
          }
          return [];
        })
        .then((subs) => setSubcategories(subs))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  useEffect(() => {
    if (catId) {
      if (selectedSub) {
        getProducts({ categoryId: selectedSub, sortBy, limit: 50 }).then(setProducts).catch(console.error);
      } else {
        const allIds = [catId, ...subcategories.map((s) => s.id)];
        getProducts({ categoryIds: allIds, sortBy, limit: 50 }).then(setProducts).catch(console.error);
      }
    }
  }, [catId, selectedSub, sortBy, subcategories]);

  if (loading) return <LoadingSpinner />;

  const categoryName = category ? (language === 'ka' ? category.name_ka : category.name_en) : '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-4">{categoryName}</h1>

      {subcategories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 scrollbar-hide">
          <button
            onClick={() => setSelectedSub(null)}
            className={`px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all ${
              !selectedSub ? 'gradient-primary text-white' : 'bg-card border border-border text-text-secondary hover:bg-card-hover'
            }`}
          >
            {t('catalog.allCategories')}
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSub(sub.id)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium whitespace-nowrap transition-all ${
                selectedSub === sub.id ? 'gradient-primary text-white' : 'bg-card border border-border text-text-secondary hover:bg-card-hover'
              }`}
            >
              {language === 'ka' ? sub.name_ka : sub.name_en}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] text-text-secondary">
          {t('catalog.resultsCount', { count: products.length })}
        </span>
        <div className="flex gap-1">
          {(['newest', 'price_asc', 'price_desc'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                sortBy === s
                  ? 'bg-blue/10 text-blue'
                  : 'bg-card border border-border text-text-muted hover:bg-card-hover'
              }`}
            >
              {s === 'newest' ? t('catalog.sortByNewest') : s === 'price_asc' ? '\u20BE\u2191' : '\u20BE\u2193'}
            </button>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState icon="package-variant" title={t('common.noResults')} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
