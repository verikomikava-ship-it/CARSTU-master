import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
}

export function ProductCard({
  image,
  title,
  price,
  originalPrice,
  currency,
  rating,
  reviews,
  inStock,
  onAddToCart,
  onToggleFavorite,
}: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-all overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square bg-secondary/30 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="px-2 py-1 rounded-md bg-destructive text-destructive-foreground text-xs font-semibold">
              -{discount}%
            </span>
          )}
          {!inStock && (
            <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs font-semibold">
              Out of Stock
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className="absolute top-3 right-3 size-8 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
        >
          <Heart className="size-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium line-clamp-2 mb-2 min-h-[3em]">{title}</h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}>
                ⭐
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-lg">
            {price.toFixed(2)} {currency}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice.toFixed(2)} {currency}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={!inStock}
          className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="size-4" />
          <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
        </button>
      </div>
    </div>
  );
}
