'use client';

import { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: 'bg-blue text-white hover:bg-blue-dark shadow-card',
  secondary: 'bg-card text-text-primary border border-border hover:bg-card-hover',
  outline: 'border border-blue text-blue hover:bg-blue hover:text-white',
  ghost: 'text-blue hover:bg-blue/5',
  gradient: 'gradient-primary text-white shadow-card hover:shadow-card-hover',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-[12px]',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
