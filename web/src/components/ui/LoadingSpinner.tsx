'use client';

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-10 h-10 text-blue animate-spin" />
      {text && <p className="mt-3 text-text-secondary text-sm">{text}</p>}
    </div>
  );
}
