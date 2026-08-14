import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SampleChallenges } from '@/features/home/sections/SampleChallenges';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { useDomains, type DomainSummary } from '@/features/curriculum/api';
import {
  COMING_SOON_STATS,
  OPENINGS_BY_CODE,
  PAY_BY_CODE,
  upModules,
  upSkills,
  upTestcases,
} from '@/data/curriculum';
import { breadcrumbSchema } from '@/lib/seo';

// Per-domain chip artwork for the card banners (client-supplied chip imagery).
const CARD_ART: Record<string, string> = {
  'physical-design': '/images/chips/chip-neon.jpg',
  'design-verification': '/images/chips/chip-violet.jpg',
  'analog-layout': '/images/chips/chip-ember2.jpg',
};

/** Marketing proof-points per domain card (client-provided claims). */
const proofRows = (d: DomainSummary) => [
  { label: 'Skill tracks', value: `${upSkills(d.stats.skills)}` },
  { label: 'Modules', value: `${upModules(d.stats.modules)}` },
  { label: 'Real world scenarios', value: `${upTestcases(d.stats.testcases)}+` },
  { label: 'Supported by', value: 'Cadence · Synopsys · Siemens' },
  { label: 'Avg. industry pay', value: PAY_BY_CODE[d.code] ?? '₹9 LPA' },
  { label: 'Active openings', value: OPENINGS_BY_CODE[d.code] ?? '3,000+' },
];

function DomainBigCard({ domain }: { domain: DomainSummary }) {
  const soon = domain.comingSoon;
  if (soon) {
    return (
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dashed border-line-strong bg-panel/40">
        <div className="relative h-32 overflow-hidden">
          <img
            src={CARD_ART[domain.slug]}
            alt=""
            aria-hidden
            loading="lazy"
            className="h-full w-full object-cover opacity-60 grayscale transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        </div>
        <div className="flex flex-1 flex-col p-7 pt-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-navy">{domain.pipeline}</p>
            <Badge tone="neutral">Coming soon</Badge>
          </div>
          <h3 className="mt-3 text-xl font-bold text-ink">{domain.name}</h3>
          <p className="mt-2 text-sm text-ink-dim">{domain.tagline}</p>
          {/* Client-supplied counts — the catalog behind this domain is a
              placeholder until it launches. */}
          <ul className="mt-5 flex-1 divide-y divide-line border-y border-line">
            {(COMING_SOON_STATS[domain.code] ?? []).map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-3 py-2.5">
                <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">{row.label}</span>
                <span className="text-right text-[13.5px] font-bold text-ink">{row.value}</span>
              </li>
            ))}
          </ul>
          <Button variant="secondary" disabled className="mt-6 w-full">
            Coming soon
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="gradient-border group flex h-full flex-col overflow-hidden rounded-2xl border border-transparent bg-panel shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      {/* Chip artwork banner — slow zoom on hover, fading into the card body */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={CARD_ART[domain.slug]}
          alt=""
          aria-hidden
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/25 to-transparent" />
        <span className="absolute bottom-2 right-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
          {domain.code}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7 pt-4">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-navy">{domain.pipeline}</p>
        <Badge tone="blue">
          <span className="relative mr-1.5 flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue" />
          </span>
          Enrolling
        </Badge>
      </div>
      <h3 className="mt-3 text-xl font-bold text-ink transition-colors duration-300 group-hover:text-blue-600">{domain.name}</h3>
      <ul className="mt-5 flex-1 divide-y divide-line border-y border-line">
        {proofRows(domain).map((row, i) => (
          <li
            key={row.label}
            // Rows light up in a top-to-bottom wave while the card is hovered.
            className="-mx-2 flex items-center justify-between gap-3 rounded-md px-2 py-2.5 transition-colors duration-300 group-hover:bg-blue/5"
            style={{ transitionDelay: `${i * 45}ms` }}
          >
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">{row.label}</span>
            <span
              className={
                row.label === 'Real world scenarios'
                  ? 'text-right text-[13.5px] font-bold text-blue transition-transform duration-300 group-hover:scale-110'
                  : 'text-right text-[13.5px] font-bold text-ink'
              }
            >
              {row.value}
            </span>
          </li>
        ))}
      </ul>
      <Button
        to={`/domains/${domain.slug}`}
        arrow
        className="mt-6 w-full transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        Explore {domain.code} — {upTestcases(domain.stats.testcases)}+ real world scenarios
      </Button>
      </div>
    </div>
  );
}

function CardSkeleton() {
  return <div className="h-[480px] animate-pulse rounded-3xl border border-line bg-panel/60" />;
}

export default function DomainsPage() {
  const { data: domains, isLoading, isError } = useDomains();
  const totals = domains?.reduce(
    (acc, d) => ({
      skills: acc.skills + upSkills(d.stats.skills),
      modules: acc.modules + upModules(d.stats.modules),
      testcases: acc.testcases + upTestcases(d.stats.testcases),
    }),
    { skills: 0, modules: 0, testcases: 0 },
  );

  return (
    <>
      <Seo
        title="Engineering Domains"
        description="Physical Design, Design Verification and Analog Layout — real project challenges on industry EDA tools, structured Domain → Skill → Module → Real world scenario."
        path="/domains"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Domains', path: '/domains' }])]}
      />
      <PageHero
        eyebrow="engineering domains"
        title="Industry Challenges That Prepare You for Placements"
        lede="Experience real-world engineering scenarios with domain-specific skills, modules, and scenario based problems inspired by industry workflows. Develop the debugging, validation, and problem-solving skills required to confidently tackle VLSI interviews and placement opportunities."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Domains' }]}
        bgImage="/images/chips/ember-traces.jpg"
        aside={
          <dl className="space-y-6 border-l border-white/15 pl-8 text-right">
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-white/60">
                Avg salary of a VLSI engineer
              </dt>
              <dd className="mt-1.5 font-mono text-[38px] font-bold leading-none text-amber-300">10+ LPA</dd>
            </div>
            <div>
              <dt className="font-mono text-[12px] uppercase tracking-wider text-white/60">
                Avg active jobs across all domains
              </dt>
              <dd className="mt-1.5 font-mono text-[38px] font-bold leading-none text-amber-300">9000+</dd>
            </div>
          </dl>
        }
      >
        {totals && (
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              [totals.skills, 'skill tracks'],
              [totals.modules, 'modules'],
              [`${totals.testcases}+`, 'real world scenarios'],
              [3, 'EDA vendors'],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="font-mono text-3xl font-bold text-amber-300">{v}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-white/60">{l}</div>
              </div>
            ))}
          </div>
        )}
      </PageHero>

      <Section>
        {isError && (
          <p className="rounded-2xl border border-line bg-panel/60 p-8 text-center text-ink-dim">
            Couldn't load the domains. Please refresh — or head straight to{' '}
            <Link to="/modules" className="text-blue-400 hover:underline">
              the module catalog →
            </Link>
          </p>
        )}
        {/* [&>*]:min-w-0 — grid children default to min-width:auto, so a long
            stat value ("Cadence · Synopsys · Siemens") made the card wider than
            a phone screen and scrolled the page sideways. */}
        <RevealGroup className="grid gap-6 lg:grid-cols-3 [&>*]:min-w-0" stagger={0.1}>
          {isLoading
            ? [1, 2, 3].map((i) => (
                <RevealItem key={i}>
                  <CardSkeleton />
                </RevealItem>
              ))
            : (domains ?? []).map((domain) => (
                <RevealItem key={domain.slug}>
                  <DomainBigCard domain={domain} />
                </RevealItem>
              ))}
        </RevealGroup>
      </Section>

      {/* A taste of the actual challenges (moved here from the homepage). */}
      <SampleChallenges />

      <FinalCta />
    </>
  );
}
