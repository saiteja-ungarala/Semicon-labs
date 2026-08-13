import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DifficultyDots, LabTypeBadge, ToolBadge } from '@/components/curriculum/CurriculumBits';
import {
  useDomain,
  useSkill,
  useModuleTestcases,
  formatDuration,
  type SkillModule,
  type SkillSummary,
} from '@/features/curriculum/api';
import { LaunchOfferCard } from '@/components/marketing/LaunchOfferCard';
import { OPENINGS_BY_CODE, PAY_BY_CODE, proficiencyLevels, upModules, upSkills, upTestcases } from '@/data/curriculum';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';
import { cn } from '@/lib/cn';

const tone = { beginner: 'neutral', specialist: 'blue', expert: 'sky' } as const;

// Per-domain chip artwork for the hero (client-supplied chip imagery).
const HERO_ART: Record<string, string> = {
  'physical-design': '/images/chips/chip-board.jpg',
  'design-verification': '/images/chips/chip-purple.jpg',
  'analog-layout': '/images/chips/chip-amber.jpg',
};

/* ------------------------------------------------ testcases inside a module */

function TestcaseList({ moduleSlug }: { moduleSlug: string }) {
  const { data, isLoading } = useModuleTestcases(moduleSlug);
  if (isLoading) {
    return (
      <div className="space-y-2 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 animate-pulse rounded-lg bg-void-2" />
        ))}
      </div>
    );
  }
  if (!data?.testcases.length) {
    return <p className="p-4 text-sm text-ink-dim">Real world scenarios for this module are being finalized.</p>;
  }
  return (
    <ul className="divide-y divide-line/70">
      {data.testcases.map((tc, i) => (
        <li key={tc.slug} className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2.5">
          <span className="font-mono text-[10.5px] text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink" title={tc.title}>
            {tc.title}
          </span>
          <LabTypeBadge type={tc.labType} />
          {tc.verifiable && (
            <span className="hidden font-mono text-[10px] uppercase tracking-wide text-blue sm:inline" title="Objectively validated">
              ✓
            </span>
          )}
          {/* No per-scenario duration: the client's call — hours are quoted at
              skill and module level, not for every individual scenario. */}
        </li>
      ))}
    </ul>
  );
}

/* -------------------------------------------------------- module accordion */

function ModuleRow({ module, step, starter }: { module: SkillModule; step: number; starter?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group rounded-xl border border-line bg-panel transition-all duration-300 hover:border-blue/30 hover:shadow-glow">
      <div 
        className="flex cursor-pointer flex-wrap items-center gap-x-4 gap-y-2 p-4 transition-colors hover:bg-blue-soft/10"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10.5px] font-bold text-blue/60">{String(step).padStart(2, '0')}</span>
            <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-blue">{module.title}</span>
            <ToolBadge tool={module.toolVendor} />
            {starter && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white shadow-sm">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                Start here
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <DifficultyDots level={module.difficulty} />
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-dim">
              <span className="font-bold text-blue">{formatDuration(module.durationMin)}</span> lab
            </span>
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-dim">
              <span className="font-bold text-blue">{module.testcaseCount}</span> real world scenarios
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink-dim transition-colors group-hover:text-blue">
          <span>{open ? 'Hide real world scenarios' : 'View real world scenarios'}</span>
          <svg aria-hidden className={cn('transition-transform duration-200', open && 'rotate-180')} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line/70 bg-void/30"
          >
            <TestcaseList moduleSlug={module.slug} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------------------------- modules inside a skill */

function SkillModules({ domainSlug, skillSlug, firstSkill }: { domainSlug: string; skillSlug: string; firstSkill?: boolean }) {
  const { data, isLoading } = useSkill(domainSlug, skillSlug);
  if (isLoading) {
    return (
      <div className="space-y-3 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl border border-line bg-panel/60" />
        ))}
      </div>
    );
  }
  if (!data) return null;
  return (
    <div className="space-y-3 pt-4">
      {data.skill.modules.map((m, i) => (
        <ModuleRow key={m.slug} module={m} step={i + 1} starter={firstSkill && i === 0} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------- skill accordion */

function SkillBlock({
  domainSlug,
  skill,
  index,
  defaultOpen,
}: {
  domainSlug: string;
  skill: SkillSummary;
  index: number;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      id={`skill-${skill.slug}`}
      className="group scroll-mt-28 rounded-2xl border border-line bg-panel shadow-sm transition-all duration-300 hover:border-blue/30 hover:shadow-md"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 p-5 text-left transition-colors hover:bg-blue-soft/10 sm:p-6 rounded-t-2xl"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-soft/50 font-mono text-sm font-bold text-blue transition-colors group-hover:bg-blue group-hover:text-white">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[17px] font-bold text-ink transition-colors group-hover:text-blue">{skill.name}</span>
            <ToolBadge tool={skill.toolVendor} />
          </span>
          <span className="mt-1 block text-[13.5px] leading-snug text-ink-dim">{skill.summary}</span>
        </span>
        <span className="flex items-center gap-5">
          <span className="hidden text-right sm:block">
            <span className="block font-mono text-[13px] font-bold text-ink transition-colors group-hover:text-blue">
              <span className="text-blue">{skill.stats.modules}</span> modules · <span className="text-blue">{skill.stats.testcases}</span> real world scenarios
            </span>
            <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-wide text-ink-dim">
              <span className="font-bold text-ink">{formatDuration(skill.stats.durationMin)}</span> of lab time
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              'flex items-center justify-center text-ink-faint transition-transform duration-200 group-hover:text-ink',
              open && 'rotate-180',
            )}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-line/70 px-5 pb-6 pt-2 sm:px-6 sm:pb-7">
              <SkillModules domainSlug={domainSlug} skillSlug={skill.slug} firstSkill={index === 0} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --------------------------------------------------- sticky pricing rail */

// The client's ₹99 pre-book offer card rides every domain page (funnel:
// domain → /pricing → register — the card's CTA is route-aware).
function PricingRail() {
  return (
    <aside className="lg:sticky lg:top-24 lg:self-start">
      <div className="mx-auto w-full max-w-lg">
                <LaunchOfferCard variant="full" />
              </div>
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
              [upSkills(domain.stats.skills), 'skills'],
              [upModules(domain.stats.modules), 'modules'],
              [upTestcases(domain.stats.testcases), 'real world scenarios'],
              [PAY_BY_CODE[domain.code] ?? '₹9 LPA', 'avg. industry pay'],
              [OPENINGS_BY_CODE[domain.code] ?? '3,000+', 'active openings'],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="font-mono text-3xl font-bold text-blue">{v}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{l}</div>
              </div>
            ))}
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
        // Full-bleed so the row can exceed the 1200px page container: a 512px
        // offer card alongside the content needs more room than that.
        <Section bleed>
          <div className="mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8 xl:max-w-[1400px]">
          <SectionHead
            eyebrow="the full curriculum — one page"
            title={`Every skill, module and real world scenario in ${domain.code}.`}
            lede="Skill → modules → real world scenarios. Expand anything; the numbers are live from the catalog, not marketing."
          />
          <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_512px] xl:gap-14">
            <div className="min-w-0 space-y-4">
              {domain.skills.map((skill, i) => (
                <SkillBlock
                  key={skill.slug}
                  domainSlug={domain.slug}
                  skill={skill}
                  index={i}
                  defaultOpen={i === 0}
                />
              ))}
            </div>
            <PricingRail />
          </div>
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
