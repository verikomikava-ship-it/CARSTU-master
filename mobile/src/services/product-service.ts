import { supabase } from '@/lib/supabase';
import { Product } from '@/types/product';

interface ProductFilters {
  categoryId?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest';
  limit?: number;
  offset?: number;
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('is_active', true);

  if (filters.categoryId) {
    query = query.eq('category_id', filters.categoryId);
  }

  if (filters.search) {
    query = query.or(
      `name_ka.ilike.%${filters.search}%,name_en.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`
    );
  }

  if (filters.minPrice !== undefined) {
    query = query.gte('price', filters.minPrice);
  }
  if (filters.maxPrice !== undefined) {
    query = query.lte('price', filters.maxPrice);
  }
  if (filters.brand) {
    query = query.eq('brand', filters.brand);
  }

  switch (filters.sortBy) {
    case 'price_asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price_desc':
      query = query.order('price', { ascending: false });
      break;
    case 'name':
      query = query.order('name_en');
      break;
    case 'newest':
      query = query.order('created_at', { ascending: false });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getFeaturedProducts(limit = 10): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('is_active', true)
    .eq('is_featured', true)
    .limit(limit);

  if (error) throw error;
  return data || [];
}

export async function getNewProducts(limit = 10): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
