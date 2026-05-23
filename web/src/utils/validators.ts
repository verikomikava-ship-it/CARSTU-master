import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'checkout.required'),
  phone: z.string().transform((v) => v.replace(/[\s\-()]/g, '')).refine(
    (v) => /^(\+995\d{9}|0\d{9}|\d{9})$/.test(v),
    'checkout.invalidPhone'
  ),
  city: z.string().min(2, 'checkout.required'),
  address: z.string().min(5, 'checkout.required'),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
  deliveryMethod: z.enum(['standard', 'express']).default('standard'),
});

export const loginSchema = z.object({
  email: z.string().email('checkout.invalidEmail'),
  password: z.string().min(6, 'checkout.required'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'auth.errors.nameRequired'),
  email: z.string().email('auth.errors.invalidEmail'),
  phone: z.string().transform((v) => v.replace(/[\s\-()]/g, '')).refine(
    (v) => /^(\+995\d{9}|0\d{9}|\d{9})$/.test(v),
    'auth.errors.invalidPhone'
  ),
  city: z.string().min(2, 'auth.errors.cityRequired'),
  address: z.string().min(5, 'auth.errors.addressRequired'),
  password: z.string().min(6, 'auth.errors.passwordMin'),
  confirmPassword: z.string().min(6, 'auth.errors.passwordMin'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'auth.errors.passwordMismatch',
  path: ['confirmPassword'],
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
