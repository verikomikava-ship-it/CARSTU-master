import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLanguageStore } from '@/stores/language-store';
import { Colors, BorderRadius, FontSize, Spacing } from '@/constants/theme';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguageStore();

  const toggle = () => {
    setLanguage(language === 'ka' ? 'en' : 'ka');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={toggle} activeOpacity={0.7}>
      <MaterialCommunityIcons name="web" size={16} color={Colors.text} />
      <Text style={styles.text}>{language.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  text: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: Colors.text,
  },
});
