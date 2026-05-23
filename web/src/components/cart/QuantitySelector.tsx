'use client';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border border-border rounded-xl overflow-hidden">
      <button
        className="w-8 h-8 flex items-center justify-center bg-card text-text-primary
          font-semibold text-lg hover:bg-card-hover transition-all disabled:opacity-40"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
      >
        -
      </button>
      <span className="w-9 text-center text-[14px] font-semibold text-text-primary">
        {quantity}
      </span>
      <button
        className="w-8 h-8 flex items-center justify-center bg-card text-text-primary
          font-semibold text-lg hover:bg-card-hover transition-all disabled:opacity-40"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        +
      </button>
    </div>
  );
}
