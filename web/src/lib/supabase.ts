import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Config } from '@/constants/config';

export const isMockMode = !Config.SUPABASE_URL || Config.SUPABASE_URL === '';

let _supabase: SupabaseClient | null = null;

export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      _supabase = createClient(
        Config.SUPABASE_URL || 'https://placeholder.supabase.co',
        Config.SUPABASE_ANON_KEY || 'placeholder',
        {
          auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
          },
        }
      );
    }
    const value = (_supabase as any)[prop];
    if (typeof value === 'function') {
      return value.bind(_supabase);
    }
    return value;
  },
});
