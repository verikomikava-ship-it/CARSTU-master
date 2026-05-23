import { Stack } from 'expo-router';
import { Colors, FontSize } from '@/constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.surface },
        headerTitleStyle: { fontWeight: '700', fontSize: FontSize.lg, color: Colors.text },
        headerTintColor: Colors.primary,
      }}
    />
  );
}
