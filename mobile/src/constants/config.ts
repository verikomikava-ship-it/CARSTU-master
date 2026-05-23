export const Config = {
  SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  APP_NAME: 'ManqanaAccessory',
  CURRENCY: 'GEL',
  CURRENCY_SYMBOL: '₾',
  DEFAULT_LANGUAGE: 'ka' as const,
  ITEMS_PER_PAGE: 20,
};
