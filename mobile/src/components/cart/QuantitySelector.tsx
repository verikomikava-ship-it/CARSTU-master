import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, BorderRadius, FontSize } from '@/constants/theme';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ quantity, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.btn, quantity <= min && styles.btnDisabled]}
        onPress={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
      >
        <Text style={[styles.btnText, quantity <= min && styles.btnTextDisabled]}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantity}>{quantity}</Text>
      <TouchableOpacity
        style={[styles.btn, quantity >= max && styles.btnDisabled]}
        onPress={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        <Text style={[styles.btnText, quantity >= max && styles.btnTextDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  btn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.borderLight,
  },
  btnDisabled: {
    opacity: 0.4,
  },
  btnText: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  btnTextDisabled: {
    color: Colors.disabled,
  },
  quantity: {
    width: 36,
    textAlign: 'center',
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
});
