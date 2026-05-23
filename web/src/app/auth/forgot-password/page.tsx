'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { resetPassword } from '@/services/auth-service';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('');
    try { await resetPassword(email); setSent(true); }
    catch (err: any) { setError(err.message || t('common.error')); }
    finally { setLoading(false); }
  };

  if (sent) {
    return (
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <div className="w-16 h-16 rounded-2xl bg-success-bg flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-xl font-semibold text-text-primary mb-2">{t('auth.resetEmailSent')}</h1>
          <Link href="/auth/login" className="text-blue text-sm hover:underline mt-4 inline-block">{t('auth.login')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-card">
        <h1 className="text-2xl font-bold text-text-primary text-center mb-8">{t('auth.resetPassword')}</h1>
        {error && <div className="bg-error-bg text-error text-sm text-center p-3 rounded-xl mb-6">{error}</div>}
        <form onSubmit={handleSubmit}>
          <Input label={t('auth.email')} placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <Button type="submit" variant="gradient" loading={loading} fullWidth size="lg">{t('auth.resetPassword')}</Button>
        </form>
        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-blue text-sm hover:underline">{t('common.back')}</Link>
        </div>
      </div>
    </div>
  );
}
