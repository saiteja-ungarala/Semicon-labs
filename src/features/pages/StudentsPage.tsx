import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Play, BookOpen, Cpu, Compass, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { StarterPackCard } from '@/components/marketing/IndividualOffer';
import { WalkthroughModal } from '@/components/marketing/WalkthroughModal';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * /who-we-serve/students — The College Students page (ECE / EEE / VLSI Aspirants).
 * Built from the Students landing comp with side-by-side comparison & dark blue capability strip.
 */

const MISSING_EXPERIENCES = [
  {
    icon: BookOpen,
    title: 'Real Design Problems',
    copy: 'Work on designs with real issues to investigate.',
  },
  {
    icon: Cpu,
    title: 'Industry EDA Tools',
    copy: 'Practise with professional semiconductor workflows.',
  },
  {
    icon: Compass,
    title: 'Guided Practice',
    copy: 'Get direction when you need it, then solve independently.',
  },
  {
    icon: CheckCircle2,
    title: 'Validation',
    copy: 'See whether your solution actually worked.',
  },
];

export default function StudentsPage() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <>
      <Seo
        title="VLSI Cloud Labs for Engineering Students — Semicon Labs"
        description="For ECE, EEE and VLSI aspirants. Bridge the gap between classroom theory and real semiconductor chip design on Cadence, Synopsys and Siemens tools."
        path="/who-we-serve/students"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Who We Serve', path: '/who-we-serve' },
            { name: 'Students', path: '/who-we-serve/students' },
          ]),
        ]}
      />

      {/* ---- Track Switcher Header Bar ---- */}
      <div className="border-b border-line bg-void-2/60">
        <Container className="py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 font-medium">
              <span className="font-mono uppercase tracking-wider text-ink-faint mr-2">Track:</span>
              <span className="rounded-full bg-blue px-3 py-1 font-bold text-white shadow-sm">
                Students
              </span>
              <Link
                to="/who-we-serve/individuals"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Trained Freshers
              </Link>
              <Link
                to="/who-we-serve/teams"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Corporate
              </Link>
              <Link
                to="/who-we-serve/corporates"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Enterprise
              </Link>
            </div>
            <Link
              to="/pricing#plans"
              className="inline-flex items-center gap-1.5 font-bold text-blue hover:underline"
            >
              <span>Open Your First Challenge</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* ---- HERO SECTION ---- */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-6">
              <p className="eyebrow">for ece / eee / vlsi aspirants</p>
              <h1 className="mt-4 font-display text-[34px] font-bold leading-[1.12] text-ink sm:text-[44px] lg:text-[48px]">
                You Chose Electronics.
                <br />
                <span className="text-blue">You Have Two Different Futures.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-dim sm:text-lg">
                Same degree. Same syllabus. But what will you actually be doing after graduation?
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/pricing#plans" arrow>
                  Start Practising at ₹499
                </Button>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-dim transition hover:text-blue"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-blue border border-blue-100">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                  <span>See 1 min preview</span>
                </button>
              </div>
            </div>

            {/* Right Hero Visual: Real Students Experience Image */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-2 shadow-2xl transition-all duration-500 hover:shadow-card-hover">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/images/audiences/students-hero.jpg"
                    alt="Engineering student practicing real semiconductor design workflows"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- SECTION 2: AFTER GRADUATION, WHICH ONE WILL YOU BE? (SIDE BY SIDE LAYOUT) ---- */}
      <Section alt>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5">
            <p className="eyebrow">two different paths</p>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-[1.15] text-ink sm:text-[38px] lg:text-[42px]">
              After Graduation,
              <br />
              <span className="text-blue">Which One Will You Be?</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-dim sm:text-lg">
              Same subjects. Same degree. Very different experience.
            </p>
            <div className="mt-8 hidden lg:block border-t border-line pt-6">
              <p className="text-xs font-medium leading-relaxed text-ink-faint">
                Textbook theory gets you the diploma. Hands-on diagnostic experience on real EDA tools builds the engineering confidence you need to clear semiconductor interviews.
              </p>
            </div>
          </div>

          {/* Right Column: The two comparison tables */}
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Card 1: Without Real Design Experience */}
              <div className="flex flex-col justify-between rounded-3xl border border-line bg-panel p-5 sm:p-6 shadow-card">
                <div>
                  {/* Real Photo: Graduate facing theoretical doubts */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-line/60 mb-5 bg-void-2">
                    <img
                      src="/images/audiences/students-path-without.jpg"
                      alt="Graduate facing theoretical doubts"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-danger/10 text-danger text-[11px] font-bold">
                      ✕
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">
                      Without Real Design Experience
                    </h3>
                  </div>

                  <ul className="space-y-2.5 border-t border-line pt-3.5">
                    {[
                      'Mostly theoretical knowledge',
                      'No hands-on experience with industry EDA tools',
                      'No real design problem to explain',
                      'Limited project story in interviews',
                    ].map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs text-ink-dim">
                        <X className="h-3.5 w-3.5 text-danger/80 shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card 2: With Semicon Labs Experience */}
              <div className="flex flex-col justify-between rounded-3xl border-2 border-blue/40 bg-gradient-to-b from-blue-50/50 to-panel p-5 sm:p-6 shadow-card">
                <div>
                  {/* Real Photo: Engineer with verified design practice */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-blue/20 mb-5 bg-blue-50/30">
                    <img
                      src="/images/audiences/students-path-with.jpg"
                      alt="Engineer with verified design practice"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-blue-soft text-blue text-[11px] font-bold">
                      ✓
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">
                      With Semicon Labs Experience
                    </h3>
                  </div>

                  <ul className="space-y-2.5 border-t border-line pt-3.5">
                    {[
                      'Hands-on with real design problems',
                      'Use industry EDA tools in cloud labs',
                      'Understand the VLSI flow through practice',
                      'Build a project story you can confidently explain',
                    ].map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-xs font-medium text-ink">
                        <Check className="h-3.5 w-3.5 text-blue shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- SECTION 3: THE MISSING EXPERIENCE (DARK BLUE BACKGROUND STRIP LIKE CORPORATES) ---- */}
      <section
        className="py-16 text-white sm:py-20"
        style={{
          background: 'linear-gradient(180deg, #0A0D22 0%, #0F1433 100%)',
        }}
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              the missing experience
            </p>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-tight sm:text-[38px] text-white">
              Your College Taught You the Concepts.
              <br />
              <span className="text-blue-300">Semicon Labs Lets You Practice Them.</span>
            </h2>
            <p className="mt-3 text-base text-white/70 max-w-xl mx-auto">
              Step away from PPT slides. Build engineering confidence with real problem scenarios.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {MISSING_EXPERIENCES.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.08]"
              >
                <div>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-blue-300 border border-white/15">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---- SECTION 4: RECOMMENDED STARTING POINT (STARTER PACK) ---- */}
      <Section alt>
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <span className="eyebrow">recommended starting point</span>
            <h3 className="mt-1 font-display text-2xl font-bold text-ink">
              Start Hands-on with VLSI Launch Pad
            </h3>
            <p className="mt-1 text-sm text-ink-dim">
              Get 10 hours of real Cadence, Synopsys and Siemens cloud labs for just ₹499.
            </p>
          </div>
          <StarterPackCard />
        </div>
      </Section>

      {/* ---- SECTION 5: FINAL CTA BANNER (DARK THEME) ---- */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(91,78,242,0.38), transparent 55%), #0B0E24',
        }}
      >
        <Container className="relative">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                Your future in VLSI starts before graduation.
              </p>
              <h2 className="mt-3 font-display text-[32px] font-bold leading-tight sm:text-[40px]">
                See It. Try It. Experience It.
              </h2>
              <p className="mt-3 max-w-lg text-base text-white/70">
                Explore how semiconductor engineering actually looks like, and open your first real design challenge.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/pricing#plans" arrow>
                  Open Your First Challenge
                </Button>
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:text-white"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white border border-white/20">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                  <span>See 1 min preview</span>
                </button>
              </div>
            </div>

            {/* Silicon Die in Hand Artwork */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl">
                <img
                  src="/images/audiences/students-chip-glow.jpg"
                  alt="Future of Semiconductor Engineering - Silicon Die in Hand"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Platform Walkthrough Video Modal */}
      <WalkthroughModal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </>
  );
}
