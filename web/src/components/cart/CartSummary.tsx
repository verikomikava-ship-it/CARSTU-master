'use client';

import { useTranslation } from 'react-i18next';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/utils/format-price';

interface CartSummaryProps {
  deliveryFee?: number;
}

export function CartSummary({ deliveryFee }: CartSummaryProps) {
  const { t } = useTranslation();
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getTotal();
  const shipping = deliveryFee ?? 3;
  const total = subtotal + shipping;

  return (
    <div className="bg-card rounded-xl border border-border p-4 mt-3">
      <div className="flex justify-between mb-2">
        <span className="text-[14px] text-text-secondary">{t('common.subtotal')}</span>
        <span className="text-[14px] font-semibold text-text-primary">{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-[14px] text-text-secondary">{t('common.shipping')}</span>
        <span className="text-[14px] font-semibold text-text-primary">
          {shipping === 0 ? t('common.free') : formatPrice(shipping)}
        </span>
      </div>
      <div className="h-px bg-border my-3" />
      <div className="flex justify-between">
        <span className="text-[16px] font-bold text-text-primary">{t('common.total')}</span>
        <span className="text-[16px] font-bold gradient-text">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
