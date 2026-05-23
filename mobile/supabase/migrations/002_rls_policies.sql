-- Row Level Security Policies

-- Products & categories: public read
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (is_active = true);

CREATE POLICY "Product images are viewable by everyone"
  ON product_images FOR SELECT USING (true);

-- Profiles: users manage their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses: users manage their own
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own addresses"
  ON addresses FOR ALL USING (auth.uid() = user_id);

-- Orders: users can view their own, insert new ones
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: visible if user owns the order
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

CREATE POLICY "Users can create order items"
  ON order_items FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );
