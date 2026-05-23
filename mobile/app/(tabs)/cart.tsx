import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Colors, Spacing } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button, EmptyState } from '@/components/ui';
import { CartItemCard } from '@/components/cart/CartItem';
import { CartSummary } from '@/components/cart/CartSummary';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';

export default function CartScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const user = useAuthStore((s) => s.user);

  const handleCheckout = () => {
    if (!user) {
      router.push('/(auth)/login');
      return;
    }
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <ScreenWrapper>
        <EmptyState
          icon="cart-outline"
          title={t('cart.emptyCart')}
          message={t('cart.emptyCartMessage')}
          actionLabel={t('cart.continueShopping')}
          onAction={() => router.push('/(tabs)/catalog')}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper scroll={false} padded={false}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.productId}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItemCard item={item} />}
        ListFooterComponent={
          <View>
            <CartSummary />
            <Button
              title={t('cart.proceedToCheckout')}
              onPress={handleCheckout}
              fullWidth
              size="lg"
              style={styles.checkoutBtn}
            />
            <Button
              title={t('cart.clearCart')}
              onPress={clearCart}
              variant="ghost"
              fullWidth
              style={styles.clearBtn}
            />
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: Spacing.lg,
  },
  checkoutBtn: {
    marginTop: Spacing.lg,
  },
  clearBtn: {
    marginTop: Spacing.sm,
  },
});
