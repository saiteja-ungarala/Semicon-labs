import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { FlowRail } from '@/components/curriculum/flow/FlowRail';
import { useDomain } from '@/features/curriculum/api';
import { LaunchOfferCard } from '@/components/marketing/LaunchOfferCard';
import { proficiencyLevels } from '@/data/curriculum';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';

const tone = { beginner: 'neutral', specialist: 'blue', expert: 'sky' } as const;

// Per-domain chip artwork for the hero (client-supplied chip imagery).
const HERO_ART: Record<string, string> = {
  'physical-design': '/images/chips/chip-board.jpg',
  'design-verification': '/images/chips/chip-purple.jpg',
  'analog-layout': '/images/chips/chip-amber.jpg',
};


/* --------------------------------------------------- sticky pricing rail */

// The client's ₹99 pre-book offer card rides every domain page (funnel:
// domain → /pricing → register — the card's CTA is route-aware).
function PricingRail() {
  return (
    // The rail can outgrow a 768px-tall laptop viewport, so it scrolls
    // internally; the inset padding keeps the card's glow from being clipped.
    // No overscroll-contain — the wheel must chain back to the page.
    <aside className="no-scrollbar lg:sticky lg:top-24 lg:-mx-1 lg:-my-1 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:px-1 lg:py-1">
      <LaunchOfferCard variant="rail" />
    </aside>
  );
}

/* ------------------------------------------------------------------ page */

export default function DomainDetailPage() {
  const { slug } = useParams();
  const { data: domain, isLoading, isError } = useDomain(slug);

  if (isError) {
    return (
      <Section>
        <p className="rounded-2xl border border-line bg-panel/60 p-10 text-center text-ink-dim">
          This domain didn't load.{' '}
          <Link to="/domains" className="text-blue-400 hover:underline">
            Back to all domains →
          </Link>
        </p>
      </Section>
    );
  }

  if (isLoading || !domain) {
    return (
      <Section>
        <div className="h-40 animate-pulse rounded-3xl bg-panel/60" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-panel/60" />
          ))}
        </div>
      </Section>
    );
  }

  const path = `/domains/${domain.slug}`;

  return (
    <>
      <Seo
        title={`${domain.name} — ${domain.tagline}`}
        description={domain.description}
        path={path}
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Domains', path: '/domains' },
            { name: domain.name, path },
          ]),
          courseSchema({ name: domain.name, description: domain.description, path }),
        ]}
      />
      <PageHero
        eyebrow={domain.pipeline}
        title={domain.name}
        lede={domain.description}
        image={HERO_ART[domain.slug]}
        imageAlt={`${domain.name} chip artwork`}
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Domains', to: '/domains' }, { name: domain.name }]}
      >
        {domain.comingSoon ? (
          <div className="flex flex-wrap items-center gap-4">
            <Badge tone="neutral">Coming soon</Badge>
            <Button to="/register" arrow>
              Join the {domain.code} waitlist
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {[
              [domain.stats.skills, 'skills'],
              [domain.stats.modules, 'competencies'],
              [domain.stats.testcases, 'testcases'],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="font-mono text-3xl font-bold text-blue">{v}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{l}</div>
              </div>
            ))}
            <p className="max-w-xs text-[13px] leading-snug text-ink-dim">
              It's all on this page — open a stage, pick a step, read the exact labs you'd run in week one.
            </p>
          </div>
        )}
      </PageHero>

      {domain.comingSoon ? (
        <Section>
          <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-line-strong bg-panel/40 p-12 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-navy">Opening next</p>
            <h2 className="mt-3 text-2xl font-bold text-ink">This domain is being built right now.</h2>
            <p className="mt-3 text-ink-dim">
              {domain.name} labs are in production with the same real-project standard as PD and DV. Register
              once — you'll be first in when it opens, ahead of public seats.
            </p>
            <Button to="/register" arrow className="mt-7">
              Reserve first access
            </Button>
          </div>
        </Section>
      ) : (
        <Section>
          <SectionHead
            eyebrow="the full route — nothing hidden"
            title={`The whole ${domain.code} flow, one stage at a time.`}
            lede="Open a stage, pick a step, read the exact lab you'd run. Every number is live from the catalog."
          />
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-12">
            <div className="min-w-0">
              <Reveal direction="up">
                <FlowRail key={domain.slug} domain={domain} />
              </Reveal>
            </div>
            <PricingRail />
          </div>
        </Section>
      )}

      <Section alt>
        <SectionHead eyebrow="proficiency progression" title="How you advance through each skill." />
        <div className="grid gap-6 md:grid-cols-3">
          {proficiencyLevels.map((level) => (
            <div key={level.key} className="rounded-2xl border border-line bg-panel/60 p-7">
              <Badge tone={tone[level.key]}>{level.badge}</Badge>
              <h3 className="mt-4 text-lg font-semibold">{level.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{level.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
