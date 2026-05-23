export const Colors = {
  // Based on Figma design - blue accent theme
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  primaryDark: '#1d4ed8',
  primaryForeground: '#ffffff',
  secondary: '#f1f5f9',
  secondaryForeground: '#0f172a',
  accent: '#f0f9ff',
  accentForeground: '#0c4a6e',
  background: '#fafafa',
  surface: '#ffffff',
  card: '#ffffff',
  text: '#0a0a0a',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  textLight: '#ffffff',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  inputBackground: '#f8fafc',
  success: '#10b981',
  successLight: '#d1fae5',
  error: '#ef4444',
  errorLight: '#fee2e2',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  disabled: '#cbd5e1',
  overlay: 'rgba(0,0,0,0.5)',
  cartBadge: '#ef4444',
  star: '#f59e0b',
  // Dark mode colors
  dark: {
    background: '#0a0a0a',
    foreground: '#fafafa',
    card: '#171717',
    cardForeground: '#fafafa',
    primary: '#3b82f6',
    secondary: '#27272a',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    border: '#27272a',
    accent: '#1e3a8a',
    accentForeground: '#dbeafe',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FontFamily = {
  regular: 'Inter-Regular',
  bold: 'Inter-Bold',
  georgianRegular: 'NotoSansGeorgian-Regular',
  georgianBold: 'NotoSansGeorgian-Bold',
};

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
};
