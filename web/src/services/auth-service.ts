import { supabase, isMockMode } from '@/lib/supabase';

export async function signIn(email: string, password: string) {
  if (isMockMode) {
    return {
      user: { id: 'demo', email, user_metadata: { full_name: 'Demo User' } },
      session: { access_token: 'demo-token' },
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signUp(email: string, password: string, fullName: string, phone: string, city: string, address: string) {
  if (isMockMode) {
    return {
      user: { id: 'demo', email, user_metadata: { full_name: fullName, phone, city, address } },
      session: null,
    };
  }

  // Check if phone number is already registered
  const { data: existingPhone } = await supabase
    .from('profiles')
    .select('id')
    .eq('phone', phone)
    .maybeSingle();

  if (existingPhone) {
    throw new Error('This phone number has already been registered');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, phone, city, address },
    },
  });
  if (error) throw error;

  // Supabase returns a fake user with empty identities when email already exists
  if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
    throw new Error('This email has already been registered');
  }

  return data;
}

export async function signOut() {
  if (isMockMode) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  if (isMockMode) return;

  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
}
