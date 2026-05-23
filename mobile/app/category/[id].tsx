import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { ProductCard } from '@/components/product/ProductCard';
import { LoadingSpinner, EmptyState } from '@/components/ui';
import { useLanguageStore } from '@/stores/language-store';
import { getCategoryById, getSubcategories } from '@/services/category-service';
import { getProducts } from '@/services/product-service';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

export default function CategoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { language } = useLanguageStore();
  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSub, setSelectedSub] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc'>('newest');

  useEffect(() => {
    if (id) loadCategory(id);
  }, [id]);

  useEffect(() => {
    if (id) loadProducts();
  }, [id, selectedSub, sortBy]);

  async function loadCategory(catId: string) {
    try {
      const [cat, subs] = await Promise.all([
        getCategoryById(catId),
        getSubcategories(catId),
      ]);
      setCategory(cat);
      setSubcategories(subs);
      if (cat) {
        navigation.setOptions({
          headerTitle: language === 'ka' ? cat.name_ka : cat.name_en,
        });
      }
    } catch (e) {
      console.error('Failed to load category:', e);
    } finally {
      setLoading(false);
    }
  }

  async function loadProducts() {
    try {
      const data = await getProducts({
        categoryId: selectedSub || id,
        sortBy,
        limit: 50,
      });
      setProducts(data);
    } catch (e) {
      console.error('Failed to load products:', e);
    }
  }

  if (loading) return <LoadingSpinner />;

  const numColumns = Math.floor(Dimensions.get('window').width / 180);

  return (
    <View style={styles.container}>
      {/* Subcategory Chips */}
      {subcategories.length > 0 && (
        <View style={styles.chipsContainer}>
          <FlatList
            horizontal
            data={[{ id: null, name_ka: t('catalog.allCategories'), name_en: 'All' } as any, ...subcategories]}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
            keyExtractor={(item) => item.id || 'all'}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.chip, (selectedSub === item.id || (item.id === null && !selectedSub)) && styles.chipActive]}
                onPress={() => setSelectedSub(item.id)}
              >
                <Text style={[styles.chipText, (selectedSub === item.id || (item.id === null && !selectedSub)) && styles.chipTextActive]}>
                  {language === 'ka' ? item.name_ka : item.name_en}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Sort */}
      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>{t('catalog.resultsCount', { count: products.length })}</Text>
        <View style={styles.sortBtns}>
          {(['newest', 'price_asc', 'price_desc'] as const).map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.sortBtn, sortBy === s && styles.sortBtnActive]}
              onPress={() => setSortBy(s)}
            >
              <Text style={[styles.sortText, sortBy === s && styles.sortTextActive]}>
                {s === 'newest' ? t('catalog.sortByNewest') : s === 'price_asc' ? '₾↑' : '₾↓'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Products Grid */}
      {products.length === 0 ? (
        <EmptyState icon="package-variant" title={t('common.noResults')} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productGrid}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => <ProductCard product={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chipsContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  chips: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  chip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.borderLight,
    marginRight: Spacing.sm,
  },
  chipActive: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: Colors.textLight,
  },
  sortRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  resultCount: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  sortBtns: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  sortBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.borderLight,
  },
  sortBtnActive: {
    backgroundColor: Colors.secondary,
  },
  sortText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  sortTextActive: {
    color: Colors.textLight,
  },
  productGrid: {
    padding: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
});
