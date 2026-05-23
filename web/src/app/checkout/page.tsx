'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Truck, Zap, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CitySelect } from '@/components/ui/CitySelect';
import { CartSummary } from '@/components/cart/CartSummary';
import { formatPrice } from '@/utils/format-price';
import { checkoutSchema, CheckoutFormData } from '@/utils/validators';
import { supabase, isMockMode } from '@/lib/supabase';

export default function CheckoutPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [showExpressInfo, setShowExpressInfo] = useState(false);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { deliveryMethod: 'standard' },
  });

  useEffect(() => {
    if (isMockMode) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      const meta = user.user_metadata || {};
      if (meta.full_name) setValue('name', meta.full_name);
      if (meta.phone) setValue('phone', meta.phone);
      if (meta.city) setValue('city', meta.city);
      if (meta.address) setValue('address', meta.address);
    });
  }, [setValue]);

  const deliveryMethod = watch('deliveryMethod');
  const deliveryFee = deliveryMethod === 'express' ? 10 : 3;

  const onSubmit = (data: CheckoutFormData) => {
    const params = new URLSearchParams({
      name: data.name,
      phone: data.phone,
      city: data.city,
      address: data.address,
      postalCode: data.postalCode || '',
      notes: data.notes || '',
      delivery: data.deliveryMethod,
    });
    router.push(`/checkout/payment?${params.toString()}`);
  };

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-xl font-semibold text-text-primary mb-6">{t('checkout.deliveryInfo')}</h1>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label={t('checkout.name')}
                placeholder={t('checkout.name')}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
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
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                type="tel"
                error={errors.phone?.message ? t(errors.phone.message) : undefined}
              />
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <CitySelect
                label={t('checkout.city')}
                placeholder={t('checkout.city')}
                value={value || ''}
                onChange={onChange}
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
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
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
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />

          {/* Delivery Method */}
          <div className="mt-5 mb-4">
            <label className="block text-[13px] font-medium text-text-primary mb-3">
              {t('checkout.deliveryMethod')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Standard */}
              <button
                type="button"
                onClick={() => setValue('deliveryMethod', 'standard')}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  deliveryMethod === 'standard'
                    ? 'border-blue bg-blue/5'
                    : 'border-border hover:border-blue/30'
                }`}
              >
                <Truck className={`w-5 h-5 ${deliveryMethod === 'standard' ? 'text-blue' : 'text-text-muted'}`} />
                <span className={`text-[13px] font-semibold ${deliveryMethod === 'standard' ? 'text-blue' : 'text-text-primary'}`}>
                  {t('checkout.standard')}
                </span>
                <span className="text-[11px] text-text-muted text-center leading-tight">
                  {t('checkout.standardDesc')}
                </span>
                <span className={`text-[12px] font-bold ${deliveryMethod === 'standard' ? 'text-blue' : 'text-text-primary'}`}>
                  {formatPrice(3)}
                </span>
              </button>

              {/* Express */}
              <button
                type="button"
                onClick={() => setValue('deliveryMethod', 'express')}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  deliveryMethod === 'express'
                    ? 'border-blue bg-blue/5'
                    : 'border-border hover:border-blue/30'
                }`}
              >
                <span
                  role="button"
                  onClick={(e) => { e.stopPropagation(); setShowExpressInfo(true); }}
                  className="absolute top-2 right-2 p-0.5 text-text-muted hover:text-blue transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                </span>
                <Zap className={`w-5 h-5 ${deliveryMethod === 'express' ? 'text-blue' : 'text-text-muted'}`} />
                <span className={`text-[13px] font-semibold ${deliveryMethod === 'express' ? 'text-blue' : 'text-text-primary'}`}>
                  {t('checkout.express')}
                </span>
                <span className="text-[11px] text-text-muted text-center leading-tight">
                  {t('checkout.expressDesc')}
                </span>
                <span className={`text-[12px] font-bold ${deliveryMethod === 'express' ? 'text-blue' : 'text-text-primary'}`}>
                  {formatPrice(10)}
                </span>
              </button>
            </div>
          </div>

          {/* Express Info Modal */}
          {showExpressInfo && (
            <div className="relative bg-blue/5 border border-blue/20 rounded-xl p-4 mb-4">
              <button
                type="button"
                onClick={() => setShowExpressInfo(false)}
                className="absolute top-2 right-2 p-0.5 text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <p className="text-[12px] text-text-secondary leading-relaxed pr-5">
                {t('checkout.expressInfo')}
              </p>
            </div>
          )}

          <Controller
            control={control}
            name="notes"
            render={({ field: { onChange, value } }) => (
              <Input
                label={t('checkout.notes')}
                placeholder={t('checkout.notes')}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                multiline
                rows={3}
              />
            )}
          />

          <CartSummary deliveryFee={deliveryFee} />

          <Button type="submit" variant="gradient" fullWidth size="lg" className="mt-6">
            {t('checkout.paymentMethod')}
          </Button>
        </form>
      </div>
    </div>
  );
}
