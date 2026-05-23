'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { CreditCard, Banknote } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CartSummary } from '@/components/cart/CartSummary';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCartStore } from '@/stores/cart-store';
import { createOrder } from '@/services/order-service';
import { supabase } from '@/lib/supabase';
import { PaymentMethod } from '@/types/order';

const PAYMENT_METHODS: { key: PaymentMethod; icon: React.ElementType; labelKey: string }[] = [
  { key: 'bog_ipay', icon: CreditCard, labelKey: 'checkout.bogIpay' },
  { key: 'tbc_checkout', icon: CreditCard, labelKey: 'checkout.tbcCheckout' },
  { key: 'cash_on_delivery', icon: Banknote, labelKey: 'checkout.cashOnDelivery' },
];

function PaymentContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [selected, setSelected] = useState<PaymentMethod>('cash_on_delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const deliveryMethod = searchParams.get('delivery') || 'standard';
  const deliveryFee = deliveryMethod === 'express' ? 10 : 3;

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const order = await createOrder({
        customerName: searchParams.get('name') || '',
        customerPhone: searchParams.get('phone') || '',
        deliveryCity: searchParams.get('city') || '',
        deliveryAddress: searchParams.get('address') || '',
        deliveryPostalCode: searchParams.get('postalCode') || undefined,
        notes: searchParams.get('notes') || undefined,
        paymentMethod: selected,
        items,
      });
      clearCart();

      // Send order confirmation email (non-blocking)
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          fetch('/api/send-order-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customerEmail: user.email,
              customerName: searchParams.get('name') || '',
              orderNumber: order.order_number,
              items: order.items || [],
              subtotal: order.subtotal,
              shippingCost: order.shipping_cost,
              total: order.total,
              deliveryCity: searchParams.get('city') || '',
              deliveryAddress: searchParams.get('address') || '',
              paymentMethod: selected,
            }),
          });
        }
      } catch {}

      router.replace(`/checkout/confirmation?orderNumber=${order.order_number}&orderId=${order.id}`);
    } catch (e: any) {
      setError(e.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-xl font-semibold text-text-primary mb-6">{t('checkout.paymentMethod')}</h1>

      {error && (
        <div className="bg-error-bg text-error text-sm text-center p-3 rounded-xl mb-6">{error}</div>
      )}

      <div className="space-y-3">
        {PAYMENT_METHODS.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.key;

          return (
            <button
              key={method.key}
              onClick={() => setSelected(method.key)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                isSelected
                  ? 'border-blue bg-blue/10 shadow-card'
                  : 'border-border bg-card hover:bg-surface'
              }`}
            >
              <Icon className={`w-7 h-7 ${isSelected ? 'text-blue' : 'text-text-secondary'}`} />
              <span className={`flex-1 text-left text-[15px] font-medium ${
                isSelected ? 'text-blue' : 'text-text-primary'
              }`}>
                {t(method.labelKey)}
              </span>
              <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center ${
                isSelected ? 'border-blue' : 'border-border'
              }`}>
                {isSelected && <div className="w-3 h-3 rounded-full gradient-primary" />}
              </div>
            </button>
          );
        })}
      </div>

      <CartSummary deliveryFee={deliveryFee} />

      <Button onClick={handlePlaceOrder} variant="gradient" loading={loading} fullWidth size="lg" className="mt-6 mb-8">
        {t('checkout.placeOrder')}
      </Button>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentContent />
    </Suspense>
  );
}
