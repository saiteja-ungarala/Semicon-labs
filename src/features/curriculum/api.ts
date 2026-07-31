import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

// ---------------------------------------------------------------- types

export type ToolVendor = 'CADENCE' | 'SYNOPSYS' | 'SIEMENS';
export type LabType = 'GOLDEN' | 'BUGGY' | 'EXERCISE' | 'GUIDED' | 'CHALLENGE';
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface SkillSummary {
  id: string;
  slug: string;
  name: string;
  summary: string;
  order: number;
  toolVendor: ToolVendor | null;
  difficulty: Difficulty | null;
  stats: { modules: number; testcases: number; durationMin: number };
}

export interface DomainSummary {
  id: string;
  slug: string;
  code: string;
  name: string;
  pipeline: string;
  tagline: string;
  description: string;
  comingSoon: boolean;
  order: number;
  stats: { skills: number; modules: number; testcases: number };
  skills: SkillSummary[];
}

export interface SkillModule {
  id: string;
  slug: string;
  externalId: string | null;
  title: string;
  subtitle: string | null;
  description: string;
  thumbnailUrl: string | null;
  difficulty: Difficulty;
  level: 'BEGINNER' | 'SPECIALIST' | 'EXPERT';
  toolVendor: ToolVendor | null;
  durationMin: number;
  priceMinor: number;
  discountMinor: number;
  currency: string;
  ratingAvg: number;
  ratingCount: number;
  testcaseCount: number;
  labMix: Partial<Record<LabType, number>>;
}

export interface SkillDetail {
  domain: { slug: string; name: string; code: string };
  skill: SkillSummary & { modules: SkillModule[] };
}

export interface Testcase {
  slug: string;
  externalId: string | null;
  title: string;
  scenario: string;
  labType: LabType;
  level: 'BEGINNER' | 'SPECIALIST' | 'EXPERT';
  difficulty: Difficulty;
  toolVendor: ToolVendor | null;
  verifiable: boolean;
  estimatedMin: number;
  order: number;
}

export interface ModuleTestcases {
  module: { id: string; slug: string; title: string; toolVendor: ToolVendor | null };
  testcases: Testcase[];
}

// ---------------------------------------------------------------- hooks

export function useDomains() {
  return useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      const { data } = await api.get<{ data: DomainSummary[] }>('/domains');
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useDomain(slug: string | undefined) {
  return useQuery({
    enabled: Boolean(slug),
    queryKey: ['domain', slug],
    queryFn: async () => {
      const { data } = await api.get<{ data: DomainSummary }>(`/domains/${slug}`);
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSkill(domainSlug: string | undefined, skillSlug: string | undefined) {
  return useQuery({
    enabled: Boolean(domainSlug && skillSlug),
    queryKey: ['skill', domainSlug, skillSlug],
    queryFn: async () => {
      const { data } = await api.get<{ data: SkillDetail }>(`/domains/${domainSlug}/skills/${skillSlug}`);
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useModuleTestcases(moduleSlug: string | undefined) {
  return useQuery({
    enabled: Boolean(moduleSlug),
    queryKey: ['module-testcases', moduleSlug],
    queryFn: async () => {
      const { data } = await api.get<{ data: ModuleTestcases }>(`/modules/${moduleSlug}/testcases`);
      return data.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// ---------------------------------------------------------------- labels

export const TOOL_LABEL: Record<ToolVendor, string> = {
  CADENCE: 'Cadence',
  SYNOPSYS: 'Synopsys',
  SIEMENS: 'Siemens Calibre',
};

export const LAB_TYPE_LABEL: Record<LabType, string> = {
  GOLDEN: 'Golden',
  BUGGY: 'Buggy',
  EXERCISE: 'Exercise',
  GUIDED: 'Guided',
  CHALLENGE: 'Challenge',
};

export const LAB_TYPE_HELP: Record<LabType, string> = {
  GOLDEN: 'A working reference implementation to study.',
  BUGGY: 'A broken design — find the fault and fix it.',
  EXERCISE: 'An open task that applies the concept.',
  GUIDED: 'Step-by-step lab with hints and checkpoints.',
  CHALLENGE: 'Independent lab — minimal guidance, real stakes.',
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  ADVANCED: 'Advanced',
};

export function formatDuration(min: number): string {
  if (!min) return '—';
  if (min < 60) return `${min}m`;
  const h = min / 60;
  return Number.isInteger(h) ? `${h}h` : `${h.toFixed(1)}h`;
}

export function formatPrice(priceMinor: number, discountMinor: number, currency = 'INR'): { now: string; was?: string } {
  const fmt = (minor: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(minor / 100);
  // Clamp like lib/money's netPriceMinor so an over-discount can't go negative.
  const net = Math.max(0, priceMinor - discountMinor);
  if (discountMinor > 0) return { now: fmt(net), was: fmt(priceMinor) };
  return { now: fmt(priceMinor) };
}
