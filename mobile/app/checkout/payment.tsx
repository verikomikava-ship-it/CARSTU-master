import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/stores/cart-store';
import { createOrder } from '@/services/order-service';
import { PaymentMethod } from '@/types/order';

const PAYMENT_METHODS: { key: PaymentMethod; icon: string; labelKey: string }[] = [
  { key: 'bog_ipay', icon: 'credit-card', labelKey: 'checkout.bogIpay' },
  { key: 'tbc_checkout', icon: 'credit-card-outline', labelKey: 'checkout.tbcCheckout' },
  { key: 'cash_on_delivery', icon: 'cash', labelKey: 'checkout.cashOnDelivery' },
];

export default function PaymentScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{
    name: string;
    phone: string;
    city: string;
    address: string;
    postalCode: string;
    notes: string;
  }>();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const [selected, setSelected] = useState<PaymentMethod>('cash_on_delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError('');
    try {
      const order = await createOrder({
        customerName: params.name,
        customerPhone: params.phone,
        deliveryCity: params.city,
        deliveryAddress: params.address,
        deliveryPostalCode: params.postalCode || undefined,
        notes: params.notes || undefined,
        paymentMethod: selected,
        items,
      });
      clearCart();
      router.replace({
        pathname: '/checkout/confirmation',
        params: { orderNumber: order.order_number, orderId: order.id },
      });
    } catch (e: any) {
      setError(e.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>{t('checkout.paymentMethod')}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {PAYMENT_METHODS.map((method) => (
        <TouchableOpacity
          key={method.key}
          style={[styles.methodCard, selected === method.key && styles.methodCardSelected]}
          onPress={() => setSelected(method.key)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={method.icon as any}
            size={28}
            color={selected === method.key ? Colors.primary : Colors.textSecondary}
          />
          <Text style={[styles.methodLabel, selected === method.key && styles.methodLabelSelected]}>
            {t(method.labelKey)}
          </Text>
          <View style={[styles.radio, selected === method.key && styles.radioSelected]}>
            {selected === method.key && <View style={styles.radioInner} />}
          </View>
        </TouchableOpacity>
      ))}

      <CartSummary />

      <Button
        title={t('checkout.placeOrder')}
        onPress={handlePlaceOrder}
        loading={loading}
        fullWidth
        size="lg"
        style={styles.placeOrderBtn}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.xl,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.errorLight,
    padding: Spacing.md,
    borderRadius: 8,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
  },
  methodCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
  },
  methodLabel: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  methodLabelSelected: {
    color: Colors.primary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
  },
  placeOrderBtn: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
});
