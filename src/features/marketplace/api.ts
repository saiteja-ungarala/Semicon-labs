import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { loadCatalog, requireEntry } from '@/data/catalog';

/**
 * Marketplace data comes from the frozen catalog snapshot, not the API — see
 * src/data/catalog.ts. Buying still needs a backend: the checkout call in
 * features/checkout/api.ts is the integration point.
 */

export interface CompetencyRef {
  name: string;
  slug: string;
  summary?: string;
}

export interface ModuleCard {
  id: string;
  slug: string;
  externalId?: string | null;
  title: string;
  subtitle: string | null;
  thumbnailUrl: string | null;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  level: 'BEGINNER' | 'SPECIALIST' | 'EXPERT';
  toolVendor?: 'CADENCE' | 'SYNOPSYS' | 'SIEMENS' | null;
  durationMin: number;
  priceMinor: number;
  discountMinor: number;
  currency: string;
  ratingAvg: number;
  ratingCount: number;
  domain: { slug: string; name: string; code: string };
  skill?: { slug: string; name: string } | null;
  competencies: CompetencyRef[];
  testcaseCount?: number;
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
  labMix?: Partial<Record<'GOLDEN' | 'BUGGY' | 'EXERCISE' | 'GUIDED' | 'CHALLENGE', number>>;
  _count?: { challenges: number };
}

export interface ModuleFilters {
  domain?: string;
  skill?: string;
  tool?: 'CADENCE' | 'SYNOPSYS' | 'SIEMENS';
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

/**
 * Client-side reimplementation of the server's list query. Filters mirror
 * listModules() in the API (case-insensitive contains across title/subtitle/
 * description); ordering replays the server's own per-sort slug order, which
 * was captured rather than recomputed because "newest" sorts on publishedAt —
 * a field the card payload never carried.
 */
function listFromSnapshot(
  snapshot: Awaited<ReturnType<typeof loadCatalog>>,
  filters: ModuleFilters,
): ListResponse {
  const all = snapshot.modulesList.items as unknown as ModuleCard[];
  const detail = snapshot.moduleBySlug as Record<string, ModuleDetail | undefined>;
  const q = filters.q?.trim().toLowerCase();

  let items = all.filter((m) => {
    if (filters.domain && m.domain?.slug !== filters.domain) return false;
    if (filters.skill && m.skill?.slug !== filters.skill) return false;
    if (filters.tool && m.toolVendor !== filters.tool) return false;
    if (filters.difficulty && m.difficulty !== filters.difficulty) return false;
    if (filters.level && m.level !== filters.level) return false;
    if (q) {
      const haystack = [m.title, m.subtitle, detail[m.slug]?.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const order = snapshot.orderBySort[filters.sort ?? 'popular'];
  if (order) {
    const rank = new Map(order.map((slug, i) => [slug, i]));
    items = [...items].sort((a, b) => (rank.get(a.slug) ?? 0) - (rank.get(b.slug) ?? 0));
  }

  const page = Math.max(1, filters.page ?? 1);
  const limit = Math.min(60, Math.max(1, filters.limit ?? 12));
  const total = items.length;
  return {
    items: items.slice((page - 1) * limit, page * limit),
    pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
  };
}

export function useModules(filters: ModuleFilters) {
  return useQuery({
    queryKey: ['modules', filters],
    queryFn: async () => listFromSnapshot(await loadCatalog(), filters),
    placeholderData: keepPreviousData,
  });
}

export function useModule(slug: string | undefined) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: ['module', slug],
    queryFn: async () => {
      const { moduleBySlug } = await loadCatalog();
      return requireEntry(moduleBySlug[slug!], `Module "${slug}"`) as ModuleDetail;
    },
  });
}
