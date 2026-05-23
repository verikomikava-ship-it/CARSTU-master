import { supabase, isMockMode } from '@/lib/supabase';
import { mockCategories } from '@/lib/mock-data';
import { Category } from '@/types/category';

export async function getCategories(): Promise<Category[]> {
  if (isMockMode) return mockCategories;

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .is('parent_id', null)
    .order('sort_order');

  if (error) throw error;
  return data || [];
}

export async function getSubcategories(parentId: string): Promise<Category[]> {
  if (isMockMode) return [];

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', parentId)
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isMockMode) return mockCategories.find((c) => c.slug === slug) || null;

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

export async function getCategoryById(id: string): Promise<Category | null> {
  if (isMockMode) return mockCategories.find((c) => c.id === id || c.slug === id) || null;

  // If it doesn't look like a UUID, try slug first
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  if (!isUUID) {
    return getCategoryBySlug(id);
  }

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
