import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { OnlyHereStrip } from '@/components/curriculum/CurriculumBits';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { useDomains, type DomainSummary } from '@/features/curriculum/api';
import { breadcrumbSchema } from '@/lib/seo';

/** Marketing proof-points per domain card (client-provided claims). */
const proofRows = (d: DomainSummary) => [
  { label: 'Skill tracks', value: `${d.stats.skills}` },
  { label: 'Lab modules', value: `${d.stats.modules}` },
  { label: 'Real testcases', value: `${d.stats.testcases}+` },
  { label: 'Supported by', value: 'SIEMENS · Cadence · Synopsys' },
  { label: 'Avg. industry pay', value: '₹3,50,000 LPA¹' },
];

function DomainBigCard({ domain }: { domain: DomainSummary }) {
  const soon = domain.comingSoon;
  return (
    <div
      className={
        soon
          ? 'relative flex h-full flex-col rounded-3xl border-2 border-dashed border-line-strong bg-panel/40 p-8'
          : 'gradient-border relative flex h-full flex-col rounded-3xl border border-transparent bg-panel p-8 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover'
      }
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy">{domain.pipeline}</p>
        {soon ? (
          <Badge tone="neutral">Coming soon</Badge>
        ) : (
          <Badge tone="blue">Enrolling now</Badge>
        )}
      </div>
      <h3 className="mt-4 text-2xl font-bold text-ink">{domain.name}</h3>
      <p className="mt-2 flex-1 text-sm text-ink-dim">{domain.tagline}</p>

      {soon ? (
        <div className="mt-8 rounded-2xl bg-void-2/70 p-6 text-center">
          <p className="text-sm font-semibold text-ink">The next domain we open.</p>
          <p className="mt-1 text-[13px] text-ink-dim">
            Early registrants get first access — before public seats.
          </p>
          <Button to="/register" variant="secondary" className="mt-5 w-full">
            Join the waitlist
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {proofRows(domain).map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-4 py-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{row.label}</span>
                <span className="text-right text-sm font-bold text-ink">{row.value}</span>
              </li>
            ))}
          </ul>
          <Button to={`/domains/${domain.slug}`} arrow className="mt-7 w-full">
            Explore {domain.code} — {domain.stats.testcases}+ labs inside
          </Button>
        </>
      )}
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
      skills: acc.skills + d.stats.skills,
      modules: acc.modules + d.stats.modules,
      testcases: acc.testcases + d.stats.testcases,
    }),
    { skills: 0, modules: 0, testcases: 0 },
  );

  return (
    <>
      <Seo
        title="Engineering Domains"
        description="Physical Design, Design Verification and Analog Layout — real project challenges on industry EDA tools, structured Domain → Skill → Module → Testcase."
        path="/domains"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Domains', path: '/domains' }])]}
      />
      <PageHero
        eyebrow="engineering domains"
        title="Real challenges, straight from real projects."
        lede="Every domain is broken down the way real teams work: skills, lab modules, and the exact testcases engineers debug on live silicon. Pick your lane."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Domains' }]}
      >
        {totals && (
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            {[
              [totals.skills, 'skill tracks'],
              [totals.modules, 'lab modules'],
              [`${totals.testcases}+`, 'real testcases'],
              [3, 'EDA vendors'],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="font-mono text-3xl font-bold text-blue">{v}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{l}</div>
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
        <RevealGroup className="grid gap-6 lg:grid-cols-3" stagger={0.1}>
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
        <p className="mt-4 text-right font-mono text-[10.5px] text-ink-faint">¹ Data taken from Times of India</p>

        <OnlyHereStrip className="mt-12">
          {totals
            ? `${totals.testcases}+ testcases distilled from real project failures — and they exist only here.`
            : 'Testcases distilled from real project failures — and they exist only here.'}
        </OnlyHereStrip>
      </Section>

      <FinalCta />
    </>
  );
}
