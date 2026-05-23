import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import { OrderStatusBadge } from '@/components/order/OrderStatusBadge';
import { getOrders } from '@/services/order-service';
import { formatPrice } from '@/utils/format-price';
import { Order } from '@/types/order';

export default function OrdersScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (e) {
      console.error('Failed to load orders:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  if (orders.length === 0) {
    return (
      <ScreenWrapper>
        <EmptyState
          icon="package-variant"
          title={t('orders.emptyOrders')}
          actionLabel={t('cart.continueShopping')}
          onAction={() => router.replace('/(tabs)')}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scroll={false} padded={false}>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderCard}
            onPress={() => router.push(`/orders/${item.id}`)}
            activeOpacity={0.7}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderNumber}>{item.order_number}</Text>
              <OrderStatusBadge status={item.status} />
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderDate}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
              <Text style={styles.orderTotal}>{formatPrice(item.total)}</Text>
            </View>
            <Text style={styles.orderItems}>
              {item.items?.length || 0} {t('catalog.products').toLowerCase()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
  },
  orderCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  orderNumber: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDate: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  orderTotal: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  orderItems: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
