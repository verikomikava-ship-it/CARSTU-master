import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CategoryCard } from './components/CategoryCard';
import { ProductCard } from './components/ProductCard';
import { CartSidebar, type CartItem } from './components/CartSidebar';

export default function App() {
  const [language, setLanguage] = useState<'ka' | 'en'>('ka');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Apply dark mode class to html element and save to localStorage
  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const t = {
    ka: {
      hero: {
        title: 'მანქანის აქსესუარები',
        subtitle: 'საუკეთესო ხარისხი • დაბალი ფასები • სწრაფი მიწოდება',
        cta: 'იხილეთ კატალოგი',
      },
      categories: {
        title: 'კატეგორიები',
        subtitle: 'აირჩიეთ კატეგორია რომელიც გაინტერესებთ',
      },
      featured: {
        title: 'რჩეული პროდუქტები',
        subtitle: 'ჩვენი ყველაზე პოპულარული პროდუქტები',
      },
    },
    en: {
      hero: {
        title: 'Car Accessories',
        subtitle: 'Best Quality • Low Prices • Fast Delivery',
        cta: 'View Catalog',
      },
      categories: {
        title: 'Categories',
        subtitle: 'Choose the category you are interested in',
      },
      featured: {
        title: 'Featured Products',
        subtitle: 'Our most popular products',
      },
    },
  };

  const categories = [
    { id: 1, icon: '🪟', titleKa: 'ფარები და სარკეები', titleEn: 'Windows & Mirrors', count: 145 },
    { id: 2, icon: '💺', titleKa: 'სავარძლები', titleEn: 'Seats', count: 89 },
    { id: 3, icon: '🎵', titleKa: 'აუდიო სისტემები', titleEn: 'Audio Systems', count: 234 },
    { id: 4, icon: '📱', titleKa: 'ელექტრონიკა', titleEn: 'Electronics', count: 167 },
    { id: 5, icon: '🛞', titleKa: 'საბურავები', titleEn: 'Tires', count: 312 },
    { id: 6, icon: '🔧', titleKa: 'ინსტრუმენტები', titleEn: 'Tools', count: 198 },
    { id: 7, icon: '💡', titleKa: 'განათება', titleEn: 'Lighting', count: 156 },
    { id: 8, icon: '🧼', titleKa: 'საწმენდი', titleEn: 'Cleaning', count: 78 },
    { id: 9, icon: '🛡️', titleKa: 'დაცვა', titleEn: 'Protection', count: 134 },
    { id: 10, icon: '🎨', titleKa: 'სტაილინგი', titleEn: 'Styling', count: 201 },
    { id: 11, icon: '📦', titleKa: 'შენახვა', titleEn: 'Storage', count: 92 },
    { id: 12, icon: '🔋', titleKa: 'ბატარეები', titleEn: 'Batteries', count: 67 },
  ];

  const products = [
    {
      id: 1,
      titleKa: 'LED ფარები - Premium',
      titleEn: 'LED Headlights - Premium',
      price: 249.99,
      originalPrice: 349.99,
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 124,
      inStock: true,
    },
    {
      id: 2,
      titleKa: 'ავტომანქანის დერეფანი - ხის ტიპი',
      titleEn: 'Car Floor Mats - Wood Style',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&h=500&fit=crop',
      rating: 4.5,
      reviews: 89,
      inStock: true,
    },
    {
      id: 3,
      titleKa: 'Bluetooth აუდიო სისტემა',
      titleEn: 'Bluetooth Audio System',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 156,
      inStock: true,
    },
    {
      id: 4,
      titleKa: 'GPS ნავიგაცია 7"',
      titleEn: 'GPS Navigation 7"',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 203,
      inStock: true,
    },
    {
      id: 5,
      titleKa: 'თერმოსი - 500მლ',
      titleEn: 'Car Thermos - 500ml',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&h=500&fit=crop',
      rating: 4.4,
      reviews: 67,
      inStock: true,
    },
    {
      id: 6,
      titleKa: 'უკანა კამერა HD',
      titleEn: 'Rear View Camera HD',
      price: 129.99,
      originalPrice: 169.99,
      image: 'https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 312,
      inStock: false,
    },
    {
      id: 7,
      titleKa: 'ნახშირბადის ბოჭკოვანი ბალიში',
      titleEn: 'Carbon Fiber Neck Pillow',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=500&h=500&fit=crop',
      rating: 4.3,
      reviews: 45,
      inStock: true,
    },
    {
      id: 8,
      titleKa: 'სმარტ დამტენი USB-C',
      titleEn: 'Smart Charger USB-C',
      price: 54.99,
      originalPrice: 74.99,
      image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 189,
      inStock: true,
    },
  ];

  const handleAddToCart = (product: typeof products[0]) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: language === 'ka' ? product.titleKa : product.titleEn,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        cartItemsCount={totalCartItems}
        onCartClick={() => setCartOpen(true)}
        darkMode={darkMode}
        onDarkModeToggle={toggleDarkMode}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="mb-4">{t[language].hero.title}</h1>
            <p className="text-muted-foreground mb-8">
              {t[language].hero.subtitle}
            </p>
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              {t[language].hero.cta}
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24" id="categories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-2">{t[language].categories.title}</h2>
            <p className="text-muted-foreground">{t[language].categories.subtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={language === 'ka' ? category.titleKa : category.titleEn}
                itemCount={category.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-2">{t[language].featured.title}</h2>
            <p className="text-muted-foreground">{t[language].featured.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={language === 'ka' ? product.titleKa : product.titleEn}
                price={product.price}
                originalPrice={product.originalPrice}
                currency="₾"
                rating={product.rating}
                reviews={product.reviews}
                inStock={product.inStock}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer language={language} />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        language={language}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}