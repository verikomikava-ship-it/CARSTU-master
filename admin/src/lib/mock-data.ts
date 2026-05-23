import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { Order } from '@/types/order';
import { UserProfile } from '@/types/user';

const now = new Date().toISOString();

export const mockCategories: Category[] = [
  { id: '1', slug: 'laptops-computers', name_ka: 'ლეპტოპები და PC', name_en: 'Laptops & PCs', icon: '💻', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 0, is_active: true, created_at: now },
  { id: '2', slug: 'monitors', name_ka: 'მონიტორები', name_en: 'Monitors', icon: '🖥️', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 1, is_active: true, created_at: now },
  { id: '3', slug: 'keyboards-mice', name_ka: 'კლავიატურა და მაუსი', name_en: 'Keyboards & Mice', icon: '⌨️', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 2, is_active: true, created_at: now },
  { id: '4', slug: 'audio', name_ka: 'აუდიო', name_en: 'Audio', icon: '🎧', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 3, is_active: true, created_at: now },
  { id: '5', slug: 'storage', name_ka: 'მეხსიერება', name_en: 'Storage', icon: '💾', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 4, is_active: true, created_at: now },
  { id: '6', slug: 'cables-hubs', name_ka: 'კაბელები და ადაპტერები', name_en: 'Cables & Adapters', icon: '🔌', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 5, is_active: true, created_at: now },
  { id: '7', slug: 'networking', name_ka: 'ქსელი', name_en: 'Networking', icon: '🌐', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 6, is_active: true, created_at: now },
  { id: '8', slug: 'components', name_ka: 'კომპონენტები', name_en: 'PC Components', icon: '🔧', description_ka: null, description_en: null, image_url: null, parent_id: null, sort_order: 7, is_active: true, created_at: now },
  // Subcategories
  { id: '1-laptops', slug: 'laptops', name_ka: 'ლეპტოპები', name_en: 'Laptops', icon: '💻', description_ka: null, description_en: null, image_url: null, parent_id: '1', sort_order: 0, is_active: true, created_at: now },
  { id: '1-desktop-pcs', slug: 'desktop-pcs', name_ka: 'სტაციონარული კომპიუტერები', name_en: 'Desktop PCs', icon: '🖥️', description_ka: null, description_en: null, image_url: null, parent_id: '1', sort_order: 1, is_active: true, created_at: now },
  { id: '1-mini-pcs', slug: 'mini-pcs', name_ka: 'Mini PC', name_en: 'Mini PCs', icon: '📦', description_ka: null, description_en: null, image_url: null, parent_id: '1', sort_order: 2, is_active: true, created_at: now },
  { id: '1-all-in-one', slug: 'all-in-one', name_ka: 'All-in-One კომპიუტერები', name_en: 'All-in-One PCs', icon: '🖥️', description_ka: null, description_en: null, image_url: null, parent_id: '1', sort_order: 3, is_active: true, created_at: now },
  { id: '2-gaming-monitors', slug: 'gaming-monitors', name_ka: 'სათამაშო მონიტორები', name_en: 'Gaming Monitors', icon: '🎮', description_ka: null, description_en: null, image_url: null, parent_id: '2', sort_order: 0, is_active: true, created_at: now },
  { id: '2-office-monitors', slug: 'office-monitors', name_ka: 'საოფისე მონიტორები', name_en: 'Office Monitors', icon: '🖥️', description_ka: null, description_en: null, image_url: null, parent_id: '2', sort_order: 1, is_active: true, created_at: now },
  { id: '2-portable-monitors', slug: 'portable-monitors', name_ka: 'პორტატული მონიტორები', name_en: 'Portable Monitors', icon: '📱', description_ka: null, description_en: null, image_url: null, parent_id: '2', sort_order: 2, is_active: true, created_at: now },
  { id: '3-mechanical-keyboards', slug: 'mechanical-keyboards', name_ka: 'მექანიკური კლავიატურები', name_en: 'Mechanical Keyboards', icon: '⌨️', description_ka: null, description_en: null, image_url: null, parent_id: '3', sort_order: 0, is_active: true, created_at: now },
  { id: '3-gaming-mice', slug: 'gaming-mice', name_ka: 'სათამაშო მაუსი', name_en: 'Gaming Mice', icon: '🖱️', description_ka: null, description_en: null, image_url: null, parent_id: '3', sort_order: 1, is_active: true, created_at: now },
  { id: '3-wireless-keyboards', slug: 'wireless-keyboards', name_ka: 'უსადენო კლავიატურები', name_en: 'Wireless Keyboards', icon: '⌨️', description_ka: null, description_en: null, image_url: null, parent_id: '3', sort_order: 2, is_active: true, created_at: now },
  { id: '4-headphones', slug: 'headphones', name_ka: 'ყურსასმენები', name_en: 'Headphones', icon: '🎧', description_ka: null, description_en: null, image_url: null, parent_id: '4', sort_order: 0, is_active: true, created_at: now },
  { id: '4-gaming-headsets', slug: 'gaming-headsets', name_ka: 'სათამაშო ჰედსეტი', name_en: 'Gaming Headsets', icon: '🎮', description_ka: null, description_en: null, image_url: null, parent_id: '4', sort_order: 1, is_active: true, created_at: now },
  { id: '4-speakers', slug: 'speakers', name_ka: 'დინამიკები', name_en: 'Speakers', icon: '🔊', description_ka: null, description_en: null, image_url: null, parent_id: '4', sort_order: 2, is_active: true, created_at: now },
  { id: '5-ssd', slug: 'ssd', name_ka: 'SSD დისკები', name_en: 'SSD Drives', icon: '💿', description_ka: null, description_en: null, image_url: null, parent_id: '5', sort_order: 0, is_active: true, created_at: now },
  { id: '5-hdd', slug: 'hdd', name_ka: 'HDD დისკები', name_en: 'HDD Drives', icon: '💾', description_ka: null, description_en: null, image_url: null, parent_id: '5', sort_order: 1, is_active: true, created_at: now },
  { id: '5-usb-flash', slug: 'usb-flash', name_ka: 'USB ფლეშ დრაივები', name_en: 'USB Flash Drives', icon: '🔌', description_ka: null, description_en: null, image_url: null, parent_id: '5', sort_order: 2, is_active: true, created_at: now },
  { id: '6-usb-hubs', slug: 'usb-hubs', name_ka: 'USB Hub-ები', name_en: 'USB Hubs', icon: '🔌', description_ka: null, description_en: null, image_url: null, parent_id: '6', sort_order: 0, is_active: true, created_at: now },
  { id: '6-hdmi-cables', slug: 'hdmi-cables', name_ka: 'HDMI კაბელები', name_en: 'HDMI Cables', icon: '🔌', description_ka: null, description_en: null, image_url: null, parent_id: '6', sort_order: 1, is_active: true, created_at: now },
  { id: '7-routers', slug: 'routers', name_ka: 'როუტერები', name_en: 'Routers', icon: '📶', description_ka: null, description_en: null, image_url: null, parent_id: '7', sort_order: 0, is_active: true, created_at: now },
  { id: '7-wifi-adapters', slug: 'wifi-adapters', name_ka: 'WiFi ადაპტერები', name_en: 'WiFi Adapters', icon: '📡', description_ka: null, description_en: null, image_url: null, parent_id: '7', sort_order: 1, is_active: true, created_at: now },
  { id: '8-graphics-cards', slug: 'graphics-cards', name_ka: 'ვიდეო ბარათები', name_en: 'Graphics Cards', icon: '🎮', description_ka: null, description_en: null, image_url: null, parent_id: '8', sort_order: 0, is_active: true, created_at: now },
  { id: '8-ram', slug: 'ram', name_ka: 'ოპერატიული მეხსიერება (RAM)', name_en: 'RAM Memory', icon: '🧩', description_ka: null, description_en: null, image_url: null, parent_id: '8', sort_order: 1, is_active: true, created_at: now },
  { id: '8-processors', slug: 'processors', name_ka: 'პროცესორები', name_en: 'Processors (CPU)', icon: '⚙️', description_ka: null, description_en: null, image_url: null, parent_id: '8', sort_order: 2, is_active: true, created_at: now },
];

const productData = [
  { name_ka: 'ლეპტოპი Lenovo IdeaPad 15', name_en: 'Lenovo IdeaPad 15 Laptop', price: 1299, sale_price: 999 as number | null, cat: '1', brand: 'Lenovo', featured: true, stock: 12 },
  { name_ka: 'ლეპტოპი ASUS VivoBook 14', name_en: 'ASUS VivoBook 14', price: 899, sale_price: null as number | null, cat: '1', brand: 'ASUS', featured: true, stock: 8 },
  { name_ka: 'Mini PC Intel NUC', name_en: 'Intel NUC Mini PC', price: 549, sale_price: 449 as number | null, cat: '1', brand: 'Intel', featured: false, stock: 5 },
  { name_ka: 'მონიტორი Samsung 27" IPS', name_en: 'Samsung 27" IPS Monitor', price: 449, sale_price: 379 as number | null, cat: '2', brand: 'Samsung', featured: true, stock: 15 },
  { name_ka: 'სათამაშო მონიტორი AOC 24" 144Hz', name_en: 'AOC 24" 144Hz Gaming Monitor', price: 329, sale_price: null as number | null, cat: '2', brand: 'AOC', featured: true, stock: 10 },
  { name_ka: 'პორტატული მონიტორი 15.6"', name_en: '15.6" Portable Monitor', price: 249, sale_price: 199 as number | null, cat: '2', brand: 'ASUS', featured: false, stock: 7 },
  { name_ka: 'მექანიკური კლავიატურა Keychron K2', name_en: 'Keychron K2 Mechanical Keyboard', price: 119, sale_price: null as number | null, cat: '3', brand: 'Keychron', featured: true, stock: 20 },
  { name_ka: 'სათამაშო მაუსი Logitech G502', name_en: 'Logitech G502 Gaming Mouse', price: 89, sale_price: 69 as number | null, cat: '3', brand: 'Logitech', featured: true, stock: 25 },
  { name_ka: 'უსადენო კლავიატურა + მაუსი', name_en: 'Wireless Keyboard & Mouse Combo', price: 65, sale_price: null as number | null, cat: '3', brand: 'Microsoft', featured: false, stock: 30 },
  { name_ka: 'მაუსპადი RGB XL', name_en: 'XL RGB Gaming Mouse Pad', price: 35, sale_price: 28 as number | null, cat: '3', brand: 'SteelSeries', featured: false, stock: 50 },
  { name_ka: 'ყურსასმენი Sony WH-1000XM5', name_en: 'Sony WH-1000XM5 Headphones', price: 399, sale_price: 329 as number | null, cat: '4', brand: 'Sony', featured: true, stock: 8 },
  { name_ka: 'სათამაშო ჰედსეტი HyperX Cloud', name_en: 'HyperX Cloud Gaming Headset', price: 129, sale_price: null as number | null, cat: '4', brand: 'HyperX', featured: true, stock: 15 },
  { name_ka: 'Bluetooth დინამიკი JBL Flip 6', name_en: 'JBL Flip 6 Bluetooth Speaker', price: 149, sale_price: 119 as number | null, cat: '4', brand: 'JBL', featured: true, stock: 18 },
  { name_ka: 'USB მიკროფონი Blue Yeti', name_en: 'Blue Yeti USB Microphone', price: 129, sale_price: null as number | null, cat: '4', brand: 'Blue', featured: false, stock: 10 },
  { name_ka: 'SSD Samsung 1TB NVMe', name_en: 'Samsung 1TB NVMe SSD', price: 119, sale_price: 89 as number | null, cat: '5', brand: 'Samsung', featured: true, stock: 35 },
  { name_ka: 'HDD Seagate 2TB', name_en: 'Seagate 2TB HDD', price: 79, sale_price: null as number | null, cat: '5', brand: 'Seagate', featured: false, stock: 25 },
  { name_ka: 'USB ფლეშ დრაივი 128GB', name_en: '128GB USB Flash Drive', price: 25, sale_price: 19 as number | null, cat: '5', brand: 'Kingston', featured: false, stock: 80 },
  { name_ka: 'USB Hub 7-Port 3.0', name_en: '7-Port USB 3.0 Hub', price: 35, sale_price: null as number | null, cat: '6', brand: 'Ugreen', featured: false, stock: 40 },
  { name_ka: 'HDMI კაბელი 2m 4K', name_en: '4K HDMI Cable 2m', price: 15, sale_price: null as number | null, cat: '6', brand: 'Baseus', featured: false, stock: 100 },
  { name_ka: 'USB-C Docking Station 12-in-1', name_en: 'USB-C Docking Station 12-in-1', price: 89, sale_price: 69 as number | null, cat: '6', brand: 'Anker', featured: true, stock: 12 },
  { name_ka: 'WiFi 6 Router TP-Link AX3000', name_en: 'TP-Link AX3000 WiFi 6 Router', price: 129, sale_price: null as number | null, cat: '7', brand: 'TP-Link', featured: true, stock: 10 },
  { name_ka: 'WiFi USB ადაპტერი AC1300', name_en: 'AC1300 WiFi USB Adapter', price: 29, sale_price: 22 as number | null, cat: '7', brand: 'ASUS', featured: false, stock: 30 },
  { name_ka: 'ვიდეო ბარათა NVIDIA RTX 4060', name_en: 'NVIDIA RTX 4060 Graphics Card', price: 699, sale_price: null as number | null, cat: '8', brand: 'NVIDIA', featured: true, stock: 4 },
  { name_ka: 'RAM 16GB DDR5 Kingston', name_en: 'Kingston 16GB DDR5 RAM', price: 89, sale_price: 69 as number | null, cat: '8', brand: 'Kingston', featured: true, stock: 20 },
  { name_ka: 'პროცესორი Intel Core i5-13600K', name_en: 'Intel Core i5-13600K CPU', price: 349, sale_price: 299 as number | null, cat: '8', brand: 'Intel', featured: true, stock: 6 },
];

const CAT_COLORS: Record<string, [string, string]> = {
  '1': ['6366f1', 'ffffff'], '2': ['3b82f6', 'ffffff'], '3': ['7c3aed', 'ffffff'],
  '4': ['f97316', 'ffffff'], '5': ['10b981', 'ffffff'], '6': ['06b6d4', 'ffffff'],
  '7': ['0d9488', 'ffffff'], '8': ['ef4444', 'ffffff'],
};

export const mockProducts: Product[] = productData.map((p, i) => {
  const [bg, fg] = CAT_COLORS[p.cat] || ['6366f1', 'ffffff'];
  const label = encodeURIComponent(p.name_en.split(' ').slice(0, 2).join('+'));
  const imageUrl = `https://placehold.co/400x400/${bg}/${fg}?text=${label}&font=sans`;
  return {
  id: `prod-${i + 1}`,
  sku: `SKU-${1000 + i}`,
  name_ka: p.name_ka,
  name_en: p.name_en,
  description_ka: `${p.name_ka} - მაღალი ხარისხის პროდუქტი`,
  description_en: `${p.name_en} - High quality product`,
  price: p.price,
  sale_price: p.sale_price,
  currency: 'GEL',
  category_id: p.cat,
  brand: p.brand,
  stock_quantity: p.stock,
  is_active: true,
  is_featured: p.featured,
  specifications: {},
  images: [{
    id: `img-${i + 1}`,
    product_id: `prod-${i + 1}`,
    url: imageUrl,
    alt_text: p.name_en,
    sort_order: 0,
    is_primary: true,
  }],
  category: mockCategories.find(c => c.id === p.cat)
    ? { name_ka: mockCategories.find(c => c.id === p.cat)!.name_ka, name_en: mockCategories.find(c => c.id === p.cat)!.name_en }
    : undefined,
  created_at: new Date(Date.now() - i * 86400000).toISOString(),
  updated_at: now,
  };
});

const names = ['გიორგი კახიძე', 'ნინო ბერიძე', 'დავით ჯანელიძე', 'მარიამ ხვედელიძე', 'ალექსი მამალაძე', 'თამარ გოგოლაძე', 'ირაკლი შენგელია', 'ანა ტაბიძე', 'ლევან ნოზაძე', 'სოფო ქურდაძე'];
const phones = ['+995 555 12 34 56', '+995 577 98 76 54', '+995 599 11 22 33', '+995 551 44 55 66', '+995 568 77 88 99', '+995 555 00 11 22', '+995 577 33 44 55', '+995 599 66 77 88', '+995 551 99 00 11', '+995 568 22 33 44'];
const cities = ['თბილისი', 'ბათუმი', 'ქუთაისი', 'თბილისი', 'რუსთავი', 'თბილისი', 'ზუგდიდი', 'თბილისი', 'გორი', 'ბათუმი'];
const addresses = ['რუსთაველის გამზ. 12', 'ჭავჭავაძის ქ. 45', 'გელათის ქ. 8', 'ვაჟა-ფშაველას გამზ. 71', 'მშვიდობის ქ. 3', 'აბაშიძის ქ. 22', 'ზვიად გამსახურდიას ქ. 15', 'თამარ მეფის გამზ. 6', 'სტალინის ქ. 19', 'გორგილაძის ქ. 30'];

export const mockUsers: UserProfile[] = names.map((name, i) => ({
  id: `user-${i + 1}`,
  email: `user${i + 1}@example.com`,
  full_name: name,
  phone: phones[i],
  city: cities[i],
  address: addresses[i],
  preferred_language: (i % 3 === 0 ? 'en' : 'ka') as 'ka' | 'en',
  is_admin: i === 0,
  orders_count: Math.floor(Math.random() * 8),
  created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
  updated_at: now,
}));

const statuses: Array<'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'> = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const payStatuses: Array<'pending' | 'paid' | 'failed'> = ['pending', 'paid', 'paid'];
const methods: Array<'bog_ipay' | 'tbc_checkout' | 'cash_on_delivery'> = ['bog_ipay', 'tbc_checkout', 'cash_on_delivery'];

export const mockOrders: Order[] = Array.from({ length: 15 }, (_, i) => {
  const items = Array.from({ length: 1 + Math.floor(Math.random() * 3) }, (_, j) => {
    const p = mockProducts[Math.floor(Math.random() * mockProducts.length)];
    const qty = 1 + Math.floor(Math.random() * 3);
    return {
      id: `oi-${i}-${j}`,
      order_id: `order-${i + 1}`,
      product_id: p.id,
      product_name: p.name_ka,
      product_sku: p.sku,
      quantity: qty,
      unit_price: p.sale_price ?? p.price,
      total_price: (p.sale_price ?? p.price) * qty,
    };
  });
  const subtotal = items.reduce((s, it) => s + it.total_price, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const user = mockUsers[i % mockUsers.length];

  return {
    id: `order-${i + 1}`,
    order_number: `MQA-${20260401 + i}-${String.fromCharCode(65 + i)}X${i}Z`,
    user_id: user.id,
    status: statuses[i % statuses.length],
    payment_status: payStatuses[i % payStatuses.length],
    payment_method: methods[i % methods.length],
    payment_transaction_id: null,
    subtotal,
    shipping_cost: shipping,
    total: subtotal + shipping,
    currency: 'GEL',
    customer_name: user.full_name || 'Unknown',
    customer_phone: user.phone || '',
    customer_email: user.email || null,
    delivery_city: i % 2 === 0 ? 'თბილისი' : 'ბათუმი',
    delivery_address: `ჭავჭავაძის გამზირი ${10 + i}`,
    delivery_postal_code: `010${i}`,
    delivery_method: (i % 3 === 0 ? 'express' : 'standard') as 'standard' | 'express',
    notes: null,
    items,
    created_at: new Date(Date.now() - i * 86400000).toISOString(),
    updated_at: now,
  };
});

export const mockStats = {
  total_users: mockUsers.length,
  total_orders: mockOrders.length,
  total_revenue: mockOrders.filter(o => o.payment_status === 'paid').reduce((s, o) => s + o.total, 0),
  total_products: mockProducts.length,
  pending_orders: mockOrders.filter(o => o.status === 'pending').length,
  low_stock_products: mockProducts.filter(p => p.stock_quantity < 10).length,
};
