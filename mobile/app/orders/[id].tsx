import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { LoadingSpinner } from '@/components/ui';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { getOrderById } from '@/services/order-service';
import { formatPrice } from '@/utils/format-price';
import { Order } from '@/types/order';

export default function OrderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) loadOrder(id);
  }, [id]);

  async function loadOrder(orderId: string) {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (e) {
      console.error('Failed to load order:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (!order) return <Text style={styles.error}>{t('common.error')}</Text>;

  return (
    <ScreenWrapper>
      {/* Order Header */}
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{order.order_number}</Text>
        <OrderStatusBadge status={order.status} />
      </View>
      <Text style={styles.date}>{new Date(order.created_at).toLocaleString()}</Text>

      {/* Order Items */}
      <Text style={styles.sectionTitle}>{t('catalog.products')}</Text>
      {order.items?.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.product_name}</Text>
            <Text style={styles.itemQty}>x{item.quantity}</Text>
          </View>
          <Text style={styles.itemPrice}>{formatPrice(item.total_price)}</Text>
        </View>
      ))}

      {/* Delivery Info */}
      <Text style={styles.sectionTitle}>{t('checkout.deliveryInfo')}</Text>
      <View style={styles.infoCard}>
        <InfoRow label={t('checkout.name')} value={order.customer_name} />
        <InfoRow label={t('checkout.phone')} value={order.customer_phone} />
        <InfoRow label={t('checkout.city')} value={order.delivery_city} />
        <InfoRow label={t('checkout.address')} value={order.delivery_address} />
        {order.notes && <InfoRow label={t('checkout.notes')} value={order.notes} />}
      </View>

      {/* Totals */}
      <View style={styles.totals}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('common.subtotal')}</Text>
          <Text style={styles.totalValue}>{formatPrice(order.subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('common.shipping')}</Text>
          <Text style={styles.totalValue}>
            {order.shipping_cost === 0 ? t('common.free') : formatPrice(order.shipping_cost)}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.grandLabel}>{t('common.total')}</Text>
          <Text style={styles.grandValue}>{formatPrice(order.total)}</Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: FontSize.xl,
    fontWeight: '600',
    color: Colors.text,
  },
  date: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '500',
    color: Colors.text,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  itemInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  itemName: {
    fontSize: FontSize.md,
    color: Colors.text,
    flex: 1,
  },
  itemQty: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  itemPrice: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: Spacing.md,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  infoLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: Colors.text,
    flex: 1,
    textAlign: 'right',
  },
  totals: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  totalLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  grandLabel: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  grandValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  error: {
    textAlign: 'center',
    padding: Spacing.xxl,
    color: Colors.error,
  },
});
