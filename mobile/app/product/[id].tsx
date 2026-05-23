import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { Button, LoadingSpinner } from '@/components/ui';
import { PriceDisplay } from '@/components/product/PriceDisplay';
import { QuantitySelector } from '@/components/cart/QuantitySelector';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { getProductById } from '@/services/product-service';
import { Product } from '@/types/product';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (id) loadProduct(id);
  }, [id]);

  async function loadProduct(productId: string) {
    try {
      const data = await getProductById(productId);
      setProduct(data);
    } catch (e) {
      console.error('Failed to load product:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (!product) return <Text style={styles.error}>{t('common.noResults')}</Text>;

  const name = language === 'ka' ? product.name_ka : product.name_en;
  const description = language === 'ka' ? product.description_ka : product.description_en;
  const images = product.images?.sort((a, b) => a.sort_order - b.sort_order) || [];

  const handleAddToCart = () => {
    const primaryImage = images.find((img) => img.is_primary)?.url || images[0]?.url;
    addItem(
      {
        productId: product.id,
        nameKa: product.name_ka,
        nameEn: product.name_en,
        price: product.price,
        salePrice: product.sale_price,
        imageUrl: primaryImage || null,
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Image Carousel */}
      <View style={styles.imageContainer}>
        {images.length > 0 ? (
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              setCurrentImageIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH));
            }}
          >
            {images.map((img) => (
              <Image key={img.id} source={{ uri: img.url }} style={styles.productImage} contentFit="cover" />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.placeholderImage}>
            <MaterialCommunityIcons name="car" size={64} color={Colors.disabled} />
          </View>
        )}
        {images.length > 1 && (
          <View style={styles.dots}>
            {images.map((_, i) => (
              <View key={i} style={[styles.dot, i === currentImageIndex && styles.dotActive]} />
            ))}
          </View>
        )}
      </View>

      <View style={styles.content}>
        {/* Name & Brand */}
        <Text style={styles.name}>{name}</Text>
        {product.brand && <Text style={styles.brand}>{product.brand}</Text>}

        {/* Price */}
        <View style={styles.priceSection}>
          <PriceDisplay price={product.price} salePrice={product.sale_price} large />
          <Text style={[styles.stock, product.stock_quantity > 0 ? styles.inStock : styles.outOfStock]}>
            {product.stock_quantity > 0 ? t('common.inStock') : t('common.outOfStock')}
          </Text>
        </View>

        {/* Quantity + Add to Cart */}
        <View style={styles.addToCartSection}>
          <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock_quantity} />
          <Button
            title={addedToCart ? t('product.addedToCart') : t('common.addToCart')}
            onPress={handleAddToCart}
            disabled={product.stock_quantity === 0}
            size="lg"
            style={styles.addBtn}
          />
        </View>

        {/* Description */}
        {description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('product.description')}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        )}

        {/* Specifications */}
        {Object.keys(product.specifications || {}).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('product.specifications')}</Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specRow}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: 300,
    backgroundColor: Colors.surface,
  },
  productImage: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 12,
    width: '100%',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  content: {
    padding: Spacing.lg,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
  },
  brand: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  stock: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  inStock: {
    color: Colors.success,
  },
  outOfStock: {
    color: Colors.error,
  },
  addToCartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginTop: Spacing.xl,
  },
  addBtn: {
    flex: 1,
  },
  section: {
    marginTop: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  specRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  specKey: {
    flex: 1,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  specValue: {
    flex: 1,
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
  },
  error: {
    textAlign: 'center',
    padding: Spacing.xxl,
    color: Colors.error,
  },
});
