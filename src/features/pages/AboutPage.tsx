import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { FoundersCarousel } from '@/components/marketing/FoundersCarousel';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { breadcrumbSchema } from '@/lib/seo';

// The client's three audience segments (Aug 2026) — the same split the rest of
// the site uses. Supporting copy is drawn from the Who We Serve pages so the
// wording stays consistent; the headings are theirs verbatim.
const audience = [
  {
    title: 'VLSI Trained Freshers',
    copy: 'Preparing for a first semiconductor role and want real project exposure before day one.',
  },
  {
    title: 'VLSI Working Professionals',
    copy: 'Deepening expertise in specific domains and modules while on the job.',
  },
  {
    title: 'VLSI Organizations',
    copy: 'Building semiconductor capability at scale — org-wide or across a department.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Seo
        title="About"
        description="Semicon Labs bridges the gap between knowing a flow and knowing how to solve a problem — building the world's most comprehensive collection of real semiconductor engineering challenges."
        path="/about"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]}
      />
      <PageHero
        eyebrow="about semicon labs"
        title="The biggest gap in semiconductor learning isn't content. It's experience."
        lede="Most engineers learn concepts, complete courses, and earn certifications — then join a project and meet a very different reality: failing regressions, timing violations, coverage gaps, and design challenges that demand investigation and judgment."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'About' }]}
      />

      {/* Founders lead the page — the client wants the team front and center. */}
      <Section>
        <SectionHead
          align="center"
          eyebrow="the people behind semicon labs"
          title="Built by engineers who shipped real silicon."
          lede="Decades inside NVIDIA, Apple, Synopsys, Intel, AMD, eBay, Xilinx and Marvell — distilled into the platform they wish they'd had."
        />
        <FoundersCarousel />
      </Section>

      <Section alt>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-pretty text-ink-dim">
              <p className="text-lg text-ink">
                Knowing a flow is not the same as knowing how to solve a problem. Semicon Labs was
                built to bridge that gap.
              </p>
              <p>
                Instead of learning through lectures and predefined exercises, learners develop
                expertise by working through the kinds of problems engineers face every day during
                chip development. Every experience follows one structured workflow —{' '}
                <span className="font-mono text-ink">Problem → Investigation → Solution → Validation</span>{' '}
                — because engineering capability is developed through problem solving, not content
                consumption.
              </p>
              <p>
                Every challenge is inspired by issues encountered during real semiconductor
                development projects. Rather than simplified textbook examples, learners tackle
                scenarios that reflect the complexity and ambiguity of actual engineering work — and
                every solution is measured objectively against the expected engineering outcome.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left">
            <div id="vision" className="gradient-border scroll-mt-28 rounded-2xl border border-transparent bg-panel/70 p-8">
              <p className="eyebrow">our vision</p>
              <p className="mt-4 text-pretty text-lg text-ink">
                To build the world's most comprehensive collection of semiconductor engineering
                challenges — a learning environment where engineers develop practical execution
                capability through real-world problem solving.
              </p>
              <p className="mt-5 border-t border-line pt-5 font-mono text-sm text-ink-dim">
                Because semiconductor engineering is not defined by the flows you know. It's defined
                by the problems you can solve.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="who it's for"
          title="Designed for engineers who want real project readiness."
        />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {audience.map((a) => (
            <RevealItem key={a.title}>
              <div className="h-full rounded-2xl border border-line bg-panel/60 p-6">
                <h3 className="text-base font-semibold text-ink">{a.title}</h3>
                <p className="mt-3 text-sm text-ink-dim">{a.copy}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <FinalCta />
    </>
  );
}
