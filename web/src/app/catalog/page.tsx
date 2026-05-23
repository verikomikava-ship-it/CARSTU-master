'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Loader2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguageStore } from '@/stores/language-store';
import { getCategories, getSubcategories } from '@/services/category-service';
import { getProducts } from '@/services/product-service';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/constants/categories';

const EMOJI_MAP: Record<string, string> = {
  'laptops-computers': '💻',
  'monitors':          '🖥️',
  'keyboards-mice': '⌨️',
  'audio': '🎧',
  'storage': '💾',
  'cables-hubs': '🔌',
  'networking': '🌐',
  'components': '🔧',
};

const SORT_OPTIONS = [
  { value: 'default', labelEn: 'Default', labelKa: 'სტანდარტული' },
  { value: 'price_asc', labelEn: 'Price: Low to High', labelKa: 'ფასი: იაფიდან' },
  { value: 'price_desc', labelEn: 'Price: High to Low', labelKa: 'ფასი: ძვირიდან' },
  { value: 'newest', labelEn: 'Newest First', labelKa: 'ახალი პირველი' },
];

export default function CatalogPage() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0, dragged: false });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = chipsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Mouse wheel → horizontal scroll
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
        updateScrollState();
      }
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', updateScrollState);
    updateScrollState();
    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', updateScrollState);
    };
  }, [loading, updateScrollState]);

  // Drag-to-scroll — distinguishes click vs drag
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragState.current = { active: true, startX: e.clientX, scrollLeft: el.scrollLeft, dragged: false };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragState.current.active) return;
      const dx = e.clientX - dragState.current.startX;
      if (Math.abs(dx) > 4) {
        dragState.current.dragged = true;
        el.scrollLeft = dragState.current.scrollLeft - dx;
        el.style.cursor = 'grabbing';
      }
    };

    const onMouseUp = () => {
      dragState.current.active = false;
      el.style.cursor = 'grab';
    };

    const onClickCapture = (e: MouseEvent) => {
      if (dragState.current.dragged) {
        e.stopPropagation();
        dragState.current.dragged = false;
      }
    };

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('click', onClickCapture, true);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('click', onClickCapture, true);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [loading]);

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const [cats, all] = await Promise.all([
          getCategories(),
          getProducts({ limit: 60 }),
        ]);
        setCategories(cats);
        setAllProducts(all);
        setProducts(all);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
        setTimeout(updateScrollState, 50);
      }
    }
    load();
  }, []);

  const selectCategory = useCallback(async (catId: string | null) => {
    if (catId === selectedCat) {
      setSelectedCat(null);
      setProducts(allProducts);
      return;
    }
    setSelectedCat(catId);
    setProductsLoading(true);
    try {
      if (!catId) {
        setProducts(allProducts);
      } else {
        const subs = await getSubcategories(catId);
        const allIds = [catId, ...subs.map((s) => s.id)];
        const data = await getProducts({ categoryIds: allIds, limit: 60 });
        setProducts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setProductsLoading(false);
    }
  }, [selectedCat, allProducts]);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'price_asc') return (a.sale_price ?? a.price) - (b.sale_price ?? b.price);
    if (sort === 'price_desc') return (b.sale_price ?? b.price) - (a.sale_price ?? a.price);
    return 0;
  });

  if (loading) return <LoadingSpinner />;

  const selectedName = selectedCat
    ? (() => {
        const cat = categories.find(c => c.id === selectedCat);
        return cat ? (language === 'ka' ? cat.name_ka : cat.name_en) : '';
      })()
    : (language === 'ka' ? 'ყველა პროდუქტი' : 'All Products');

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sort);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Page title */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-text-primary">
          {language === 'ka' ? 'კატალოგი' : 'Catalog'}
        </h1>
        <p className="text-[13px] text-text-muted mt-0.5">
          {language === 'ka' ? 'ყველა კომპიუტერული აქსესუარი ერთ ადგილას' : 'All computer accessories in one place'}
        </p>
      </div>

      {/* Results count + sort */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[14px] font-semibold text-text-primary">{selectedName}</h2>
          <span className="text-[12px] text-text-muted">
            {sortedProducts.length} {language === 'ka' ? 'ნივთი' : 'items'}
          </span>
        </div>
        <div className="relative flex-shrink-0" ref={sortRef}>
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12.5px] font-medium
              bg-card border border-border text-text-secondary hover:text-text-primary hover:border-blue/20 transition-all"
          >
            {activeSortLabel ? (language === 'ka' ? activeSortLabel.labelKa : activeSortLabel.labelEn) : ''}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 bg-card border border-border rounded-xl shadow-card-hover z-20 py-1 min-w-[180px]">
              {SORT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => { setSort(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-[12.5px] transition-colors
                    ${sort === opt.value ? 'text-blue font-medium bg-blue/5' : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'}`}
                >
                  {language === 'ka' ? opt.labelKa : opt.labelEn}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category chips — scrollable with arrows */}
      <div className="relative mb-5">
        {/* Left arrow */}
        {canScrollLeft && (
          <button
            onClick={() => { if (chipsRef.current) chipsRef.current.scrollLeft -= 200; }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center
              rounded-full bg-card border border-border shadow-card text-text-secondary hover:text-blue transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        {/* Right arrow */}
        {canScrollRight && (
          <button
            onClick={() => { if (chipsRef.current) chipsRef.current.scrollLeft += 200; }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center
              rounded-full bg-card border border-border shadow-card text-text-secondary hover:text-blue transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}

        <div
          ref={chipsRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide"
          style={{ paddingLeft: canScrollLeft ? '2rem' : 0, paddingRight: canScrollRight ? '2rem' : 0 }}
        >
          <button
            onClick={() => selectCategory(null)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium
              whitespace-nowrap flex-shrink-0 transition-all border
              ${selectedCat === null
                ? 'bg-blue/10 border-blue/30 text-blue'
                : 'bg-card border-border text-text-secondary hover:border-blue/20 hover:text-text-primary'
              }`}
          >
            {language === 'ka' ? 'ყველა' : 'All'}
          </button>
          {categories.map((cat) => {
            const name = language === 'ka' ? cat.name_ka : cat.name_en;
            const emoji = EMOJI_MAP[cat.slug || ''] || CATEGORIES.find(c => c.nameEn === cat.name_en)?.emoji || '🖥️';
            return (
              <button
                key={cat.id}
                onClick={() => selectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12.5px] font-medium
                  whitespace-nowrap flex-shrink-0 transition-all border
                  ${selectedCat === cat.id
                    ? 'bg-blue/10 border-blue/30 text-blue'
                    : 'bg-card border-border text-text-secondary hover:border-blue/20 hover:text-text-primary'
                  }`}
              >
                <span>{emoji}</span>
                {name}
              </button>
            );
          })}
        </div>
        {/* Right fade — shows there's more to scroll */}
        <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--bg-body) 0%, transparent 100%)' }} />
      </div>

      {/* Products grid */}
      {productsLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-6 h-6 text-blue animate-spin" />
        </div>
      ) : sortedProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="text-5xl mb-4">🔍</span>
          <p className="text-text-secondary text-[14px]">{t('common.noResults')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
