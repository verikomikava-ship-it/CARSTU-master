import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: 'ka' | 'en';
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  language,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const t = {
    ka: {
      cart: 'კალათა',
      empty: 'კალათა ცარიელია',
      emptyDesc: 'დაამატეთ პროდუქტები თქვენს კალათაში',
      subtotal: 'ჯამი',
      shipping: 'მიწოდება',
      free: 'უფასო',
      total: 'სულ',
      checkout: 'შეკვეთის გაფორმება',
      continueShopping: 'გაგრძელება',
    },
    en: {
      cart: 'Shopping Cart',
      empty: 'Cart is empty',
      emptyDesc: 'Add products to your cart',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      free: 'Free',
      total: 'Total',
      checkout: 'Checkout',
      continueShopping: 'Continue Shopping',
    },
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="flex items-center gap-2">
              <ShoppingBag className="size-5" />
              {t[language].cart}
            </h2>
            <button
              onClick={onClose}
              className="size-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="size-16 text-muted-foreground mb-4" />
                <h3 className="mb-2">{t[language].empty}</h3>
                <p className="text-muted-foreground text-sm">{t[language].emptyDesc}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-lg border">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="size-20 rounded-lg object-cover"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium line-clamp-2 mb-2">{item.title}</h4>
                      <p className="font-semibold mb-2">{item.price.toFixed(2)} ₾</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="size-6 rounded border hover:bg-accent flex items-center justify-center"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="size-6 rounded border hover:bg-accent flex items-center justify-center"
                        >
                          <Plus className="size-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-auto size-6 rounded hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t[language].subtotal}</span>
                  <span>{subtotal.toFixed(2)} ₾</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t[language].shipping}</span>
                  <span className="text-green-600">{t[language].free}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">{t[language].total}</span>
                  <span className="font-semibold">{total.toFixed(2)} ₾</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  {t[language].checkout}
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  {t[language].continueShopping}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
