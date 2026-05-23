'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, ShoppingBag, Check, Monitor } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { formatPrice } from '@/utils/format-price';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export function ProductCard({ product, compact }: ProductCardProps) {
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const name = language === 'ka' ? product.name_ka : product.name_en;
  const primaryImage = product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url;
  const discount = product.sale_price
    ? Math.round((1 - product.sale_price / product.price) * 100)
    : 0;

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      nameKa: product.name_ka,
      nameEn: product.name_en,
      price: product.price,
      salePrice: product.sale_price,
      imageUrl: primaryImage || null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      nameKa: product.name_ka,
      nameEn: product.name_en,
      price: product.price,
      salePrice: product.sale_price,
      imageUrl: primaryImage || null,
    });
    router.push('/checkout');
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className={`group bg-card rounded-2xl border border-border overflow-hidden
        hover:shadow-card-hover hover:border-blue/20 transition-all duration-300
        ${compact ? 'w-[170px] flex-shrink-0' : ''}`}
    >
      <div className="relative aspect-square bg-border-light">
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Monitor className="w-10 h-10 text-text-muted" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="gradient-primary text-white text-[11px] font-bold px-2 py-0.5 rounded-lg">
              -{discount}%
            </span>
          )}
          {product.stock_quantity === 0 && (
            <span className="bg-card glass text-text-secondary text-[11px] font-semibold px-2 py-0.5 rounded-lg">
              {t('common.outOfStock')}
            </span>
          )}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-[13px] font-medium text-text-primary leading-5 min-h-[36px] line-clamp-2">
          {name}
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div>
            <span className="text-[15px] font-bold text-text-primary">
              {formatPrice(product.sale_price ?? product.price)}
            </span>
            {product.sale_price && (
              <span className="text-[11px] text-text-muted/60 line-through ml-1.5">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {product.stock_quantity > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={handleAddToCart}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300
                  ${added
                    ? 'bg-emerald-500 text-white scale-110'
                    : 'bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400'
                  }`}
              >
                {added ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleBuyNow}
                className="w-7 h-7 flex items-center justify-center rounded-full
                  bg-blue/10 text-blue hover:bg-blue/20 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
