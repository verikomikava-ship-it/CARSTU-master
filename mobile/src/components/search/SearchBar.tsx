import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Colors, BorderRadius, Spacing, FontSize } from '@/constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChangeText, onClear, autoFocus }: SearchBarProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={22} color={Colors.textSecondary} />
      <TextInput
        style={styles.input}
        placeholder={t('common.search')}
        placeholderTextColor={Colors.disabled}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <MaterialCommunityIcons name="close-circle" size={20} color={Colors.disabled} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
    paddingVertical: 4,
  },
});
