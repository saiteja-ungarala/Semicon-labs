import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { breadcrumbSchema } from '@/lib/seo';

const resources = [
  { title: 'STA Debug Field Guide', kind: 'Guide', desc: 'A structured approach to reading timing reports and isolating the real cause of a violation.' },
  { title: 'Coverage Closure Checklist', kind: 'Checklist', desc: 'The questions to ask before you call functional coverage “done.”' },
  { title: 'PD Signoff Readiness Sheet', kind: 'Template', desc: 'How to judge whether a block is genuinely ready to hand off to signoff.' },
  { title: 'DV Root-Cause Playbook', kind: 'Playbook', desc: 'Separating symptom from cause across DUT, testbench, and stimulus.' },
  { title: 'Semiconductor Glossary', kind: 'Reference', desc: 'Plain-language definitions for the terminology used across PD and DV challenges.' },
  { title: 'Interview Readiness Set', kind: 'Guide', desc: 'The competency areas that matter most when interviewing for PD and DV roles.' },
];

export default function ResourcesPage() {
  return (
    <>
      <Seo
        title="Resources"
        description="Free guides, checklists, and references for Physical Design and Design Verification engineers — from the Semicon Labs team."
        path="/resources"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }])]}
      />
      <PageHero
        eyebrow="resource library"
        title="Reference material for real work."
        lede="Guides and checklists distilled from the same engineering thinking our challenges are built on."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Resources' }]}
      />
      <Section>
        <SectionHead eyebrow="library" title="Browse the collection." />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {resources.map((r) => (
            <RevealItem key={r.title}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-6 transition-all hover:-translate-y-1 hover:border-blue/40">
                <span className="font-mono text-[11px] uppercase tracking-wider text-navy">{r.kind}</span>
                <h3 className="mt-3 text-lg font-semibold text-ink">{r.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-dim">{r.desc}</p>
                <p className="mt-5 font-mono text-xs text-ink-faint">Available with your account →</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <FinalCta />
    </>
  );
}
