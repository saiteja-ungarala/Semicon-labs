import { useState } from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { StarterPackCard } from '@/components/marketing/IndividualOffer';
import { WalkthroughModal } from '@/components/marketing/WalkthroughModal';
import { audiencePages } from '@/data/audiencePages';
import { audienceSeo } from '@/data/pageSeo';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * /who-we-serve/individuals — the VLSI Trained Fresher page.
 *
 * Built from the Claude Design comp "Individuals - Who We Serve": the pitch
 * is that a course got them the concepts but not the job, and the page walks
 * problem → practice → framework → offer → interview-ready. The slug stays
 * `individuals` so nothing already linking here (nav, sitemap, the deployed
 * build) breaks; only the name changed.
 */

const INTERVIEW_CHECKS = [
  'Can you find the problem?',
  'Can you identify the root cause?',
  'Can you fix it?',
  'Can you validate your solution?',
  'Can you explain what you did?',
];

const DOMAIN_ROLES = [
  {
    domain: 'Physical Design',
    code: 'PD',
    slug: 'physical-design',
    pipeline: 'Synthesis · PnR · CTS · STA · PV',
    tagline: 'Turn netlists into timing-clean, manufacturable silicon.',
    roles: [
      'ASIC Physical Design Engineer',
      'STA & Timing Closure Engineer',
      'PnR / Implementation Engineer',
      'Physical Verification (DRC/LVS) Engineer',
      'DFT & Testability Engineer',
      'Power & IR-Drop Analysis Engineer',
    ],
  },
  {
    domain: 'Design Verification',
    code: 'DV',
    slug: 'design-verification',
    pipeline: 'Verilog · SystemVerilog · UVM · Coverage',
    tagline: 'Validate complex architectures against real corner cases.',
    roles: [
      'Design Verification (DV) Engineer',
      'UVM / SystemVerilog Testbench Engineer',
      'ASIC Functional Verification Engineer',
      'SoC Subsystem Verification Engineer',
      'Formal Verification Engineer',
      'Emulation & Validation Engineer',
    ],
  },
  {
    domain: 'Analog Layout',
    code: 'AL',
    slug: 'analog-layout',
    pipeline: 'Custom IC · Matching · Signoff',
    tagline: 'Hand-craft precision circuits that digital flows cannot automate.',
    roles: [
      'Analog Layout Design Engineer',
      'Custom IC Mask Designer',
      'Memory / SRAM Layout Engineer',
      'High-Speed / RF Layout Engineer',
      'IO & ESD Layout Specialist',
      'FinFET / Advanced Node Layout Engineer',
    ],
  },
];

const HELPS = [
  {
    image: '/icons/practice-problems.png',
    title: 'Scenario-based problems with solutions',
    tag: 'Real Problems',
    description: 'Diagnose failing blocks, timing violations, and design bugs just like in real tapeout projects.',
  },
  {
    image: '/icons/practice-tools.png',
    title: 'Hands-on practice with industry tools',
    tag: 'Industry EDA Tools',
    description: 'Run production EDA tool flows from Cadence, Synopsys, and Siemens right in your browser cloud lab.',
  },
  {
    image: '/icons/practice-library.png',
    title: 'Structured VLSI library',
    tag: 'Guided → Independent',
    description: 'Progress seamlessly from step-by-step guided challenges to independent expert-level test cases.',
  },
  {
    image: '/icons/practice-community.png',
    title: 'Access to placement community',
    tag: 'Validated Solves',
    description: 'Build a verified portfolio of solved challenges that semiconductor recruiters recognise and trust.',
  },
];

const STEPS = [
  { title: 'Problem', copy: "Get a design that's already broken." },
  { title: 'Investigate', copy: 'Find the root cause using industry tools.' },
  { title: 'Fix', copy: 'Implement the right solution.' },
  { title: 'Validate', copy: 'Check the results and document your solve.' },
];

export default function FresherPage() {
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const page = audiencePages.find((p) => p.slug === 'individuals')!;
  const path = `/who-we-serve/${page.slug}`;

  return (
    <>
      <Seo
        title={audienceSeo[page.slug]?.title ?? `${page.name} — Who We Serve`}
        description={audienceSeo[page.slug]?.description ?? page.lede}
        path={path}
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Who We Serve', path: '/who-we-serve' },
            { name: page.name, path },
          ]),
        ]}
      />

      <PageHero
        eyebrow={page.eyebrow}
        title={
          <>
            You Learned VLSI.
            <br />
            <span className="text-blue">So Why Aren't You Getting the Job?</span>
          </>
        }
        lede="You know the concepts. You've completed the course. But interviews test what you can actually do."
        image="/images/audiences/fresher-hero.jpg"
        imageAlt="VLSI engineer at a desk debugging waveforms in an EDA tool"
        crumbs={[
          { name: 'Home', to: '/' },
          { name: 'Who We Serve', to: '/who-we-serve' },
          { name: page.name },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button to="/pricing#plans" arrow>
            Start Practising at ₹499
          </Button>
          <button
            type="button"
            onClick={() => setWalkthroughOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-dim transition hover:text-blue"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-blue border border-blue-100">
              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
            </span>
            <span>See 1 min preview</span>
          </button>
        </div>
        <p className="mt-4 text-[13px] text-ink-faint">Real problems. Industry tools. Interview confidence.</p>
      </PageHero>

      {/* ---- The reality: interviews test doing, not knowing ---- */}
      <Section>
        <SectionHead
          eyebrow="the reality"
          title={
            <>
              VLSI Interviews Aren't
              <br />
              Just Theoretical.
            </>
          }
          lede="Knowing the flow is one thing. Debugging a failing design is another."
        />

        {/* Top Part: Questions & Deciding Quote */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Checklist card */}
          <div className="flex flex-col justify-center rounded-3xl border border-line bg-panel p-6 sm:p-8 shadow-card lg:col-span-7">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue" />
              <p className="font-mono text-xs font-bold uppercase tracking-wider text-blue">
                What Technical Interviewers Test
              </p>
            </div>
            <p className="mt-2 text-sm text-ink-dim">
              Interviews don't just ask for tool commands. They evaluate your live diagnostic judgment:
            </p>
            <ul className="mt-5 space-y-3.5">
              {INTERVIEW_CHECKS.map((q) => (
                <li key={q} className="flex items-center gap-3 text-[15px] font-semibold text-ink">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue-50 text-blue">
                    <CheckCircle2 aria-hidden className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote Card */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-blue/20 bg-gradient-to-br from-blue-50/90 via-blue-50/30 to-panel p-6 sm:p-8 shadow-card lg:col-span-5">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-8xl font-black leading-none text-blue/10"
            >
              “
            </span>
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue/10 px-3 py-1 font-mono text-[11px] font-bold text-blue uppercase tracking-wider">
                The Core Question
              </span>
              <p className="mt-4 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                “What have you actually worked on?”
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-dim">
                A question every candidate hears in technical rounds. Knowing the theory gets you into the room; proving you have resolved failing designs gets you the job.
              </p>
            </div>
            <div className="relative mt-6 border-t border-line/70 pt-4 text-[12.5px] font-medium text-ink-faint">
              Interviewers probe whether you have resolved violations on real EDA tools or just memorised workflows.
            </div>
          </div>
        </div>

        {/* Bottom Part: 3 Domains and Specific Job Roles */}
        <div className="mt-12">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">target career tracks</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-ink sm:text-[26px]">
                Job Roles You Become Ready For Across 3 Domains
              </h3>
            </div>
            <p className="text-xs text-ink-faint sm:text-right">
              Explore the exact roles hiring in each semiconductor domain
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {DOMAIN_ROLES.map((d) => (
              <div
                key={d.slug}
                className="group relative flex flex-col justify-between rounded-3xl border border-line bg-panel p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-xs font-bold text-blue">
                      {d.code}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
                      Domain Track
                    </span>
                  </div>

                  <h4 className="mt-3.5 font-display text-lg font-bold text-ink group-hover:text-blue transition-colors">
                    {d.domain}
                  </h4>
                  <p className="mt-1 font-mono text-[11px] font-medium text-ink-dim">
                    {d.pipeline}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-faint">
                    {d.tagline}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                      Target Job Roles:
                    </p>
                    <ul className="space-y-2">
                      {d.roles.map((role) => (
                        <li key={role} className="flex items-start gap-2.5 text-[13.5px] font-medium text-ink-dim">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-line pt-4">
                  <a
                    href={`/domains/${d.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:gap-2.5 transition-all"
                  >
                    <span>View {d.domain} curriculum</span>
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- How Semicon Labs helps ---- */}
      <Section alt>
        <SectionHead
          eyebrow="how semicon labs helps"
          title={
            <>
              You Don't Need Another Course.
              <br />
              You Need Practice.
            </>
          }
          lede="Semicon Labs gives you what your course couldn't."
        />
        <RevealGroup stagger={0.06}>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HELPS.map(({ image, title, tag, description }) => (
              <RevealItem key={title}>
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-panel p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-blue/40 hover:shadow-card-hover">
                  <div>
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50/70 p-2.5 border border-blue-100 transition-transform duration-300 group-hover:scale-105">
                      <img src={image} alt={title} className="h-full w-full object-contain" />
                    </div>
                    <span className="mt-4 block font-mono text-[11px] font-bold uppercase tracking-wider text-blue">
                      {tag}
                    </span>
                    <h3 className="mt-2 text-base font-bold leading-snug text-ink">{title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dim">{description}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </Section>

      {/* ---- The framework: problem → proof ---- */}
      <Section>
        <SectionHead
          eyebrow="the framework your job needs"
          title="From Problem to Proof."
          lede="Not another course. A problem to solve."
        />
        <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {/* Dashed rail behind the step numbers — desktop only, where the four sit in a row. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[6%] right-[6%] top-[23px] hidden h-0.5 lg:block"
            style={{ background: 'repeating-linear-gradient(90deg, #CFD2EC 0 8px, transparent 8px 16px)' }}
          />
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative flex flex-col gap-2">
              <span className="grid h-[46px] w-[46px] place-items-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 font-display text-[17px] font-bold text-white shadow-glow">
                {i + 1}
              </span>
              <h3 className="mt-1 text-base font-bold text-ink">{s.title}</h3>
              <p className="max-w-[220px] text-sm leading-relaxed text-ink-dim">{s.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- More than industry tools + the ₹499 offer ---- */}
      <Section alt>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-14">
            <div className="min-w-0">
              <p className="eyebrow">{page.sectionEyebrow}</p>
              <h2 className="mt-4 text-display-md">{page.sectionTitle}</h2>
              <div className="mt-8 border-t border-line">
                <RevealGroup stagger={0.06}>
                  {page.features.map((f, i) => (
                    <RevealItem key={f.title}>
                      <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[56px_1fr] sm:gap-4">
                        <span className="font-mono text-lg font-bold text-blue">{String(i + 1).padStart(2, '0')}</span>
                        <div>
                          <h3 className="text-base font-bold text-ink">{f.title}</h3>
                          <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-ink-dim">{f.copy}</p>
                        </div>
                      </div>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-7 text-sm leading-relaxed text-ink-dim lg:ml-auto lg:max-w-[280px] lg:text-right">
                {page.sectionLede}
              </p>
              <div className="mx-auto w-full max-w-lg">
                <StarterPackCard />
              </div>
            </aside>
          </div>
      </Section>

      {/* ---- Closing: the interview question this page prepares them for ---- */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(91,78,242,0.38), transparent 55%), #0B0E24',
        }}
      >
        <Container className="flex flex-wrap items-center justify-between gap-10">
          <Reveal className="max-w-[560px]">
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-white/60">
              Your next interview won't ask what you watched.
            </p>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-tight sm:text-[30px]">
              "Tell me about a problem you actually solved."
            </h2>
            <p className="mt-3 text-[15px] text-white/70">Start building that answer with Semicon Labs Launchpad.</p>
            <Button to="/pricing#plans" arrow className="mt-6">
              Start Your Launchpad
            </Button>
          </Reveal>
          <img
            src="/images/chips/chip-neon.jpg"
            alt=""
            loading="lazy"
            className="h-[190px] w-full max-w-[300px] shrink-0 rounded-2xl object-cover shadow-glow ring-1 ring-white/10"
          />
        </Container>
      </section>

      <WalkthroughModal
        open={walkthroughOpen}
        onClose={() => setWalkthroughOpen(false)}
      />
    </>
  );
}
