import { BookOpen, CheckCircle2, Cpu, FolderOpen, Users } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { StarterPackCard } from '@/components/marketing/IndividualOffer';
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

const ROLES = [
  'ASIC Design Engineer',
  'Physical Design Engineer',
  'STA Engineer',
  'Verification Engineer',
  'DFT Engineer',
  'PD / Implementation Engineer',
];

const HELPS = [
  { icon: FolderOpen, title: 'Scenario-based problems with solutions', tag: 'Real Problems' },
  { icon: Cpu, title: 'Hands-on practice with industry tools', tag: 'Industry EDA Tools' },
  { icon: BookOpen, title: 'Structured VLSI library', tag: 'Guided → Independent' },
  { icon: Users, title: 'Access to placement community', tag: 'Validated Solves' },
];

const STEPS = [
  { title: 'Problem', copy: "Get a design that's already broken." },
  { title: 'Investigate', copy: 'Find the root cause using industry tools.' },
  { title: 'Fix', copy: 'Implement the right solution.' },
  { title: 'Validate', copy: 'Check the results and document your solve.' },
];

export default function FresherPage() {
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
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          <ul className="space-y-3.5">
            {INTERVIEW_CHECKS.map((q) => (
              <li key={q} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                <CheckCircle2 aria-hidden className="mt-0.5 h-[18px] w-[18px] shrink-0 text-blue" strokeWidth={2.4} />
                {q}
              </li>
            ))}
          </ul>

          <div className="flex min-h-[180px] flex-col justify-center rounded-2xl border border-line bg-blue-50 px-6 py-6">
            <span aria-hidden className="font-display text-4xl leading-none text-blue/30">“</span>
            <p className="mt-2 text-[17px] font-semibold leading-snug text-ink">What have you actually worked on?</p>
            <p className="mt-2 text-[13px] text-ink-faint">A question every candidate hears.</p>
          </div>

          <ul className="space-y-2.5 border-l-2 border-line pl-6 text-[15px] font-medium text-ink-dim">
            <li className="font-display text-base font-bold text-ink">Physical Design</li>
            {ROLES.map((r) => (
              <li key={r}>{r}</li>
            ))}
            <li className="text-ink-faint">And more…</li>
          </ul>
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HELPS.map(({ icon: Icon, title, tag }) => (
              <RevealItem key={title}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-panel p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-card-hover">
                  <span className="grid h-[42px] w-[42px] place-items-center rounded-xl bg-blue-soft text-blue">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <h3 className="mt-3 text-base font-bold leading-snug text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm text-ink-dim">{tag}</p>
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
          lede="Not another lecture. A problem to solve."
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
    </>
  );
}
