'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '@/stores/language-store';

export function Footer() {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const ka = language === 'ka';

  return (
    <footer className="glass border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold gradient-text mb-3">Carstu</h3>
            <p className="text-sm text-text-secondary">
              {ka
                ? 'მანქანის აქსესუარები საუკეთესო ფასად'
                : 'Car accessories at the best prices'}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              {ka ? 'ნავიგაცია' : 'Navigation'}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-text-secondary hover:text-blue transition-colors">{t('tabs.home')}</Link></li>
              <li><Link href="/catalog" className="text-sm text-text-secondary hover:text-blue transition-colors">{t('tabs.catalog')}</Link></li>
              <li><Link href="/cart" className="text-sm text-text-secondary hover:text-blue transition-colors">{t('tabs.cart')}</Link></li>
              <li><Link href="/account" className="text-sm text-text-secondary hover:text-blue transition-colors">{t('tabs.account')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-3">
              {ka ? 'კონტაქტი' : 'Contact'}
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>info@carstu.com</li>
              <li>+995 XXX XXX XXX</li>
              <li className="pt-1">
                <Link href="/delivery" className="text-text-secondary hover:text-blue transition-colors">
                  {ka ? 'მიწოდების დეტალები' : 'Delivery Details'}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center text-xs text-text-muted">
          &copy; {new Date().getFullYear()} Carstu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
