import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useAuthStore, type AuthUser } from '@/stores/auth';

export interface Purchase {
  id: string;
  grantedAt: string;
  pricePaidMinor: number;
  currency: string;
  module: {
    slug: string;
    title: string;
    subtitle: string | null;
    thumbnailUrl: string | null;
    durationMin: number;
    level: string;
    domain: { name: string; code: string };
  };
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  totalMinor: number;
  currency: string;
  createdAt: string;
  items: { id: string; titleSnapshot: string }[];
  invoice: { invoiceNumber: string } | null;
}

export function usePurchases() {
  return useQuery({
    queryKey: ['purchases'],
    queryFn: async () => {
      const { data } = await api.get<{ data: Purchase[] }>('/me/purchases');
      return data.data;
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await api.get<{ data: OrderSummary[] }>('/me/orders');
      return data.data;
    },
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: async (input: {
      firstName?: string;
      lastName?: string;
      headline?: string;
      country?: string;
    }) => {
      const { data } = await api.patch<{ user: AuthUser }>('/me', input);
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user);
      void queryClient.invalidateQueries({ queryKey: ['me'] });
    },
  });
}
