import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { ProductCard } from '@/components/product/ProductCard';
import { CategoryCard } from '@/components/category/CategoryCard';
import { LoadingSpinner } from '@/components/ui';
import { useLanguageStore } from '@/stores/language-store';
import { getCategories } from '@/services/category-service';
import { getFeaturedProducts, getNewProducts } from '@/services/product-service';
import { Category } from '@/types/category';
import { Product } from '@/types/product';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language } = useLanguageStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [cats, feat, news] = await Promise.all([
        getCategories(),
        getFeaturedProducts(10),
        getNewProducts(10),
      ]);
      setCategories(cats);
      setFeatured(feat);
      setNewProducts(news);
    } catch (e) {
      console.error('Failed to load home data:', e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;

  const categoryColumns = SCREEN_WIDTH > 768 ? 6 : SCREEN_WIDTH > 500 ? 4 : 3;
  const categoryWidth = (SCREEN_WIDTH - 32 - (categoryColumns - 1) * 12) / categoryColumns;

  return (
    <ScreenWrapper>
      {/* Hero Section - matching Figma gradient style */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            {language === 'ka' ? 'მანქანის აქსესუარები' : 'Car Accessories'}
          </Text>
          <Text style={styles.heroSubtitle}>
            {language === 'ka'
              ? 'საუკეთესო ხარისხი • დაბალი ფასები • სწრაფი მიწოდება'
              : 'Best Quality • Low Prices • Fast Delivery'}
          </Text>
          <TouchableOpacity
            style={styles.heroCta}
            onPress={() => router.push('/(tabs)/catalog')}
            activeOpacity={0.8}
          >
            <Text style={styles.heroCtaText}>
              {language === 'ka' ? 'იხილეთ კატალოგი' : 'View Catalog'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')} activeOpacity={0.7}>
        <MaterialCommunityIcons name="magnify" size={20} color={Colors.textSecondary} />
        <Text style={styles.searchText}>{t('common.search')}...</Text>
      </TouchableOpacity>

      {/* Categories Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
        <Text style={styles.sectionSubtitle}>
          {language === 'ka'
            ? 'აირჩიეთ კატეგორია რომელიც გაინტერესებთ'
            : 'Choose the category you are interested in'}
        </Text>
      </View>
      <View style={styles.categoryGrid}>
        {categories.map((cat) => (
          <View key={cat.id} style={{ width: categoryWidth }}>
            <CategoryCard category={cat} />
          </View>
        ))}
      </View>

      {/* Featured Products */}
      {featured.length > 0 && (
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.featured')}</Text>
            <Text style={styles.sectionSubtitle}>
              {language === 'ka'
                ? 'ჩვენი ყველაზე პოპულარული პროდუქტები'
                : 'Our most popular products'}
            </Text>
          </View>
          <FlatList
            data={featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} compact />}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </View>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{t('home.newArrivals')}</Text>
          </View>
          <FlatList
            data={newProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ProductCard product={item} compact />}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
          />
        </>
      )}

      <View style={{ height: 32 }} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  heroContent: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: '500',
    color: Colors.primaryForeground,
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.xl,
  },
  heroCta: {
    backgroundColor: Colors.primaryForeground,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignSelf: 'flex-start',
  },
  heroCtaText: {
    color: Colors.primary,
    fontWeight: '500',
    fontSize: FontSize.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  searchText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  sectionHeader: {
    marginBottom: Spacing.lg,
    marginTop: Spacing.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  sectionSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  featuredSection: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.borderLight,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: Spacing.xl,
    borderRadius: 0,
  },
});
