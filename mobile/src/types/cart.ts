export interface CartItem {
  productId: string;
  nameKa: string;
  nameEn: string;
  price: number;
  salePrice: number | null;
  quantity: number;
  imageUrl: string | null;
}
