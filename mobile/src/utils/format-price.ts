export function formatPrice(price: number, currency = '₾'): string {
  return `${price.toFixed(2)} ${currency}`;
}

export function getEffectivePrice(price: number, salePrice: number | null): number {
  return salePrice ?? price;
}
