'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
      <p className="text-text-secondary text-lg mb-8">Page not found</p>
      <Link href="/">
        <Button variant="gradient" size="lg">{t('tabs.home')}</Button>
      </Link>
    </div>
  );
}
