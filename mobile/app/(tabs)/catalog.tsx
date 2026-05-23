import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { LoadingSpinner } from '@/components/ui';
import { useLanguageStore } from '@/stores/language-store';
import { getCategories, getSubcategories } from '@/services/category-service';
import { Category } from '@/types/category';

const ICON_MAP: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  'car-seat': 'car-seat',
  'car-side': 'car-side',
  'tire': 'tire',
  'chip': 'chip',
  'lightbulb-on': 'lightbulb-on',
  'engine': 'engine',
  'air-filter': 'air-filter',
  'oil': 'oil',
  'shield-car': 'shield-car',
  'speaker': 'speaker',
  'spray-bottle': 'spray-bottle',
  'truck-trailer': 'truck-trailer',
};

export default function CatalogScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { language } = useLanguageStore();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<Record<string, Category[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (e) {
      console.error('Failed to load categories:', e);
    } finally {
      setLoading(false);
    }
  }

  async function toggleExpand(catId: string) {
    if (expandedId === catId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(catId);
    if (!subcategories[catId]) {
      try {
        const subs = await getSubcategories(catId);
        setSubcategories((prev) => ({ ...prev, [catId]: subs }));
      } catch (e) {
        console.error('Failed to load subcategories:', e);
      }
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <ScreenWrapper scroll={false} padded={false}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const name = language === 'ka' ? item.name_ka : item.name_en;
          const iconName = ICON_MAP[item.icon || ''] || 'car';
          const isExpanded = expandedId === item.id;
          const subs = subcategories[item.id] || [];

          return (
            <View style={styles.categoryContainer}>
              <TouchableOpacity
                style={styles.categoryRow}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.7}
              >
                <View style={styles.categoryLeft}>
                  <View style={styles.iconCircle}>
                    <MaterialCommunityIcons name={iconName} size={24} color={Colors.primary} />
                  </View>
                  <Text style={styles.categoryName}>{name}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <TouchableOpacity
                    style={styles.viewAllBtn}
                    onPress={() => router.push(`/category/${item.id}`)}
                  >
                    <Text style={styles.viewAllText}>{t('common.viewAll')}</Text>
                  </TouchableOpacity>
                  <MaterialCommunityIcons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={Colors.textSecondary}
                  />
                </View>
              </TouchableOpacity>

              {isExpanded && subs.length > 0 && (
                <View style={styles.subcategories}>
                  {subs.map((sub) => (
                    <TouchableOpacity
                      key={sub.id}
                      style={styles.subcategoryItem}
                      onPress={() => router.push(`/category/${sub.id}`)}
                    >
                      <Text style={styles.subcategoryName}>
                        {language === 'ka' ? sub.name_ka : sub.name_en}
                      </Text>
                      <MaterialCommunityIcons name="chevron-right" size={18} color={Colors.textSecondary} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        }}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
  },
  categoryContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.md,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fef2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  viewAllBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  viewAllText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  subcategories: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingLeft: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  subcategoryName: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
});
