import { Stack } from 'expo-router';
import { Colors, FontSize } from '@/constants/theme';

export default function CheckoutLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: { fontWeight: '600', fontSize: FontSize.lg, color: Colors.text },
        headerTintColor: Colors.primary,
        headerShadowVisible: false,
      }}
    />
  );
}
