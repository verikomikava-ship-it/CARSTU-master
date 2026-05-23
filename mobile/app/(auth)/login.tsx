import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Colors, Spacing, FontSize } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button, Input } from '@/components/ui';
import { signIn } from '@/services/auth-service';
import { loginSchema, LoginFormData } from '@/utils/validators';

export default function LoginScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');
    try {
      await signIn(data.email, data.password);
      router.back();
    } catch (e: any) {
      setError(e.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>{t('auth.login')}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

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

        <Button
          title={t('auth.login')}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          fullWidth
          size="lg"
        />

        <Button
          title={t('auth.forgotPassword')}
          onPress={() => router.push('/(auth)/forgot-password')}
          variant="ghost"
          fullWidth
          style={styles.link}
        />

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.noAccount')} </Text>
          <Button
            title={t('auth.register')}
            onPress={() => router.replace('/(auth)/register')}
            variant="ghost"
            size="sm"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
  },
  error: {
    color: Colors.error,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: '#fef2f2',
    padding: Spacing.md,
    borderRadius: 8,
  },
  link: {
    marginTop: Spacing.md,
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
