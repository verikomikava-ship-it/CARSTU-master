import { supabase, isMockMode } from '@/lib/supabase';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types/product';

interface ProductFilters {
  categoryId?: string;
  categoryIds?: string[];
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'newest';
  limit?: number;
  offset?: number;
}

function filterMockProducts(filters: ProductFilters): Product[] {
  let result = [...mockProducts];

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    result = result.filter((p) => filters.categoryIds!.includes(p.category_id));
  } else if (filters.categoryId) {
    result = result.filter((p) => p.category_id === filters.categoryId);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name_ka.toLowerCase().includes(q) ||
        p.name_en.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q))
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice!);
  }
  if (filters.brand) {
    result = result.filter((p) => p.brand === filters.brand);
  }

  switch (filters.sortBy) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'name':
      result.sort((a, b) => a.name_en.localeCompare(b.name_en));
      break;
    default:
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  const offset = filters.offset || 0;
  const limit = filters.limit || 20;
  return result.slice(offset, offset + limit);
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  if (isMockMode) return filterMockProducts(filters);

  let query = supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('is_active', true);

  if (filters.categoryIds && filters.categoryIds.length > 0) {
    query = query.in('category_id', filters.categoryIds);
  } else if (filters.categoryId) {
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
  if (isMockMode) return mockProducts.find((p) => p.id === id) || null;

  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function getFeaturedProducts(limit = 10): Promise<Product[]> {
  if (isMockMode) return mockProducts.filter((p) => p.is_featured).slice(0, limit);

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
  if (isMockMode) {
    return [...mockProducts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  const { data, error } = await supabase
    .from('products')
    .select('*, images:product_images(*)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}
