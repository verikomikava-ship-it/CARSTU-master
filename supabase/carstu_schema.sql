-- ============================================
-- CARSTU DATABASE SCHEMA (Complete)
-- Run this once in Supabase SQL Editor
-- ============================================

-- Drop existing tables if they exist (safe to re-run)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TYPE IF EXISTS order_status CASCADE;
DROP TYPE IF EXISTS payment_status CASCADE;
DROP TYPE IF EXISTS delivery_method CASCADE;
DROP FUNCTION IF EXISTS handle_new_user() CASCADE;

-- ============================================
-- CATEGORIES
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name_ka TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ka TEXT,
  description_en TEXT,
  icon TEXT,
  image_url TEXT,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active) WHERE is_active = true;

-- ============================================
-- PRODUCTS
-- ============================================
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE,
  name_ka TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ka TEXT,
  description_en TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  currency TEXT DEFAULT 'GEL',
  category_id UUID NOT NULL REFERENCES categories(id),
  brand TEXT,
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  specifications JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_featured ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_products_price ON products(price);

-- ============================================
-- PRODUCT IMAGES
-- ============================================
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false
);

CREATE INDEX idx_product_images_product ON product_images(product_id);

-- ============================================
-- USER PROFILES
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  address TEXT,
  preferred_language TEXT DEFAULT 'ka' CHECK (preferred_language IN ('ka', 'en')),
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone, city, address)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    new.raw_user_meta_data->>'address'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- ORDERS
-- ============================================
CREATE TYPE order_status AS ENUM (
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'
);

CREATE TYPE payment_status AS ENUM (
  'pending', 'paid', 'failed', 'refunded'
);

CREATE TYPE delivery_method AS ENUM ('standard', 'express');

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES profiles(id),
  status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  payment_method TEXT,
  payment_transaction_id TEXT,
  delivery_method delivery_method DEFAULT 'standard',
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GEL',
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  delivery_city TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  delivery_postal_code TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_delivery ON orders(delivery_method);

-- ============================================
-- ORDER ITEMS
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name TEXT NOT NULL,
  product_sku TEXT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL
);

CREATE INDEX idx_order_items_order ON order_items(order_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products & categories: public read
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (is_active = true);

CREATE POLICY "Product images are viewable by everyone"
  ON product_images FOR SELECT USING (true);

-- Profiles: users manage their own
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Orders: users can view their own, insert new ones
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: visible if user owns the order
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Admin policies: admins can do everything
CREATE POLICY "Admins can manage products"
  ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can manage product images"
  ON product_images FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true)
  );

-- ============================================
-- SEED: CATEGORIES (matching web app)
-- ============================================
INSERT INTO categories (id, slug, name_ka, name_en, icon, sort_order) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'tech-gadgets', 'ტექნოლოგია და გაჯეტები', 'Tech & Gadgets', '📱', 1),
  ('c0000001-0000-0000-0000-000000000002', 'cleaning-care', 'სისუფთავე და მოვლა', 'Cleaning & Care', '🧹', 2),
  ('c0000001-0000-0000-0000-000000000003', 'organization', 'ორგანიზაცია და სივრცე', 'Organization & Space', '📦', 3),
  ('c0000001-0000-0000-0000-000000000004', 'comfort', 'კომფორტი', 'Comfort', '😌', 4),
  ('c0000001-0000-0000-0000-000000000005', 'interior-style', 'ინტერიერის დიზაინი', 'Interior Style', '✨', 5),
  ('c0000001-0000-0000-0000-000000000006', 'safety-emergency', 'უსაფრთხოება', 'Safety & Emergency', '🛠️', 6),
  ('c0000001-0000-0000-0000-000000000007', 'daily-essentials', 'ყოველდღიური Must-Have', 'Daily Essentials', '🧰', 7);

-- ============================================
-- SEED: PRODUCTS
-- ============================================
INSERT INTO products (sku, name_ka, name_en, description_ka, description_en, price, sale_price, category_id, brand, stock_quantity, is_featured) VALUES
  -- Tech & Gadgets
  ('TECH-001', 'ტელეფონის მაგნიტური დამჭერი', 'Magnetic Phone Holder', 'მაგნიტური სამაგრი მანქანის ვენტილაციაში', 'Magnetic mount for car air vent', 25.00, 19.00, 'c0000001-0000-0000-0000-000000000001', 'AutoFix', 50, true),
  ('TECH-002', 'USB-C სწრაფი დამტენი', 'USB-C Fast Charger', '65W სწრაფი დატენვა', '65W fast charging', 35.00, NULL, 'c0000001-0000-0000-0000-000000000001', 'Baseus', 30, true),
  ('TECH-003', 'Bluetooth FM ტრანსმიტერი', 'Bluetooth FM Transmitter', 'მუსიკა ტელეფონიდან მაგნიტოლაში', 'Music from phone to stereo', 29.00, 22.00, 'c0000001-0000-0000-0000-000000000001', 'Xiaomi', 40, true),
  ('TECH-004', 'ვიდეორეგისტრატორი 1080P', 'Dash Camera 1080P', 'Full HD ვიდეო ჩამწერი', 'Full HD video recorder', 89.00, 69.00, 'c0000001-0000-0000-0000-000000000001', 'Xiaomi', 20, true),

  -- Cleaning & Care
  ('CLEAN-001', 'მანქანის მტვერსასრუტი', 'Car Vacuum Cleaner', 'პორტატული უსადენო მტვერსასრუტი', 'Portable cordless vacuum', 55.00, NULL, 'c0000001-0000-0000-0000-000000000002', 'Baseus', 25, false),
  ('CLEAN-002', 'მიკროფიბრის ნაკრები (5ც)', 'Microfiber Cloth Set', '5ც პრემიუმ ხარისხის ტილო', '5-piece premium quality cloths', 15.00, 12.00, 'c0000001-0000-0000-0000-000000000002', 'Meguiar''s', 100, false),
  ('CLEAN-003', 'საწმენდი გელი', 'Cleaning Gel', 'ყოველგვარი ზედაპირისთვის', 'For all surfaces', 10.00, NULL, 'c0000001-0000-0000-0000-000000000002', 'Chemical Guys', 60, false),

  -- Organization
  ('ORG-001', 'საბარგულის ორგანიზატორი', 'Trunk Organizer', 'დასაკეცი, ტევადი', 'Foldable, spacious', 45.00, 35.00, 'c0000001-0000-0000-0000-000000000003', 'AutoFix', 35, true),
  ('ORG-002', 'სავარძლის უკანა ჯიბე', 'Seat Back Pocket', 'მრავალფუნქციური ჯიბე', 'Multi-functional pocket', 18.00, NULL, 'c0000001-0000-0000-0000-000000000003', 'Generic', 80, false),
  ('ORG-003', 'სავარძლის ნაპრალის შემავსებელი', 'Seat Gap Filler', 'ხელი არ აღარაფერი ჩამოვარდეს', 'Nothing falls between seats', 12.00, NULL, 'c0000001-0000-0000-0000-000000000003', 'Generic', 70, false),

  -- Comfort
  ('COMF-001', 'საჭის ტყავის საფარი', 'Leather Steering Cover', 'პრემიუმ ტყავი', 'Premium leather', 30.00, NULL, 'c0000001-0000-0000-0000-000000000004', 'Michelin', 45, false),
  ('COMF-002', 'სავარძლის ორთოპედიული ბალიში', 'Orthopedic Seat Cushion', 'ზურგის ტკივილის შემცირება', 'Reduces back pain', 40.00, 32.00, 'c0000001-0000-0000-0000-000000000004', 'Generic', 30, false),
  ('COMF-003', 'მზის დამცავი (2ც)', 'Sunshade (2pc)', 'UV დაცვა', 'UV protection', 20.00, NULL, 'c0000001-0000-0000-0000-000000000004', 'Generic', 55, false),

  -- Interior Style
  ('INT-001', 'LED ინტერიერის განათება', 'LED Interior Lights', 'RGB 16 ფერი', 'RGB 16 colors', 25.00, 18.00, 'c0000001-0000-0000-0000-000000000005', 'Philips', 60, true),
  ('INT-002', 'არომატიზატორი', 'Air Freshener', 'გრძელვადიანი სურნელი', 'Long-lasting fragrance', 8.00, NULL, 'c0000001-0000-0000-0000-000000000005', 'Little Trees', 150, false),

  -- Safety
  ('SAFE-001', 'საგანგებო ჩაქუჩი', 'Emergency Hammer', '2-ში 1: ჩაქუჩი + ღვედის საჭრელი', '2-in-1 hammer + seatbelt cutter', 12.00, NULL, 'c0000001-0000-0000-0000-000000000006', 'Generic', 100, false),
  ('SAFE-002', 'საბურავის კომპრესორი', 'Tire Compressor', 'ციფრული ტაბლო', 'Digital display', 45.00, 35.00, 'c0000001-0000-0000-0000-000000000006', 'Xiaomi', 25, true),
  ('SAFE-003', 'Jump Starter 12V', 'Jump Starter 12V', 'სტარტერი + powerbank', 'Starter + powerbank', 95.00, 75.00, 'c0000001-0000-0000-0000-000000000006', 'NOCO', 15, true),

  -- Daily Essentials
  ('DAILY-001', 'დამტენის კაბელი 3-ში 1', '3-in-1 Charging Cable', 'Type-C, Lightning, Micro-USB', 'Type-C, Lightning, Micro-USB', 10.00, 7.00, 'c0000001-0000-0000-0000-000000000007', 'Baseus', 120, false),
  ('DAILY-002', 'სველი ხელსახოცები', 'Wet Wipes', '80ც ანტიბაქტერიული', '80pc antibacterial', 6.00, NULL, 'c0000001-0000-0000-0000-000000000007', 'Generic', 200, false),
  ('DAILY-003', 'LED ფანარი', 'LED Flashlight', 'მაღალი სიმძლავრის LED', 'High-power LED', 15.00, NULL, 'c0000001-0000-0000-0000-000000000007', 'Fenix', 60, false);

-- ============================================
-- SEED: PRODUCT IMAGES
-- ============================================
INSERT INTO product_images (product_id, url, is_primary)
SELECT id, 'https://picsum.photos/seed/' || sku || '/400/400', true FROM products;
