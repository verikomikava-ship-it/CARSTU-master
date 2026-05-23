import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { Colors, Spacing, FontSize } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button, Input } from '@/components/ui';
import { resetPassword } from '@/services/auth-service';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await resetPassword(email);
      setSent(true);
    } catch (e: any) {
      setError(e.message || t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <ScreenWrapper>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>✉️</Text>
          <Text style={styles.successTitle}>{t('auth.resetEmailSent')}</Text>
          <Text style={styles.successMessage}>{email}</Text>
          <Button
            title={t('auth.login')}
            onPress={() => router.replace('/(auth)/login')}
            fullWidth
            size="lg"
            style={{ marginTop: Spacing.xxl }}
          />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>{t('auth.resetPassword')}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Input
          label={t('auth.email')}
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          title={t('auth.resetPassword')}
          onPress={handleReset}
          loading={loading}
          fullWidth
          size="lg"
        />

        <Button
          title={t('common.back')}
          onPress={() => router.back()}
          variant="ghost"
          fullWidth
          style={{ marginTop: Spacing.md }}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Spacing.xxl,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xxl,
    textAlign: 'center',
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  successIcon: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  successTitle: {
    fontSize: FontSize.xl,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
});
