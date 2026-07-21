import { api } from '@/lib/api';
import type { EasebuzzResponse } from './easebuzz';

export interface CheckoutOrder {
  orderId: string;
  txnid: string;
  amountMinor: number;
  currency: string;
  mode: 'easebuzz' | 'dev';
  accessKey: string | null;
  merchantKey: string | null;
  easebuzzEnv: 'test' | 'prod';
  items: { slug: string; title: string }[];
}

export async function createOrder(input: {
  moduleSlugs: string[];
  couponCode?: string;
  phone?: string;
}) {
  const { data } = await api.post<{ data: CheckoutOrder }>('/checkout/order', input);
  return data.data;
}

/** Post the full Easebuzz response back for server-side hash verification. */
export async function verifyPayment(response: EasebuzzResponse) {
  const { data } = await api.post<{ data: { orderNumber: string } }>('/checkout/verify', response);
  return data.data;
}

export async function confirmDevPayment(orderId: string) {
  const { data } = await api.post<{ data: { orderNumber: string } }>('/checkout/confirm-dev', { orderId });
  return data.data;
}
