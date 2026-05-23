import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Spacing, FontSize, BorderRadius, Shadow } from '@/constants/theme';
import { ScreenWrapper } from '@/components/layout/ScreenWrapper';
import { Button } from '@/components/ui';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useAuthStore } from '@/stores/auth-store';
import { useLanguageStore } from '@/stores/language-store';
import { signOut } from '@/services/auth-service';

export default function AccountScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);
  const { language } = useLanguageStore();

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  if (!user) {
    return (
      <ScreenWrapper>
        <View style={styles.guestContainer}>
          <MaterialCommunityIcons name="account-circle-outline" size={80} color={Colors.disabled} />
          <Text style={styles.guestTitle}>{t('auth.loginRequired')}</Text>
          <Text style={styles.guestMessage}>{t('auth.loginToContinue')}</Text>
          <Button
            title={t('auth.login')}
            onPress={() => router.push('/(auth)/login')}
            fullWidth
            size="lg"
            style={styles.loginBtn}
          />
          <Button
            title={t('auth.register')}
            onPress={() => router.push('/(auth)/register')}
            variant="outline"
            fullWidth
            size="lg"
          />
        </View>
      </ScreenWrapper>
    );
  }

  const menuItems = [
    { icon: 'package-variant' as const, label: t('account.myOrders'), onPress: () => router.push('/orders') },
    { icon: 'map-marker' as const, label: t('account.addresses'), onPress: () => {} },
    { icon: 'account-edit' as const, label: t('account.editProfile'), onPress: () => {} },
  ];

  return (
    <ScreenWrapper>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <MaterialCommunityIcons name="account" size={40} color={Colors.textLight} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user.user_metadata?.full_name || user.email}</Text>
          <Text style={styles.profileEmail}>{user.email}</Text>
        </View>
      </View>

      {/* Language */}
      <View style={styles.languageRow}>
        <Text style={styles.languageLabel}>{t('account.language')}</Text>
        <LanguageSwitcher />
      </View>

      {/* Menu Items */}
      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress} activeOpacity={0.7}>
            <MaterialCommunityIcons name={item.icon} size={24} color={Colors.primary} />
            <Text style={styles.menuLabel}>{item.label}</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <Button
        title={t('auth.logout')}
        onPress={handleSignOut}
        variant="outline"
        fullWidth
        style={styles.logoutBtn}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  guestContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
  },
  guestTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  guestMessage: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  loginBtn: {
    marginBottom: Spacing.md,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  profileEmail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  languageLabel: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  menu: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
    ...Shadow.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    gap: Spacing.md,
  },
  menuLabel: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  logoutBtn: {
    marginTop: Spacing.md,
  },
});
