import { Link } from 'react-router-dom';
import { Section, SectionHead } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { OPENINGS_BY_CODE, PAY_BY_CODE } from '@/data/curriculum';
import { useDomains, type DomainSummary } from '@/features/curriculum/api';

/**
 * "Real challenges, straight from industry." — the three domains as
 * proof-heavy cards (live catalog counts + client-approved claims).
 */

const claimRows = (d: DomainSummary) => [
  { label: 'Skill tracks', value: `${d.stats.skills}` },
  { label: 'Modules', value: `${d.stats.modules}` },
  { label: 'Real world scenarios', value: `${d.stats.testcases}+` },
  { label: 'Supported by', value: 'SIEMENS · Cadence · Synopsys' },
  { label: 'Avg. industry pay', value: PAY_BY_CODE[d.code] ?? '₹9 LPA' },
  { label: 'Active openings', value: OPENINGS_BY_CODE[d.code] ?? '3,000+' },
];

function HomeDomainCard({ domain }: { domain: DomainSummary }) {
  if (domain.comingSoon) {
    return (
      <div className="flex h-full flex-col rounded-2xl border-2 border-dashed border-line-strong bg-panel/40 p-7">
        <div className="flex items-start justify-end gap-3">
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
    <div className="gradient-border group flex h-full flex-col rounded-2xl border border-transparent bg-panel p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="flex items-start justify-end gap-3">
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
        {claimRows(domain).map((row, i) => (
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
        eyebrow="the skills companies are hiring for — right now"
        title={
          <>
            Industry Challenges That
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">Prepare You for Placements</span>
          </>
        }
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
      <div className="mt-3 flex items-center justify-end gap-4">
        <Link to="/domains" className="text-sm font-semibold text-blue transition hover:underline">
          View all domains →
        </Link>
      </div>
    </Section>
  );
}
