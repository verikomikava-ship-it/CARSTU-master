import { supabase, isMockMode } from '@/lib/supabase';
import { Order, PaymentMethod } from '@/types/order';
import { CartItem } from '@/types/cart';

interface CreateOrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryCity: string;
  deliveryAddress: string;
  deliveryPostalCode?: string;
  notes?: string;
  paymentMethod: PaymentMethod;
  items: CartItem[];
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  if (isMockMode) {
    const subtotal = input.items.reduce(
      (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity, 0
    );
    const shippingCost = subtotal > 100 ? 0 : 10;
    const orderNumber = `MQA-DEMO-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    return {
      id: `demo-${Date.now()}`,
      order_number: orderNumber,
      user_id: 'demo-user',
      status: 'pending',
      payment_status: 'pending',
      payment_method: input.paymentMethod,
      payment_transaction_id: null,
      subtotal,
      shipping_cost: shippingCost,
      total: subtotal + shippingCost,
      currency: 'GEL',
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_email: null,
      delivery_city: input.deliveryCity,
      delivery_address: input.deliveryAddress,
      delivery_postal_code: null,
      notes: input.notes || null,
      items: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const subtotal = input.items.reduce(
    (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + shippingCost;

  const orderNumber = `MQA-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: user.id,
      status: 'pending',
      payment_status: 'pending',
      payment_method: input.paymentMethod,
      subtotal,
      shipping_cost: shippingCost,
      total,
      customer_name: input.customerName,
      customer_phone: input.customerPhone,
      customer_email: input.customerEmail,
      delivery_city: input.deliveryCity,
      delivery_address: input.deliveryAddress,
      delivery_postal_code: input.deliveryPostalCode,
      notes: input.notes,
    })
    .select()
    .single();

  if (orderError) throw orderError;

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.nameKa,
    quantity: item.quantity,
    unit_price: item.salePrice ?? item.price,
    total_price: (item.salePrice ?? item.price) * item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return { ...order, items: orderItems } as Order;
}

export async function getOrders(): Promise<Order[]> {
  if (isMockMode) return [];

  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getOrderById(id: string): Promise<Order | null> {
  if (isMockMode) return null;

  const { data, error } = await supabase
    .from('orders')
    .select('*, items:order_items(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}
