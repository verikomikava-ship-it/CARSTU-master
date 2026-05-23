import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, FontSize } from '@/constants/theme';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { formatPrice } from '@/utils/format-price';
import { CartItem as CartItemType } from '@/types/cart';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export function CartItemCard({ item }: CartItemProps) {
  const { language } = useLanguageStore();
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const name = language === 'ka' ? item.nameKa : item.nameEn;
  const effectivePrice = item.salePrice ?? item.price;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image source={{ uri: item.imageUrl }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholder}>
            <MaterialCommunityIcons name="car" size={24} color={Colors.disabled} />
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>
        <Text style={styles.price}>{formatPrice(effectivePrice)}</Text>

        <View style={styles.actions}>
          <QuantitySelector
            quantity={item.quantity}
            onChange={(q) => updateQuantity(item.productId, q)}
          />
          <TouchableOpacity onPress={() => removeItem(item.productId)} style={styles.removeBtn}>
            <MaterialCommunityIcons name="trash-can-outline" size={20} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.total}>{formatPrice(effectivePrice * item.quantity)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginRight: Spacing.md,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  price: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.md,
  },
  removeBtn: {
    padding: 4,
  },
  total: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
});
