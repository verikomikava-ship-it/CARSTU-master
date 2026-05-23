'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, User, Menu, X, ChevronDown, Monitor } from 'lucide-react';
import { useState, useRef } from 'react';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { SearchDropdown } from '@/components/search/SearchDropdown';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { CATEGORIES } from '@/constants/categories';
import { useLanguageStore } from '@/stores/language-store';

export function Header() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const itemCount = useCartStore((s) => s.getItemCount());
  const user = useAuthStore((s) => s.user);
  const { language } = useLanguageStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCatEnter = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(true);
  };
  const handleCatLeave = () => {
    megaTimeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  };

  const col1 = CATEGORIES.slice(0, 3);
  const col2 = CATEGORIES.slice(3, 6);
  const col3 = CATEGORIES.slice(6);

  return (
    <header className="glass border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
              <Monitor className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] font-bold gradient-text tracking-tight">Carstu</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5 ml-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all ${
                pathname === '/'
                  ? 'text-blue bg-blue/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'
              }`}
            >
              {t('tabs.home')}
            </Link>

            {/* Categories mega dropdown */}
            <div
              className="relative"
              onMouseEnter={handleCatEnter}
              onMouseLeave={handleCatLeave}
            >
              <button
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all ${
                  megaOpen
                    ? 'text-blue bg-blue/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'
                }`}
              >
                {language === 'ka' ? 'კატეგორიები' : 'Categories'}
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega dropdown panel */}
              {megaOpen && (
                <div
                  className="absolute top-full left-0 mt-2 bg-card border border-border rounded-2xl shadow-card-hover z-50 p-5"
                  style={{ width: '620px' }}
                  onMouseEnter={handleCatEnter}
                  onMouseLeave={handleCatLeave}
                >
                  <div className="grid grid-cols-3 gap-6">
                    {[col1, col2, col3].map((col, ci) => (
                      <div key={ci} className="space-y-4">
                        {col.map((cat) => {
                          const name = language === 'ka' ? cat.nameKa : cat.nameEn;
                          return (
                            <div key={cat.id}>
                              <Link
                                href={`/category/${cat.slug}`}
                                onClick={() => setMegaOpen(false)}
                                className="flex items-center gap-2 text-[13px] font-semibold text-text-primary hover:text-blue transition-colors mb-2"
                              >
                                <span className="text-base">{cat.emoji}</span>
                                {name}
                              </Link>
                              <div className="space-y-1 pl-6">
                                {cat.subcategories.slice(0, 3).map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/category/${cat.slug}?sub=${sub.slug}`}
                                    onClick={() => setMegaOpen(false)}
                                    className="block text-[12px] text-text-muted hover:text-blue transition-colors py-0.5"
                                  >
                                    {language === 'ka' ? sub.nameKa : sub.nameEn}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-[12px] text-text-muted">
                      {CATEGORIES.length} {language === 'ka' ? 'კატეგორია' : 'categories available'}
                    </span>
                    <Link
                      href="/catalog"
                      onClick={() => setMegaOpen(false)}
                      className="text-[12px] font-semibold text-blue hover:text-blue-dark transition-colors"
                    >
                      {language === 'ka' ? 'სრული კატალოგი →' : 'View Full Catalog →'}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/catalog?sort=newest"
              className="px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-all text-text-secondary hover:text-text-primary hover:bg-card-hover"
            >
              {language === 'ka' ? 'სიახლეები' : 'New Arrivals'}
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <SearchDropdown />
            <ThemeToggle />
            <LanguageSwitcher />

            <Link
              href="/cart"
              className="relative p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-card-hover transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-blue text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  style={{ minWidth: '18px', minHeight: '18px', padding: '0 3px' }}>
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            <Link
              href={user ? '/account' : '/auth/login'}
              className="p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-card-hover transition-all"
            >
              <User className="w-5 h-5" />
            </Link>

            <button
              className="md:hidden p-2 rounded-xl text-text-secondary hover:bg-card-hover transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-3 pb-4">
            <div className="space-y-0.5 mb-4">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all ${
                  pathname === '/'
                    ? 'text-blue bg-blue/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-card-hover'
                }`}
              >
                {t('tabs.home')}
              </Link>
              <Link
                href="/catalog"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-text-secondary hover:text-text-primary hover:bg-card-hover transition-all"
              >
                {language === 'ka' ? 'სრული კატალოგი' : 'Full Catalog'}
              </Link>
              <Link
                href="/catalog?sort=newest"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13.5px] font-medium text-text-secondary hover:text-text-primary hover:bg-card-hover transition-all"
              >
                {language === 'ka' ? 'სიახლეები' : 'New Arrivals'}
              </Link>
            </div>

            <div className="border-t border-border pt-3">
              <p className="px-3 text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-2">
                {language === 'ka' ? 'კატეგორიები' : 'Browse Categories'}
              </p>
              <div className="space-y-0.5">
                {CATEGORIES.map((cat) => {
                  const name = language === 'ka' ? cat.nameKa : cat.nameEn;
                  return (
                    <Link
                      key={cat.id}
                      href={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-text-secondary hover:text-text-primary hover:bg-card-hover transition-all"
                    >
                      <span className="text-base">{cat.emoji}</span>
                      {name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
