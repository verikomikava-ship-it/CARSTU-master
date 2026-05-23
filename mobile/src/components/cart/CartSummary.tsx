import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/utils/format-price';

export function CartSummary() {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>{t('common.subtotal')}</Text>
        <Text style={styles.value}>{formatPrice(subtotal)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>{t('common.shipping')}</Text>
        <Text style={styles.value}>
          {shipping === 0 ? t('common.free') : formatPrice(shipping)}
        </Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.totalLabel}>{t('common.total')}</Text>
        <Text style={styles.totalValue}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  label: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  value: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  totalLabel: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  totalValue: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
});
