'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { getOrderById } from '@/services/order-service';
import { formatPrice } from '@/utils/format-price';
import { Order } from '@/types/order';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then(setOrder)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <p className="text-center py-20 text-error">{t('common.error')}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-text-primary">{order.order_number}</h1>
        <OrderStatusBadge status={order.status} />
      </div>
      <p className="text-[13px] text-text-secondary mt-1 mb-6">
        {new Date(order.created_at).toLocaleString()}
      </p>

      {/* Items */}
      <h2 className="text-[17px] font-medium text-text-primary mt-6 mb-3">{t('catalog.products')}</h2>
      {order.items?.map((item) => (
        <div key={item.id} className="flex items-center justify-between py-3 border-b border-border">
          <div className="flex items-center gap-2 flex-1">
            <span className="text-[15px] text-text-primary flex-1">{item.product_name}</span>
            <span className="text-[13px] text-text-secondary">x{item.quantity}</span>
          </div>
          <span className="text-[15px] font-semibold text-text-primary ml-3">{formatPrice(item.total_price)}</span>
        </div>
      ))}

      {/* Delivery Info */}
      <h2 className="text-[17px] font-medium text-text-primary mt-8 mb-3">{t('checkout.deliveryInfo')}</h2>
      <div className="bg-card border border-border rounded-2xl p-4 shadow-card">
        <InfoRow label={t('checkout.name')} value={order.customer_name} />
        <InfoRow label={t('checkout.phone')} value={order.customer_phone} />
        <InfoRow label={t('checkout.city')} value={order.delivery_city} />
        <InfoRow label={t('checkout.address')} value={order.delivery_address} />
        {order.notes && <InfoRow label={t('checkout.notes')} value={order.notes} />}
      </div>

      {/* Totals */}
      <div className="bg-card border border-border rounded-2xl p-4 mt-6 mb-8 shadow-card">
        <div className="flex justify-between py-1">
          <span className="text-[15px] text-text-secondary">{t('common.subtotal')}</span>
          <span className="text-[15px] font-medium text-text-primary">{formatPrice(order.subtotal)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-[15px] text-text-secondary">{t('common.shipping')}</span>
          <span className="text-[15px] font-medium text-text-primary">
            {order.shipping_cost === 0 ? t('common.free') : formatPrice(order.shipping_cost)}
          </span>
        </div>
        <div className="h-px bg-border my-3" />
        <div className="flex justify-between">
          <span className="text-[17px] font-semibold text-text-primary">{t('common.total')}</span>
          <span className="text-[17px] font-bold gradient-text">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2">
      <span className="text-[13px] text-text-secondary">{label}</span>
      <span className="text-[13px] font-medium text-text-primary text-right flex-1 ml-4">{value}</span>
    </div>
  );
}
