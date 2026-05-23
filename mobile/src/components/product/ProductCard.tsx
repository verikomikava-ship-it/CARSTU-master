import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, BorderRadius, Spacing, FontSize, Shadow } from '@/constants/theme';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { formatPrice } from '@/utils/format-price';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const CARD_WIDTH = (Dimensions.get('window').width - 48) / 2;

export function ProductCard({ product, compact }: ProductCardProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const addItem = useCartStore((s) => s.addItem);

  const name = language === 'ka' ? product.name_ka : product.name_en;
  const primaryImage = product.images?.find((img) => img.is_primary)?.url || product.images?.[0]?.url;
  const discount = product.sale_price
    ? Math.round((1 - product.sale_price / product.price) * 100)
    : 0;

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      nameKa: product.name_ka,
      nameEn: product.name_en,
      price: product.price,
      salePrice: product.sale_price,
      imageUrl: primaryImage || null,
    });
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compact]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {primaryImage ? (
          <Image source={{ uri: primaryImage }} style={styles.image} contentFit="cover" />
        ) : (
          <View style={styles.placeholder}>
            <MaterialCommunityIcons name="car" size={40} color={Colors.disabled} />
          </View>
        )}

        {/* Badges */}
        <View style={styles.badgeColumn}>
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discount}%</Text>
            </View>
          )}
          {product.stock_quantity === 0 && (
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>{t('common.outOfStock')}</Text>
            </View>
          )}
        </View>

        {/* Favorite Button */}
        <TouchableOpacity style={styles.favoriteBtn} activeOpacity={0.7}>
          <MaterialCommunityIcons name="heart-outline" size={18} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{name}</Text>

        {/* Rating */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Text key={i} style={styles.star}>{'⭐'}</Text>
            ))}
          </View>
          <Text style={styles.reviewCount}>(0)</Text>
        </View>

        {/* Price */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            {formatPrice(product.sale_price ?? product.price)}
          </Text>
          {product.sale_price && (
            <Text style={styles.originalPrice}>{formatPrice(product.price)}</Text>
          )}
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={[styles.addToCartBtn, product.stock_quantity === 0 && styles.addToCartDisabled]}
          onPress={handleAddToCart}
          disabled={product.stock_quantity === 0}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name="cart"
            size={16}
            color={product.stock_quantity === 0 ? Colors.textSecondary : Colors.primaryForeground}
          />
          <Text style={[styles.addToCartText, product.stock_quantity === 0 && styles.addToCartTextDisabled]}>
            {product.stock_quantity > 0 ? t('common.addToCart') : t('common.outOfStock')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  compact: {
    width: 170,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.borderLight,
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
  badgeColumn: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    gap: Spacing.sm,
  },
  discountBadge: {
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  discountText: {
    color: Colors.textLight,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  stockBadge: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  stockText: {
    color: Colors.textSecondary,
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
  favoriteBtn: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: Spacing.lg,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
    lineHeight: 20,
    minHeight: 40,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
  },
  reviewCount: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  originalPrice: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: 10,
    marginTop: Spacing.md,
  },
  addToCartDisabled: {
    backgroundColor: Colors.secondary,
  },
  addToCartText: {
    color: Colors.primaryForeground,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  addToCartTextDisabled: {
    color: Colors.textSecondary,
  },
});
