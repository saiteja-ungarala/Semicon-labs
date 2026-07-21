import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export interface CompetencyRef {
  name: string;
  slug: string;
  summary?: string;
}

export interface ModuleCard {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  thumbnailUrl: string | null;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  level: 'BEGINNER' | 'SPECIALIST' | 'EXPERT';
  durationMin: number;
  priceMinor: number;
  discountMinor: number;
  currency: string;
  ratingAvg: number;
  ratingCount: number;
  domain: { slug: string; name: string; code: string };
  competencies: CompetencyRef[];
}

export interface ModuleDetail extends ModuleCard {
  description: string;
  instructor: { firstName: string | null; lastName: string | null; avatarUrl: string | null; headline: string | null } | null;
  reviews: {
    id: string;
    rating: number;
    title: string | null;
    body: string | null;
    createdAt: string;
    user: { firstName: string | null; lastName: string | null; avatarUrl: string | null };
  }[];
  owned: boolean;
  _count?: { challenges: number };
}

export interface ModuleFilters {
  domain?: string;
  q?: string;
  difficulty?: ModuleCard['difficulty'];
  level?: ModuleCard['level'];
  sort?: 'popular' | 'newest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}

interface ListResponse {
  items: ModuleCard[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export function useModules(filters: ModuleFilters) {
  return useQuery({
    queryKey: ['modules', filters],
    queryFn: async () => {
      const { data } = await api.get<ListResponse>('/modules', { params: filters });
      return data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useModule(slug: string | undefined) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: ['module', slug],
    queryFn: async () => {
      const { data } = await api.get<{ data: ModuleDetail }>(`/modules/${slug}`);
      return data.data;
    },
  });
}
