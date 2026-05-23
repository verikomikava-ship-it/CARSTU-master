import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, Spacing, FontSize, BorderRadius } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button, Input } from '@/components/ui';
import { CartSummary } from '@/components/cart/CartSummary';
import { checkoutSchema, CheckoutFormData } from '@/utils/validators';

export default function CheckoutScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data: CheckoutFormData) => {
    router.push({
      pathname: '/checkout/payment',
      params: {
        name: data.name,
        phone: data.phone,
        city: data.city,
        address: data.address,
        postalCode: data.postalCode || '',
        notes: data.notes || '',
      },
    });
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>{t('checkout.deliveryInfo')}</Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.name')}
            placeholder={t('checkout.name')}
            value={value}
            onChangeText={onChange}
            error={errors.name?.message ? t(errors.name.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.phone')}
            placeholder="+995 XXX XXX XXX"
            value={value}
            onChangeText={onChange}
            keyboardType="phone-pad"
            error={errors.phone?.message ? t(errors.phone.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="city"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.city')}
            placeholder={t('checkout.city')}
            value={value}
            onChangeText={onChange}
            error={errors.city?.message ? t(errors.city.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="address"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.address')}
            placeholder={t('checkout.address')}
            value={value}
            onChangeText={onChange}
            error={errors.address?.message ? t(errors.address.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.postalCode')}
            placeholder={t('checkout.postalCode')}
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="notes"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('checkout.notes')}
            placeholder={t('checkout.notes')}
            value={value}
            onChangeText={onChange}
            multiline
            numberOfLines={3}
            style={{ minHeight: 80, textAlignVertical: 'top' }}
          />
        )}
      />

      <CartSummary />

      <Button
        title={t('checkout.paymentMethod')}
        onPress={handleSubmit(onSubmit)}
        fullWidth
        size="lg"
        style={styles.nextBtn}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.xl,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  nextBtn: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
  },
});
