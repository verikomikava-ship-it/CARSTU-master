import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, Spacing, FontSize } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button, Input } from '@/components/ui';
import { signUp } from '@/services/auth-service';
import { registerSchema, RegisterFormData } from '@/utils/validators';

export default function RegisterScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError('');
    try {
      await signUp(data.email, data.password, data.fullName, data.phone);
      router.back();
    } catch (e: any) {
      setError(e.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>{t('auth.register')}</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('auth.fullName')}
            placeholder={t('auth.fullName')}
            value={value}
            onChangeText={onChange}
            error={errors.fullName?.message ? t(errors.fullName.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('auth.email')}
            placeholder="email@example.com"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email?.message ? t(errors.email.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('auth.phone')}
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
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('auth.password')}
            placeholder="******"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.password?.message ? t(errors.password.message) : undefined}
          />
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            label={t('auth.confirmPassword')}
            placeholder="******"
            value={value}
            onChangeText={onChange}
            secureTextEntry
            error={errors.confirmPassword?.message}
          />
        )}
      />

      <Button
        title={t('auth.register')}
        onPress={handleSubmit(onSubmit)}
        loading={loading}
        fullWidth
        size="lg"
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('auth.hasAccount')} </Text>
        <Button
          title={t('auth.login')}
          onPress={() => router.replace('/(auth)/login')}
          variant="ghost"
          size="sm"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.errorLight,
    padding: Spacing.md,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  footerText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
