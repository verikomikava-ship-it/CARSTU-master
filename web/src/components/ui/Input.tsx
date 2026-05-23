'use client';

import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({ label, error, multiline, rows = 3, className = '', ...props }: InputProps) {
  const baseClass = `
    w-full px-4 py-3 rounded-xl border bg-input-bg text-text-primary
    placeholder:text-text-muted
    focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue
    transition-all
    ${error ? 'border-error' : 'border-border'}
    ${className}
  `;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          className={baseClass}
          rows={rows}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input className={baseClass} {...props} />
      )}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
}
