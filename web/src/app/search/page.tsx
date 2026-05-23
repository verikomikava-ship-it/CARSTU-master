'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '@/components/search/SearchBar';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { getProducts } from '@/services/product-service';
import { Product } from '@/types/product';

export default function SearchPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.length < 2) { setResults([]); setSearched(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getProducts({ search: text, limit: 30 });
        setResults(data); setSearched(true);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    }, 400);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-card border border-border p-4 rounded-2xl mb-6">
        <SearchBar value={query} onChange={handleSearch} onClear={() => handleSearch('')} autoFocus />
      </div>
      {loading ? <LoadingSpinner /> : searched && results.length === 0 ? (
        <EmptyState icon="magnify-close" title={t('common.noResults')} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {results.map((product) => (<ProductCard key={product.id} product={product} />))}
        </div>
      )}
    </div>
  );
}
