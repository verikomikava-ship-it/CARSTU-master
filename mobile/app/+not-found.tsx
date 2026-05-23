import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui';
import { Colors, Spacing, FontSize } from '@/constants/theme';

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.text}>Page not found</Text>
      <Button title="Go Home" onPress={() => router.replace('/')} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.xxl,
  },
  code: {
    fontSize: 64,
    fontWeight: '700',
    color: Colors.primary,
  },
  text: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    marginTop: Spacing.sm,
  },
  btn: {
    marginTop: Spacing.xxl,
  },
});
