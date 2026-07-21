import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { site } from '@/config/site';
import { breadcrumbSchema } from '@/lib/seo';

const roles = [
  { title: 'Senior PD Content Engineer', team: 'Curriculum', type: 'Full-time', location: 'Remote', desc: 'Design real Physical Design challenges — timing, congestion, signoff — with objective validation.' },
  { title: 'DV Content Engineer', team: 'Curriculum', type: 'Full-time', location: 'Remote', desc: 'Build verification challenges from real regression and coverage-closure scenarios.' },
  { title: 'Senior Frontend Engineer', team: 'Product', type: 'Full-time', location: 'Remote', desc: 'Own the learner experience in React — from marketing surface to the challenge workspace.' },
  { title: 'Platform Engineer (Node)', team: 'Product', type: 'Full-time', location: 'Remote', desc: 'Build the APIs and validation infrastructure the future learning platform runs on.' },
];

const values = [
  { title: 'Execution over theory', copy: 'We build the thing and validate it against a real outcome — the same standard we hold learners to.' },
  { title: 'Judgment is the job', copy: 'We hire people who ask better questions, not people who memorize more answers.' },
  { title: 'Remote, async, senior', copy: 'A small team of experienced engineers who value depth over meetings.' },
];

export default function CareersPage() {
  return (
    <>
      <Seo
        title="Careers"
        description="Join the team building the platform that develops real semiconductor engineering judgment. Remote-first roles across curriculum and product."
        path="/careers"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Careers', path: '/careers' }])]}
      />
      <PageHero
        eyebrow="careers"
        title="Build the platform that builds engineers."
        lede="We're a small, senior, remote-first team building the world's most comprehensive collection of semiconductor engineering challenges."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Careers' }]}
      />

      <Section>
        <SectionHead eyebrow="how we work" title="What we optimize for." />
        <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.08}>
          {values.map((v) => (
            <RevealItem key={v.title}>
              <div className="h-full rounded-2xl border border-line bg-panel/60 p-6">
                <h3 className="text-base font-semibold text-ink">{v.title}</h3>
                <p className="mt-3 text-sm text-ink-dim">{v.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section alt>
        <SectionHead eyebrow="open roles" title="Where we're hiring." />
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.title}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-panel/60 p-6 transition-colors hover:border-blue/40 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-ink">{role.title}</h3>
                  <Badge tone="blue">{role.team}</Badge>
                </div>
                <p className="mt-2 max-w-xl text-sm text-ink-dim">{role.desc}</p>
                <p className="mt-2 font-mono text-xs text-ink-faint">
                  {role.type} · {role.location}
                </p>
              </div>
              <Button href={`mailto:${site.email}?subject=Application: ${encodeURIComponent(role.title)}`} variant="ghost" className="shrink-0">
                Apply
              </Button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-ink-dim">
          Don't see your role? Tell us what you'd build:{' '}
          <a href={`mailto:${site.email}`} className="text-blue-400 hover:underline">
            {site.email}
          </a>
        </p>
      </Section>
    </>
  );
}
