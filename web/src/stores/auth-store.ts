import { create } from 'zustand';
import { Session, User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  session: null,
  isLoading: true,
  setSession: (session) =>
    set({
      session,
      user: session?.user ?? null,
      isLoading: false,
    }),
  setLoading: (isLoading) => set({ isLoading }),
}));
