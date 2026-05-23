'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguageStore } from '@/stores/language-store';
import { getFeaturedProducts, getNewProducts } from '@/services/product-service';
import { Product } from '@/types/product';
import { CATEGORIES } from '@/constants/categories';

export default function HomePage() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [feat, news] = await Promise.all([
          getFeaturedProducts(10),
          getNewProducts(10),
        ]);
        setFeatured(feat);
        setNewProducts(news);
      } catch (e) {
        console.error('Failed to load home data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Hero Banner — full width */}
      <div className="rounded-2xl overflow-hidden mb-8">
        <div className="gradient-primary px-8 sm:px-14 py-12 sm:py-16 relative flex flex-col justify-center">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-xl">
            <p className="text-white/70 text-[12px] font-semibold uppercase tracking-widest mb-2">
              {language === 'ka' ? 'კარსტუ სთორი' : 'Carstu Store'}
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              {language === 'ka' ? 'კომპიუტერული\nაქსესუარები' : 'Computer\nAccessories'}
            </h1>
            <p className="text-white/70 text-[13px] mb-6">
              {language === 'ka'
                ? 'პრემიუმ ტექნიკა • საუკეთესო ფასები • სწრაფი მიწოდება'
                : 'Premium Tech • Best Prices • Fast Shipping'}
            </p>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 bg-white text-slate-800 font-semibold px-6 py-3 rounded-xl
                text-[13px] hover:bg-white/90 transition-all shadow-card"
            >
              {language === 'ka' ? 'კატალოგის ნახვა' : 'View Catalog'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[15px] font-bold text-text-primary">
            {language === 'ka' ? 'კატეგორიები' : 'Browse Categories'}
          </h2>
          <Link href="/catalog" className="text-[12px] text-blue font-semibold hover:text-blue-dark transition-colors">
            {language === 'ka' ? 'ყველა →' : 'View all →'}
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => {
            const name = language === 'ka' ? cat.nameKa : cat.nameEn;
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group flex flex-col items-center gap-2.5 p-4 bg-card border border-border rounded-2xl
                  hover:border-blue/30 hover:bg-blue/5 hover:shadow-card transition-all duration-200 text-center"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {cat.emoji}
                </span>
                <span className="text-[12.5px] font-medium text-text-secondary group-hover:text-blue transition-colors leading-tight">
                  {name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Products */}
      {featured.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-text-primary">{t('home.featured')}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:hidden">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[15px] font-bold text-text-primary">{t('home.newArrivals')}</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:hidden">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
