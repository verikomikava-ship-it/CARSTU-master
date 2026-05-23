'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Car, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PriceDisplay } from '@/components/product/PriceDisplay';
import { QuantitySelector } from '@/components/cart/QuantitySelector';
import { ProductCard } from '@/components/product/ProductCard';
import { useCartStore } from '@/stores/cart-store';
import { useLanguageStore } from '@/stores/language-store';
import { getProductById, getProducts } from '@/services/product-service';
import { getCategoryById } from '@/services/category-service';
import { Product } from '@/types/product';
import { Category } from '@/types/category';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [similar, setSimilar] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setCurrentImageIndex(0);
      setQuantity(1);
      setSimilar([]);
      setCategory(null);
      getProductById(id)
        .then((p) => {
          setProduct(p);
          if (p?.category_id) {
            getCategoryById(p.category_id).then(setCategory).catch(console.error);
            getProducts({ categoryId: p.category_id, limit: 10 })
              .then((items) => setSimilar(items.filter((item) => item.id !== p.id).slice(0, 8)))
              .catch(console.error);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <p className="text-center py-20 text-error">{t('common.noResults')}</p>;

  const name = language === 'ka' ? product.name_ka : product.name_en;
  const description = language === 'ka' ? product.description_ka : product.description_en;
  const categoryName = category ? (language === 'ka' ? category.name_ka : category.name_en) : '';
  const images = product.images?.sort((a, b) => a.sort_order - b.sort_order) || [];
  const discount = product.sale_price ? Math.round((1 - product.sale_price / product.price) * 100) : 0;

  const getCartItem = () => ({
    productId: product.id, nameKa: product.name_ka, nameEn: product.name_en,
    price: product.price, salePrice: product.sale_price,
    imageUrl: images.find((img) => img.is_primary)?.url || images[0]?.url || null,
  });

  const handleAddToCart = () => {
    addItem(getCartItem(), quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(getCartItem(), quantity);
    router.push('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-[13px] text-text-muted mb-5">
        <Link href="/" className="hover:text-text-primary transition-colors">
          {t('tabs.home')}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/catalog" className="hover:text-text-primary transition-colors">
          {t('tabs.catalog')}
        </Link>
        {categoryName && (
          <>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/category/${category?.slug || category?.id}`} className="hover:text-text-primary transition-colors">
              {categoryName}
            </Link>
          </>
        )}
        <ChevronRight className="w-3 h-3" />
        <span className="text-text-secondary truncate max-w-[200px]">{name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div>
          <div className="aspect-square bg-card border border-border rounded-2xl overflow-hidden relative">
            {images.length > 0 ? (
              <Image src={images[currentImageIndex]?.url} alt={name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"><Car className="w-16 h-16 text-text-muted" /></div>
            )}
            {discount > 0 && (
              <span className="absolute top-4 left-4 gradient-primary text-white text-[13px] font-bold px-3 py-1 rounded-xl">
                -{discount}%
              </span>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {images.map((img, i) => (
                <button key={img.id} onClick={() => setCurrentImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-blue shadow-card' : 'border-border'}`}>
                  <Image src={img.url} alt="" width={64} height={64} className="object-cover w-full h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{name}</h1>

          {/* Product details table */}
          <div className="mt-4 space-y-2">
            {product.brand && (
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-text-muted">{t('product.brand')}:</span>
                <span className="font-medium text-text-primary">{product.brand}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-[13px]">
              <span className="text-text-muted">{t('product.code')}:</span>
              <span className="font-medium text-text-primary">{product.sku || product.id.slice(0, 8).toUpperCase()}</span>
            </div>
            {categoryName && (
              <div className="flex items-center gap-2 text-[13px]">
                <span className="text-text-muted">{t('product.category')}:</span>
                <Link href={`/category/${category?.slug || category?.id}`} className="font-medium text-blue hover:underline">
                  {categoryName}
                </Link>
              </div>
            )}
          </div>

          {/* Price & Stock */}
          <div className="flex items-center justify-between mt-5 pb-5 border-b border-border">
            <PriceDisplay price={product.price} salePrice={product.sale_price} large />
            <span className={`text-[13px] font-semibold px-3 py-1 rounded-lg ${
              product.stock_quantity > 0
                ? 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400'
                : 'text-error bg-error-bg'
            }`}>
              {product.stock_quantity > 0 ? t('common.inStock') : t('common.outOfStock')}
            </span>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-3 mt-5">
            <QuantitySelector quantity={quantity} onChange={setQuantity} max={product.stock_quantity} />
            <Button variant="outline" onClick={handleAddToCart} disabled={product.stock_quantity === 0} size="lg" className="flex-1">
              {addedToCart ? t('product.addedToCart') : t('common.addToCart')}
            </Button>
            <Button variant="gradient" onClick={handleBuyNow} disabled={product.stock_quantity === 0} size="lg" className="flex-1">
              {t('common.buyNow')}
            </Button>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-6 pt-5 border-t border-border">
              <h2 className="text-[15px] font-bold text-text-primary mb-2">{t('product.description')}</h2>
              <p className="text-[14px] text-text-secondary leading-relaxed whitespace-pre-line">{description}</p>
            </div>
          )}

          {/* Specifications */}
          {Object.keys(product.specifications || {}).length > 0 && (
            <div className="mt-5 pt-5 border-t border-border">
              <h2 className="text-[15px] font-bold text-text-primary mb-2">{t('product.specifications')}</h2>
              <div className="divide-y divide-border-light">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex py-2.5">
                    <span className="flex-1 text-[13px] text-text-muted">{key}</span>
                    <span className="flex-1 text-[13px] font-medium text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Similar Products */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            {language === 'ka' ? 'მსგავსი ნივთები' : 'Similar Products'}
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:hidden">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {similar.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
