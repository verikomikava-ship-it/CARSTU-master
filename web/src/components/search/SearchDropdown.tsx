'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Search, X, Car, Loader2 } from 'lucide-react';
import { useLanguageStore } from '@/stores/language-store';
import { getProducts } from '@/services/product-service';
import { formatPrice } from '@/utils/format-price';
import { Product } from '@/types/product';

export function SearchDropdown() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSearched(false);
        setResults([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setSearched(false);
        setResults([]);
        inputRef.current?.blur();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (text.length < 2) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await getProducts({ search: text, limit: 8 });
        setResults(data);
        setSearched(true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Always-visible Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => { if (query.length >= 2 && results.length > 0) setSearched(true); }}
          placeholder={`${t('common.search')}...`}
          className="w-[160px] sm:w-[220px] md:w-[260px] pl-9 pr-8 py-1.5 rounded-xl border border-border bg-input-bg
            text-sm text-text-primary placeholder:text-text-muted
            focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue
            transition-all"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {query.length >= 2 && (loading || searched) && (
        <div className="absolute right-0 top-full mt-2 w-[320px] sm:w-[400px] max-h-[70vh] overflow-y-auto
          bg-card border border-border rounded-2xl shadow-card-hover z-[100]">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-blue animate-spin" />
            </div>
          ) : searched && results.length === 0 ? (
            <div className="py-8 text-center">
              <Search className="w-8 h-8 text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-muted">{t('common.noResults')}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => {
                const name = language === 'ka' ? product.name_ka : product.name_en;
                const primaryImage = product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url;
                const discount = product.sale_price
                  ? Math.round((1 - product.sale_price / product.price) * 100)
                  : 0;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={handleResultClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-card-hover transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-border-light flex-shrink-0 overflow-hidden relative">
                      {primaryImage ? (
                        <Image
                          src={primaryImage}
                          alt={name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Car className="w-5 h-5 text-text-muted" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-text-primary truncate">{name}</p>
                      {product.brand && (
                        <p className="text-xs text-text-muted">{product.brand}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-text-primary">
                        {formatPrice(product.sale_price ?? product.price)}
                      </p>
                      {discount > 0 && (
                        <p className="text-[11px] text-text-muted line-through">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
