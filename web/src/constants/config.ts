export const Config = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  APP_NAME: 'Carstu',
  APP_URL: 'carstu.com',
  CURRENCY: 'GEL',
  CURRENCY_SYMBOL: '₾',
  DEFAULT_LANGUAGE: 'ka' as const,
  ITEMS_PER_PAGE: 20,
};
