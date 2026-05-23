'use client';

import { formatPrice } from '@/utils/format-price';

interface PriceDisplayProps {
  price: number;
  salePrice: number | null;
  large?: boolean;
}

export function PriceDisplay({ price, salePrice, large }: PriceDisplayProps) {
  return (
    <div className="flex items-center gap-3">
      <span className={`font-bold text-text-primary ${large ? 'text-2xl' : 'text-lg'}`}>
        {formatPrice(salePrice ?? price)}
      </span>
      {salePrice && (
        <span className={`text-text-muted line-through ${large ? 'text-base' : 'text-sm'}`}>
          {formatPrice(price)}
        </span>
      )}
    </div>
  );
}
