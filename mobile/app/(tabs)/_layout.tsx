import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize } from '@/constants/theme';
import { useCartStore } from '@/stores/cart-store';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

function CartBadge() {
  const itemCount = useCartStore((s) => s.getItemCount());
  if (itemCount === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{itemCount > 99 ? '99+' : itemCount}</Text>
    </View>
  );
}

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: Colors.surface,
          borderBottomColor: Colors.border,
          borderBottomWidth: 1,
        },
        headerShadowVisible: false,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: FontSize.lg,
          color: Colors.text,
        },
        headerRight: () => <LanguageSwitcher />,
        headerRightContainerStyle: { paddingRight: 16 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tabs.home'),
          headerTitle: 'AutoParts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalog"
        options={{
          title: t('tabs.catalog'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-grid" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('tabs.cart'),
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons name="cart" size={size} color={color} />
              <CartBadge />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t('tabs.account'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: Colors.cartBadge,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.textLight,
    fontSize: 10,
    fontWeight: '700',
  },
});
