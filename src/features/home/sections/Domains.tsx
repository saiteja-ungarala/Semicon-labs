import { Link } from 'react-router-dom';
import { Section, SectionHead } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { useDomains, type DomainSummary } from '@/features/curriculum/api';

/**
 * "Real challenges, straight from real projects." — the three domains as
 * proof-heavy cards (live catalog counts + client-approved claims).
 */

const claimRows = (d: DomainSummary) => [
  { label: 'Skill tracks', value: `${d.stats.skills}` },
  { label: 'Lab modules', value: `${d.stats.modules}` },
  { label: 'Real testcases', value: `${d.stats.testcases}+` },
  { label: 'Supported by', value: 'SIEMENS · Cadence · Synopsys' },
  { label: 'Avg. industry pay', value: '₹3,50,000 LPA¹' },
];

function HomeDomainCard({ domain }: { domain: DomainSummary }) {
  if (domain.comingSoon) {
    return (
      <div className="flex h-full flex-col rounded-2xl border-2 border-dashed border-line-strong bg-panel/40 p-7">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-navy">{domain.pipeline}</p>
          <Badge tone="neutral">Coming soon</Badge>
        </div>
        <h3 className="mt-3 text-xl font-bold text-ink">{domain.name}</h3>
        <p className="mt-2 flex-1 text-sm text-ink-dim">{domain.tagline}</p>
        <Button to="/register" variant="secondary" className="mt-6 w-full">
          Join the waitlist
        </Button>
      </div>
    );
  }
  return (
    <div className="gradient-border flex h-full flex-col rounded-2xl border border-transparent bg-panel p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-navy">{domain.pipeline}</p>
        <Badge tone="blue">Enrolling</Badge>
      </div>
      <h3 className="mt-3 text-xl font-bold text-ink">{domain.name}</h3>
      <ul className="mt-5 flex-1 divide-y divide-line border-y border-line">
        {claimRows(domain).map((row) => (
          <li key={row.label} className="flex items-center justify-between gap-3 py-2.5">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">{row.label}</span>
            <span className="text-right text-[13.5px] font-bold text-ink">{row.value}</span>
          </li>
        ))}
      </ul>
      <Button to={`/domains/${domain.slug}`} arrow className="mt-6 w-full">
        Get Started
      </Button>
    </div>
  );
}

export function Domains() {
  const { data: domains, isLoading } = useDomains();

  return (
    <Section id="domains">
      <SectionHead
        eyebrow="domains, skills & testcases"
        title="Real challenges, straight from real projects."
        lede="Pick a domain and drill all the way down — skill, module, testcase. Every count below is live from the catalog."
      />
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
        {isLoading
          ? [1, 2, 3].map((i) => (
              <RevealItem key={i}>
                <div className="h-[380px] animate-pulse rounded-2xl border border-line bg-panel/60" />
              </RevealItem>
            ))
          : (domains ?? []).map((domain) => (
              <RevealItem key={domain.slug}>
                <HomeDomainCard domain={domain} />
              </RevealItem>
            ))}
      </RevealGroup>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="font-mono text-[10.5px] text-ink-faint">¹ Data taken from Times of India</p>
        <Link to="/domains" className="text-sm font-semibold text-blue transition hover:underline">
          View all domains →
        </Link>
      </div>
    </Section>
  );
}
