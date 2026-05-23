-- ============================================
-- FIX: RLS Infinite Recursion
-- ============================================

-- Drop problematic admin policies
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage product images" ON product_images;
DROP POLICY IF EXISTS "Admins can view all orders" ON orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON orders;
DROP POLICY IF EXISTS "Admins can view all order items" ON order_items;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- Create SECURITY DEFINER function that bypasses RLS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND is_admin = true
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Recreate admin policies using the function (no recursion)
CREATE POLICY "Admins can manage products"
  ON products FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage product images"
  ON product_images FOR ALL USING (is_admin());

CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT USING (is_admin());

CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE USING (is_admin());

CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT USING (is_admin());
