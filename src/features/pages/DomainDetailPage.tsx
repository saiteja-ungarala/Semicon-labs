import { Navigate, useParams, Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { proficiencyLevels, domains } from '@/data/curriculum';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';

const tone = { beginner: 'neutral', specialist: 'blue', expert: 'sky' } as const;

export default function DomainDetailPage() {
  const { slug } = useParams();
  const domain = domains.find((d) => d.slug === slug);
  if (!domain) return <Navigate to="/domains" replace />;

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
        <Button to="/register" arrow>
          Start a {domain.code} Challenge
        </Button>
      </PageHero>

      <Section>
        <SectionHead
          eyebrow="skills & competencies"
          title={`Everything you'll build in ${domain.name}.`}
          lede="Each competency is a specific capability you demonstrate — measured against an engineering outcome, not completion."
        />
        <div className="space-y-6">
          {domain.skills.map((skill) => (
            <div key={skill.slug} className="gradient-border rounded-2xl border border-transparent bg-panel/60 p-7 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold text-ink">{skill.name}</h3>
                <p className="text-sm text-ink-dim">{skill.summary}</p>
              </div>
              <RevealGroup className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
                {skill.competencies.map((c) => (
                  <RevealItem key={c.slug}>
                    <div className="h-full rounded-xl border border-line bg-void-2/60 p-5 transition-colors hover:border-blue/40">
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <span aria-hidden className="font-mono text-sky">
                          ›
                        </span>
                        {c.name}
                      </div>
                      <p className="mt-2 text-[13.5px] text-ink-dim">{c.summary}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="proficiency progression"
          title="How you advance through each competency."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {proficiencyLevels.map((level) => (
            <div key={level.key} className="rounded-2xl border border-line bg-panel/60 p-7">
              <Badge tone={tone[level.key]}>{level.badge}</Badge>
              <h3 className="mt-4 text-lg font-semibold">{level.title}</h3>
              <p className="mt-2 text-sm text-ink-dim">{level.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-ink-dim">
            Prefer to see the other domain?{' '}
            {domains
              .filter((d) => d.slug !== domain.slug)
              .map((d) => (
                <Link key={d.slug} to={`/domains/${d.slug}`} className="text-blue-400 hover:underline">
                  {d.name} →
                </Link>
              ))}
          </p>
        </div>
      </Section>
    </>
  );
}
