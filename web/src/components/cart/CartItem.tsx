'use client';

import Image from 'next/image';
import { Trash2, Car } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { formatPrice } from '@/utils/format-price';
import { CartItem as CartItemType } from '@/types/cart';
import { QuantitySelector } from './QuantitySelector';

interface CartItemCardProps {
  item: CartItemType;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { language } = useLanguageStore();
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const name = language === 'ka' ? item.nameKa : item.nameEn;
  const effectivePrice = item.salePrice ?? item.price;

  return (
    <div className="flex items-start gap-3 bg-card rounded-xl border border-border p-3 mb-3">
      <div className="w-[72px] h-[72px] rounded-xl overflow-hidden flex-shrink-0 bg-border-light">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={name} width={72} height={72} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car className="w-6 h-6 text-text-muted" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-semibold text-text-primary line-clamp-2">{name}</h4>
        <p className="text-[13px] text-text-secondary mt-0.5">{formatPrice(effectivePrice)}</p>
        <div className="flex items-center gap-3 mt-2">
          <QuantitySelector quantity={item.quantity} onChange={(q) => updateQuantity(item.productId, q)} />
          <button
            onClick={() => removeItem(item.productId)}
            className="p-1 text-error hover:bg-error-bg rounded-lg transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <span className="text-[15px] font-bold gradient-text ml-2 flex-shrink-0">
        {formatPrice(effectivePrice * item.quantity)}
      </span>
    </div>
  );
}
