import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, FontSize } from '@/constants/theme';

interface BadgeProps {
  text: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
}

export function Badge({ text, variant = 'primary', style }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  primary: { backgroundColor: Colors.primary },
  success: { backgroundColor: Colors.success },
  warning: { backgroundColor: Colors.warning },
  error: { backgroundColor: Colors.error },
  text: {
    color: Colors.textLight,
    fontSize: FontSize.xs,
    fontWeight: '600',
  },
});
