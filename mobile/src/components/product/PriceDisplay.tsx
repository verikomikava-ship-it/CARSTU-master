import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { formatPrice } from '@/utils/format-price';

interface PriceDisplayProps {
  price: number;
  salePrice: number | null;
  large?: boolean;
}

export function PriceDisplay({ price, salePrice, large }: PriceDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.price, large && styles.priceLarge]}>
        {formatPrice(salePrice ?? price)}
      </Text>
      {salePrice && (
        <Text style={[styles.original, large && styles.originalLarge]}>
          {formatPrice(price)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceLarge: {
    fontSize: FontSize.xxl,
  },
  original: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  originalLarge: {
    fontSize: FontSize.md,
  },
});
