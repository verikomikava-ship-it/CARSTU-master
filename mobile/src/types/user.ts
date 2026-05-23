export interface UserProfile {
  id: string;
  full_name: string | null;
  phone: string | null;
  preferred_language: 'ka' | 'en';
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  user_id: string;
  label: string | null;
  city: string;
  address_line: string;
  postal_code: string | null;
  is_default: boolean;
  created_at: string;
}
