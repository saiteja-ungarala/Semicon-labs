import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import {
  DifficultyDots,
  LabMixBar,
  ToolBadge,
} from '@/components/curriculum/CurriculumBits';
import {
  useSkill,
  formatDuration,
  formatPrice,
  type SkillModule,
} from '@/features/curriculum/api';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';

function ModuleRow({ module }: { module: SkillModule }) {
  const price = formatPrice(module.priceMinor, module.discountMinor, module.currency);
  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group grid gap-5 rounded-2xl border border-line bg-panel p-6 shadow-card transition-all hover:-translate-y-0.5 hover:border-blue/50 hover:shadow-card-hover sm:grid-cols-[1fr_auto]"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-base font-bold text-ink group-hover:text-blue">{module.title}</h3>
          <ToolBadge tool={module.toolVendor} />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13.5px] text-ink-dim">{module.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <DifficultyDots level={module.difficulty} />
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            {formatDuration(module.durationMin)} lab time
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            <b className="mr-1 text-[13px] normal-case tracking-normal text-blue">{module.testcaseCount}</b>
            testcases
          </span>
        </div>
        {module.testcaseCount > 0 && <LabMixBar mix={module.labMix} className="mt-3 max-w-md" />}
      </div>
      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:justify-center">
        <div className="text-right">
          <div className="font-mono text-xl font-bold text-ink">{price.now}</div>
          {price.was && <div className="font-mono text-xs text-ink-faint line-through">{price.was}</div>}
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-soft px-4 py-2 text-sm font-semibold text-blue-600 transition group-hover:bg-blue group-hover:text-white">
          Start solving <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}

export default function SkillDetailPage() {
  const { slug, skillSlug } = useParams();
  const { data, isLoading, isError } = useSkill(slug, skillSlug);

  if (isError) {
    return (
      <Section>
        <p className="rounded-2xl border border-line bg-panel/60 p-10 text-center text-ink-dim">
          This skill didn't load.{' '}
          <Link to={`/domains/${slug ?? ''}`} className="text-blue-400 hover:underline">
            Back to the domain →
          </Link>
        </p>
      </Section>
    );
  }

  if (isLoading || !data) {
    return (
      <Section>
        <div className="h-36 animate-pulse rounded-3xl bg-panel/60" />
        <div className="mt-8 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-line bg-panel/60" />
          ))}
        </div>
      </Section>
    );
  }

  const { domain, skill } = data;
  const path = `/domains/${domain.slug}/skills/${skill.slug}`;
  const totalLabs = skill.modules.reduce((n, m) => n + m.testcaseCount, 0);

  return (
    <>
      <Seo
        title={`${skill.name} — ${domain.name}`}
        description={skill.summary}
        path={path}
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Domains', path: '/domains' },
            { name: domain.name, path: `/domains/${domain.slug}` },
            { name: skill.name, path },
          ]),
          courseSchema({ name: `${skill.name} (${domain.name})`, description: skill.summary, path }),
        ]}
      />
      <PageHero
        eyebrow={`${domain.name} · skill track`}
        title={skill.name}
        lede={skill.summary}
        crumbs={[
          { name: 'Home', to: '/' },
          { name: 'Domains', to: '/domains' },
          { name: domain.name, to: `/domains/${domain.slug}` },
          { name: skill.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
            {[
              [skill.modules.length, 'lab modules'],
              [totalLabs, 'real testcases'],
              [formatDuration(skill.stats.durationMin), 'of lab time'],
            ].map(([v, l]) => (
              <div key={String(l)}>
                <div className="font-mono text-3xl font-bold text-blue">{v}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{l}</div>
              </div>
            ))}
          </div>
          <ToolBadge tool={skill.toolVendor} className="text-xs" />
        </div>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="lab modules — own them forever"
          title="Solve it the way the industry does."
          lede="Each module is a focused lab on a real flow problem. Buy only the ones you need — every one comes with its testcases, tool session, and objective validation."
        />
        <RevealGroup className="space-y-4" stagger={0.05}>
          {skill.modules.map((module) => (
            <RevealItem key={module.slug}>
              <ModuleRow module={module} />
            </RevealItem>
          ))}
        </RevealGroup>

        {skill.modules.length === 0 && (
          <p className="rounded-2xl border border-line bg-panel/60 p-10 text-center text-ink-dim">
            Modules for this skill are being finalized — check back shortly.
          </p>
        )}

        <div className="mt-10 text-center">
          <Button to={`/domains/${domain.slug}`} variant="secondary">
            ← All {domain.name} skills
          </Button>
        </div>
      </Section>
    </>
  );
}
