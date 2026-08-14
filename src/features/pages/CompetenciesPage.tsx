import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { domains } from '@/data/curriculum';
import { breadcrumbSchema } from '@/lib/seo';
import { cn } from '@/lib/cn';

interface FlatCompetency {
  domain: string;
  domainSlug: string;
  code: string;
  skill: string;
  name: string;
  summary: string;
}

const all: FlatCompetency[] = domains.flatMap((d) =>
  d.skills.flatMap((s) =>
    s.competencies.map((c) => ({
      domain: d.name,
      domainSlug: d.slug,
      code: d.code,
      skill: s.name,
      name: c.name,
      summary: c.summary,
    })),
  ),
);

export default function CompetenciesPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'PD' | 'DV'>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((c) => {
      const matchesFilter = filter === 'all' || c.code === filter;
      const matchesQuery =
        !q ||
        [c.name, c.skill, c.domain, c.summary].some((f) => f.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  return (
    <>
      <Seo
        title="Modules"
        description="Browse every Semicon Labs module across Physical Design and Design Verification — the specific capabilities you'll demonstrate through real engineering challenges."
        path="/competencies"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Modules', path: '/competencies' }])]}
      />
      <PageHero
        eyebrow="every capability, measured"
        title="Modules you'll actually prove."
        lede="A module is a specific capability you demonstrate — Setup Closure, Coverage Closure, DRC Debug. Search the full set below."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Modules' }]}
      />
      <Section>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search modules, skills, keywords…"
              aria-label="Search modules"
              className="h-11 w-full rounded-lg border border-line bg-panel pl-10 pr-4 text-sm text-ink placeholder:text-ink-faint focus:border-blue/60 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'PD', 'DV'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition',
                  filter === f
                    ? 'border-blue bg-blue text-white'
                    : 'border-line text-ink-dim hover:border-ink-dim hover:text-ink',
                )}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-6 font-mono text-xs text-ink-faint">
          {results.length} module{results.length === 1 ? '' : 's'}
        </p>

        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line py-20 text-center">
            <p className="text-ink-dim">No modules match “{query}”.</p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-3 text-sm text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.03}>
            {results.map((c) => (
              <RevealItem key={c.domainSlug + c.name}>
                <Link
                  to={`/domains/${c.domainSlug}`}
                  className="flex h-full flex-col rounded-xl border border-line bg-panel/60 p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-navy">
                      {c.domain} · {c.skill}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                    <span aria-hidden className="font-mono text-sky">
                      ›
                    </span>
                    {c.name}
                  </div>
                  <p className="mt-2 text-[13.5px] text-ink-dim">{c.summary}</p>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </Section>
      <FinalCta />
    </>
  );
}
