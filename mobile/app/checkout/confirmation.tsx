import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui';

export default function ConfirmationScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { orderNumber } = useLocalSearchParams<{ orderNumber: string; orderId: string }>();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="check" size={48} color={Colors.success} />
        </View>

        <Text style={styles.title}>{t('checkout.orderPlaced')}</Text>
        <Text style={styles.thankYou}>{t('checkout.thankYou')}</Text>

        <View style={styles.orderCard}>
          <Text style={styles.orderLabel}>{t('checkout.orderNumber')}</Text>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
        </View>

        <Button
          title={t('checkout.viewOrders')}
          onPress={() => router.replace('/orders')}
          fullWidth
          size="lg"
          style={styles.btn}
        />

        <Button
          title={t('checkout.continueShopping')}
          onPress={() => router.replace('/(tabs)')}
          variant="outline"
          fullWidth
          size="lg"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
  },
  iconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.successLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '500',
    color: Colors.text,
  },
  thankYou: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  orderCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.xl,
    alignItems: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xxl,
    width: '100%',
  },
  orderLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  orderNumber: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  btn: {
    marginBottom: Spacing.md,
  },
});
