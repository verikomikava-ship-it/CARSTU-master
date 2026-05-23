import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui';
import { OrderStatus } from '@/types/order';

const STATUS_VARIANT: Record<OrderStatus, 'primary' | 'success' | 'warning' | 'error'> = {
  pending: 'warning',
  confirmed: 'primary',
  processing: 'primary',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { t } = useTranslation();
  return (
    <Badge text={t(`orders.status.${status}`)} variant={STATUS_VARIANT[status]} />
  );
}
