import { ShoppingCart, Search, Menu, Globe, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  language: 'ka' | 'en';
  onLanguageChange: (lang: 'ka' | 'en') => void;
  cartItemsCount: number;
  onCartClick?: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Navbar({ language, onLanguageChange, cartItemsCount, onCartClick, darkMode, onDarkModeToggle }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  const t = {
    ka: {
      search: 'ძიება...',
      categories: 'კატეგორიები',
      deals: 'აქციები',
      contact: 'კონტაქტი',
    },
    en: {
      search: 'Search...',
      categories: 'Categories',
      deals: 'Deals',
      contact: 'Contact',
    },
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button className="lg:hidden">
              <Menu className="size-6" />
            </button>
            <a href="/" className="flex items-center gap-2">
              <div className="size-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground">🚗</span>
              </div>
              <span className="font-semibold hidden sm:inline">AutoParts</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <a href="#categories" className="text-sm hover:text-primary transition-colors">
                {t[language].categories}
              </a>
              <a href="#deals" className="text-sm hover:text-primary transition-colors">
                {t[language].deals}
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                {t[language].contact}
              </a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t[language].search}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-input-background border border-transparent focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Mobile Search */}
            <button
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="size-5" />
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => onLanguageChange(language === 'ka' ? 'en' : 'ka')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-accent transition-colors"
            >
              <Globe className="size-4" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="size-9 rounded-lg hover:bg-accent transition-colors flex items-center justify-center"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="size-5 text-yellow-500" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>

            {/* Cart */}
            <button onClick={onCartClick} className="relative">
              <ShoppingCart className="size-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="pb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t[language].search}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-input-background border border-transparent focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
