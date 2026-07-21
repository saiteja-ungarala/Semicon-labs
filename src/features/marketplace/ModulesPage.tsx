import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { breadcrumbSchema } from '@/lib/seo';
import { cn } from '@/lib/cn';
import { useModules, type ModuleFilters } from './api';
import { ModuleCardView } from './ModuleCardView';

const domainTabs = [
  { key: '', label: 'All' },
  { key: 'physical-design', label: 'Physical Design' },
  { key: 'design-verification', label: 'Design Verification' },
];

const sorts: { key: NonNullable<ModuleFilters['sort']>; label: string }[] = [
  { key: 'popular', label: 'Most popular' },
  { key: 'newest', label: 'Newest' },
  { key: 'price_asc', label: 'Price: low to high' },
  { key: 'price_desc', label: 'Price: high to low' },
];

export default function ModulesPage() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') ?? '');

  const filters: ModuleFilters = useMemo(
    () => ({
      domain: params.get('domain') || undefined,
      q: params.get('q') || undefined,
      sort: (params.get('sort') as ModuleFilters['sort']) || 'popular',
      page: Number(params.get('page')) || 1,
      limit: 12,
    }),
    [params],
  );

  const { data, isLoading, isError } = useModules(filters);

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    if (!('page' in patch)) next.delete('page');
    setParams(next, { replace: true });
  };

  return (
    <>
      <Seo
        title="Module Marketplace"
        description="Browse Semicon Labs modules — hands-on Physical Design and Design Verification challenges you can buy and start solving immediately."
        path="/modules"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Modules', path: '/modules' }])]}
      />
      <PageHero
        eyebrow="module marketplace"
        title="Buy a challenge. Start solving today."
        lede="Each module is a hands-on engineering challenge with objective validation — not a video course. Own it forever."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Modules' }]}
      />

      <Section>
        {/* Controls */}
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {domainTabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => update({ domain: t.key })}
                className={cn(
                  'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition',
                  (filters.domain ?? '') === t.key
                    ? 'border-blue bg-blue text-white'
                    : 'border-line text-ink-dim hover:border-ink-dim hover:text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update({ q });
              }}
              className="relative"
            >
              <svg className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" viewBox="0 0 20 20" fill="none" aria-hidden>
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
                <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search modules…"
                aria-label="Search modules"
                className="h-11 w-full rounded-lg border border-line bg-panel pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-blue/60 focus:outline-none sm:w-64"
              />
            </form>
            <select
              value={filters.sort}
              onChange={(e) => update({ sort: e.target.value })}
              aria-label="Sort modules"
              className="h-11 rounded-lg border border-line bg-panel px-3 text-sm text-ink focus:border-blue/60 focus:outline-none"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-line bg-panel-raised" />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-ink-dim">We couldn't load modules right now.</p>
            <p className="mt-2 text-sm text-ink-faint">Make sure the API is running, then refresh.</p>
          </div>
        ) : data && data.items.length > 0 ? (
          <>
            <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
              {data.items.map((m) => (
                <RevealItem key={m.id}>
                  <ModuleCardView module={m} />
                </RevealItem>
              ))}
            </RevealGroup>

            {data.pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                {Array.from({ length: data.pagination.totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      type="button"
                      onClick={() => update({ page: String(page) })}
                      className={cn(
                        'h-9 w-9 rounded-lg border font-mono text-sm transition',
                        page === data.pagination.page
                          ? 'border-blue bg-blue text-white'
                          : 'border-line text-ink-dim hover:border-ink-dim hover:text-ink',
                      )}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-ink-dim">No modules match your filters yet.</p>
          </div>
        )}
      </Section>
    </>
  );
}
