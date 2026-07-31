import { Link, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { OnlyHereStrip, ToolBadge } from '@/components/curriculum/CurriculumBits';
import { useDomain, formatDuration, type SkillSummary } from '@/features/curriculum/api';
import { proficiencyLevels } from '@/data/curriculum';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';

const tone = { beginner: 'neutral', specialist: 'blue', expert: 'sky' } as const;

function SkillCard({ domainSlug, skill }: { domainSlug: string; skill: SkillSummary }) {
  return (
    <Link
      to={`/domains/${domainSlug}/skills/${skill.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blue/50 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-ink group-hover:text-blue">{skill.name}</h3>
        <ToolBadge tool={skill.toolVendor} />
      </div>
      <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink-dim">{skill.summary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4">
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          <b className="mr-1 text-sm normal-case tracking-normal text-blue">{skill.stats.modules}</b>modules
        </span>
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
          <b className="mr-1 text-sm normal-case tracking-normal text-blue">{skill.stats.testcases}</b>testcases
        </span>
        {skill.stats.durationMin > 0 && (
          <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
            <b className="mr-1 text-sm normal-case tracking-normal text-blue">{formatDuration(skill.stats.durationMin)}</b>of lab time
          </span>
        )}
        <span aria-hidden className="ml-auto font-mono text-sm text-blue transition-transform group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  );
}

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
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl border border-line bg-panel/60" />
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
              [domain.stats.skills, 'skill tracks'],
              [domain.stats.modules, 'lab modules'],
              [`${domain.stats.testcases}`, 'real testcases'],
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
        <Section>
          <SectionHead
            eyebrow="skills — pick your track"
            title={`Every skill a ${domain.code} engineer is measured on.`}
            lede="Each track drills into lab modules, and every module into the exact testcases engineers debug on live projects. Click through — the depth is the proof."
          />
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {domain.skills.map((skill) => (
              <RevealItem key={skill.slug}>
                <SkillCard domainSlug={domain.slug} skill={skill} />
              </RevealItem>
            ))}
          </RevealGroup>

          <OnlyHereStrip className="mt-12">
            {`${domain.stats.testcases} ${domain.name} testcases from real tapeouts — you will not find these anywhere else.`}
          </OnlyHereStrip>
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
