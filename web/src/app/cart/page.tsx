'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { CartItemCard } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';

export default function CartPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);

  const handleCheckout = () => {
    if (!user) { router.push('/auth/login'); return; }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <EmptyState icon="cart-outline" title={t('cart.emptyCart')} message={t('cart.emptyCartMessage')}
          actionLabel={t('cart.continueShopping')} onAction={() => router.push('/catalog')} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">{t('cart.myCart')}</h1>
      {items.map((item) => (<CartItemCard key={item.productId} item={item} />))}
      <CartSummary />
      <Button variant="gradient" onClick={handleCheckout} fullWidth size="lg" className="mt-4">
        {t('cart.proceedToCheckout')}
      </Button>
      <Button variant="ghost" onClick={clearCart} fullWidth className="mt-2">
        {t('cart.clearCart')}
      </Button>
    </div>
  );
}
