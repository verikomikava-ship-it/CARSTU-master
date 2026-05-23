import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'checkout.required'),
  phone: z.string().regex(/^(\+995|0)\d{9}$/, 'checkout.invalidPhone'),
  city: z.string().min(2, 'checkout.required'),
  address: z.string().min(5, 'checkout.required'),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('checkout.invalidEmail'),
  password: z.string().min(6, 'checkout.required'),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, 'checkout.required'),
  email: z.string().email('checkout.invalidEmail'),
  phone: z.string().regex(/^(\+995|0)\d{9}$/, 'checkout.invalidPhone'),
  password: z.string().min(6, 'checkout.required'),
  confirmPassword: z.string().min(6, 'checkout.required'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
