'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

function ConfirmationContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-center">
      <div className="w-[88px] h-[88px] rounded-2xl bg-success-bg flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-success" />
      </div>

      <h1 className="text-2xl font-semibold text-text-primary">{t('checkout.orderPlaced')}</h1>
      <p className="text-text-secondary mt-2">{t('checkout.thankYou')}</p>

      <div className="bg-card border border-border rounded-2xl p-6 mt-8 mb-8 shadow-card">
        <p className="text-sm text-text-secondary mb-1">{t('checkout.orderNumber')}</p>
        <p className="text-xl font-bold gradient-text tracking-wider">{orderNumber}</p>
      </div>

      <Button onClick={() => router.replace('/orders')} variant="gradient" fullWidth size="lg" className="mb-3">
        {t('checkout.viewOrders')}
      </Button>

      <Button onClick={() => router.replace('/')} variant="outline" fullWidth size="lg">
        {t('checkout.continueShopping')}
      </Button>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ConfirmationContent />
    </Suspense>
  );
}
