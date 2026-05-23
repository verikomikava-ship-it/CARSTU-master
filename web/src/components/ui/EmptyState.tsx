'use client';

import { ShoppingCart, Package, Search, AlertCircle } from 'lucide-react';
import { Button } from './Button';

const iconMap: Record<string, React.ElementType> = {
  'cart-outline': ShoppingCart,
  'package-variant': Package,
  'magnify-close': Search,
  default: AlertCircle,
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon = 'default', title, message, actionLabel, onAction }: EmptyStateProps) {
  const IconComponent = iconMap[icon] || iconMap.default;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-6">
        <IconComponent className="w-10 h-10 text-text-muted" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">{title}</h3>
      {message && <p className="text-text-secondary text-center mb-6">{message}</p>}
      {actionLabel && onAction && (
        <Button variant="gradient" onClick={onAction} size="lg">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
