'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CitySelect } from '@/components/ui/CitySelect';
import { signUp } from '@/services/auth-service';
import { registerSchema, RegisterFormData } from '@/utils/validators';

export default function RegisterPage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successEmail, setSuccessEmail] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const translateError = (message: string): string => {
    const msg = message.toLowerCase();
    if (msg.includes('phone') && (msg.includes('already') || msg.includes('registered'))) {
      return t('auth.errors.phoneAlreadyRegistered');
    }
    if (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('duplicate') || msg.includes('unique')) {
      return t('auth.errors.emailAlreadyRegistered');
    }
    if (msg.includes('email')) return t('auth.errors.invalidEmail');
    if (msg.includes('password') && msg.includes('6')) return t('auth.errors.passwordMin');
    if (msg.includes('phone')) return t('auth.errors.invalidPhone');
    return t('auth.errors.genericError');
  };

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true); setError('');
    try {
      await signUp(data.email, data.password, data.fullName, data.phone, data.city, data.address);
      setSuccessEmail(data.email);
    }
    catch (e: any) { setError(translateError(e.message || '')); }
    finally { setLoading(false); }
  };

  if (successEmail) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-text-primary mb-2">{t('auth.registerSuccessTitle')}</h1>
          <p className="text-sm text-text-secondary mb-8">{t('auth.registerSuccessSubtitle')}</p>

          <div className="bg-blue/5 border border-blue/20 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-blue" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h2 className="font-semibold text-text-primary">{t('auth.checkEmailTitle')}</h2>
            </div>
            <p className="text-sm text-text-secondary mb-2">{t('auth.checkEmailDesc')}</p>
            <p className="text-sm font-semibold text-blue break-all mb-3">{successEmail}</p>
            <p className="text-xs text-text-secondary leading-relaxed">{t('auth.checkEmailAction')}</p>
          </div>

          <div className="text-xs text-text-secondary mb-6">
            <span>{t('auth.didNotReceive')} </span>
            <span className="font-medium">{t('auth.checkSpam')}</span>
          </div>

          <Link href="/auth/login" className="block">
            <Button variant="gradient" fullWidth size="lg">{t('auth.goToLogin')}</Button>
          </Link>
          <Link href="/" className="block mt-3 text-sm text-text-secondary hover:text-text-primary transition-colors">
            {t('auth.backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <h1 className="text-2xl font-bold text-text-primary text-center mb-8">{t('auth.register')}</h1>
        {error && <div className="bg-error-bg text-error text-sm text-center p-3 rounded-xl mb-6">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller control={control} name="fullName" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.fullName')} placeholder={t('auth.fullName')} value={value || ''} onChange={(e) => onChange(e.target.value)} error={errors.fullName?.message ? t(errors.fullName.message) : undefined} />
          )} />
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.email')} placeholder="email@example.com" value={value || ''} onChange={(e) => onChange(e.target.value)} type="email" error={errors.email?.message ? t(errors.email.message) : undefined} />
          )} />
          <Controller control={control} name="phone" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.phone')} placeholder="+995 XXX XXX XXX" value={value || ''} onChange={(e) => onChange(e.target.value)} type="tel" error={errors.phone?.message ? t(errors.phone.message) : undefined} />
          )} />
          <Controller control={control} name="city" render={({ field: { onChange, value } }) => (
            <CitySelect label={t('auth.city')} placeholder={t('auth.city')} value={value || ''} onChange={onChange} error={errors.city?.message ? t(errors.city.message) : undefined} />
          )} />
          <Controller control={control} name="address" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.address')} placeholder={t('auth.address')} value={value || ''} onChange={(e) => onChange(e.target.value)} error={errors.address?.message ? t(errors.address.message) : undefined} />
          )} />
          <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.password')} placeholder="******" value={value || ''} onChange={(e) => onChange(e.target.value)} type="password" error={errors.password?.message ? t(errors.password.message) : undefined} />
          )} />
          <Controller control={control} name="confirmPassword" render={({ field: { onChange, value } }) => (
            <Input label={t('auth.confirmPassword')} placeholder="******" value={value || ''} onChange={(e) => onChange(e.target.value)} type="password" error={errors.confirmPassword?.message} />
          )} />
          <Button type="submit" variant="gradient" loading={loading} fullWidth size="lg">{t('auth.register')}</Button>
        </form>
        <div className="flex items-center justify-center gap-1 mt-8">
          <span className="text-text-secondary text-[14px]">{t('auth.hasAccount')}</span>
          <Link href="/auth/login" className="text-blue font-medium text-[14px] hover:underline">{t('auth.login')}</Link>
        </div>
      </div>
    </div>
  );
}
