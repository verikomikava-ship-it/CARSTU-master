'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Package, MapPin, UserPen, ChevronRight, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { useAuthStore } from '@/stores/auth-store';
import { signOut } from '@/services/auth-service';

export default function AccountPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-blue/10 flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-blue" />
        </div>
        <h2 className="text-xl font-bold text-text-primary">{t('auth.loginRequired')}</h2>
        <p className="text-text-secondary mt-2 mb-8">{t('auth.loginToContinue')}</p>
        <Button onClick={() => router.push('/auth/login')} variant="gradient" fullWidth size="lg" className="mb-3">
          {t('auth.login')}
        </Button>
        <Button onClick={() => router.push('/auth/register')} variant="outline" fullWidth size="lg">
          {t('auth.register')}
        </Button>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, label: t('account.myOrders'), href: '/orders' },
    { icon: MapPin, label: t('account.addresses'), href: '#' },
    { icon: UserPen, label: t('account.editProfile'), href: '#' },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
      {/* Profile Card */}
      <div className="flex items-center bg-card border border-border rounded-2xl p-4 shadow-card mb-4">
        <div className="w-[60px] h-[60px] rounded-2xl gradient-primary flex items-center justify-center mr-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-[17px] font-bold text-text-primary">
            {user.user_metadata?.full_name || user.email}
          </h2>
          <p className="text-[13px] text-text-secondary">{user.email}</p>
        </div>
      </div>

      {/* Language */}
      <div className="flex items-center justify-between bg-card border border-border rounded-2xl p-4 shadow-card mb-4">
        <span className="text-[15px] font-semibold text-text-primary">{t('account.language')}</span>
        <LanguageSwitcher />
      </div>

      {/* Menu */}
      <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden mb-6">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center gap-3 p-4 border-b border-border last:border-b-0
              hover:bg-surface transition-colors"
          >
            <item.icon className="w-6 h-6 text-blue" />
            <span className="flex-1 text-[15px] text-text-primary">{item.label}</span>
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <Button onClick={handleSignOut} variant="outline" fullWidth>
        {t('auth.logout')}
      </Button>
    </div>
  );
}
