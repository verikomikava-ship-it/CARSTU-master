import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, BorderRadius, Spacing, FontSize } from '@/constants/theme';
import { useLanguageStore } from '@/stores/language-store';
import { Category } from '@/types/category';

// Emoji icons matching Figma design
const EMOJI_MAP: Record<string, string> = {
  'car-seat': '💺',
  'car-side': '🎨',
  'tire': '🛞',
  'chip': '📱',
  'lightbulb-on': '💡',
  'engine': '🔧',
  'air-filter': '🪟',
  'oil': '🛢️',
  'shield-car': '🛡️',
  'speaker': '🎵',
  'spray-bottle': '🧼',
  'truck-trailer': '📦',
};

interface CategoryCardProps {
  category: Category;
  itemCount?: number;
}

export function CategoryCard({ category, itemCount }: CategoryCardProps) {
  const router = useRouter();
  const { language } = useLanguageStore();
  const name = language === 'ka' ? category.name_ka : category.name_en;
  const emoji = EMOJI_MAP[category.icon || ''] || '🚗';

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/category/${category.id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{emoji}</Text>
      </View>
      <Text style={styles.name} numberOfLines={2}>{name}</Text>
      {itemCount !== undefined && (
        <Text style={styles.count}>
          {itemCount} {language === 'ka' ? 'ნივთი' : 'items'}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  icon: {
    fontSize: 28,
  },
  name: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 18,
  },
  count: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
