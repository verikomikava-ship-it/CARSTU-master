'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { signIn } from '@/services/auth-service';
import { loginSchema, LoginFormData } from '@/utils/validators';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true); setError('');
    try { await signIn(data.email, data.password); router.back(); }
    catch (e: any) { setError(e.message || t('common.error')); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <h1 className="text-2xl font-bold text-text-primary text-center mb-8">{t('auth.login')}</h1>
        {error && <div className="bg-error-bg text-error text-sm text-center p-3 rounded-xl mb-6">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.email')} placeholder="email@example.com" value={value || ''} onChange={(e) => onChange(e.target.value)} type="email" autoComplete="email" error={errors.email?.message ? t(errors.email.message) : undefined} />
          )} />
          <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.password')} placeholder="******" value={value || ''} onChange={(e) => onChange(e.target.value)} type="password" error={errors.password?.message ? t(errors.password.message) : undefined} />
          )} />
          <Button type="submit" variant="gradient" loading={loading} fullWidth size="lg">{t('auth.login')}</Button>
        </form>
        <div className="text-center mt-4">
          <Link href="/auth/forgot-password" className="text-blue text-sm hover:underline">{t('auth.forgotPassword')}</Link>
        </div>
        <div className="flex items-center justify-center gap-1 mt-8">
          <span className="text-text-secondary text-[14px]">{t('auth.noAccount')}</span>
          <Link href="/auth/register" className="text-blue font-medium text-[14px] hover:underline">{t('auth.register')}</Link>
        </div>
      </div>
    </div>
  );
}
