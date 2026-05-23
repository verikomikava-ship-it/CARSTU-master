import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { useLanguageStore } from '@/stores/language-store';
import '@/i18n';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const setSession = useAuthStore((s) => s.setSession);
  const language = useLanguageStore((s) => s.language);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    SplashScreen.hideAsync();

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" options={{ presentation: 'modal' }} />
        <Stack.Screen name="product/[id]" options={{ headerShown: true, headerTitle: '' }} />
        <Stack.Screen name="category/[id]" options={{ headerShown: true, headerTitle: '' }} />
        <Stack.Screen name="search" options={{ presentation: 'modal' }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
        <Stack.Screen name="orders" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
