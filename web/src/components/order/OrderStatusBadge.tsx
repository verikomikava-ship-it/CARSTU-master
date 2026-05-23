'use client';

import { useTranslation } from 'react-i18next';
import { OrderStatus } from '@/types/order';

const statusStyles: Record<OrderStatus, string> = {
  pending: 'bg-warning-bg text-warning',
  confirmed: 'bg-blue/10 text-blue',
  processing: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  shipped: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  delivered: 'bg-success-bg text-success',
  cancelled: 'bg-error-bg text-error',
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-semibold ${statusStyles[status]}`}>
      {t(`orders.status.${status}`)}
    </span>
  );
}
