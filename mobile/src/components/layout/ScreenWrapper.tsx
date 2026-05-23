import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';

interface ScreenWrapperProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  padded?: boolean;
}

export function ScreenWrapper({ children, scroll = true, style, padded = true }: ScreenWrapperProps) {
  const content = scroll ? (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[padded && styles.padded, style]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.container, padded && styles.padded, style]}>
      {children}
    </View>
  );

  return <SafeAreaView style={styles.safe} edges={['left', 'right']}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  padded: {
    padding: 16,
  },
});
