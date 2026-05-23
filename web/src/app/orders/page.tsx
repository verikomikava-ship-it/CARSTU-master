'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { EmptyState } from '@/components/ui/EmptyState';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { getOrders } from '@/services/order-service';
import { formatPrice } from '@/utils/format-price';
import { Order } from '@/types/order';

export default function OrdersPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <EmptyState
          icon="package-variant"
          title={t('orders.emptyOrders')}
          actionLabel={t('cart.continueShopping')}
          onAction={() => router.replace('/')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl font-semibold text-text-primary mb-6">{t('orders.title')}</h1>

      <div className="space-y-3">
        {orders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block bg-card border border-border rounded-2xl p-4 shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-semibold text-text-primary">{order.order_number}</span>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-text-secondary">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
              <span className="text-[17px] font-bold gradient-text">{formatPrice(order.total)}</span>
            </div>
            <p className="text-[11px] text-text-secondary mt-2">
              {order.items?.length || 0} {t('catalog.products').toLowerCase()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
