import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Play, BookOpen, Cpu, Compass, CheckCircle2 } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { StarterPackCard } from '@/components/marketing/IndividualOffer';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * /who-we-serve/students — The College Students page (ECE / EEE / E&I).
 * Built from the new Students landing comp.
 */

const TYPICAL_PATH = [
  'VLSI (theory)',
  'Verilog (lectures)',
  'Assignments',
  'Theory exams',
  'No real design',
  'Graduate with a degree',
];

const SEMICON_PATH = [
  'Work on real designs',
  'Use industry EDA tools',
  'Solve actual problems',
  'Build a project story',
  'Be ready for what\'s next',
];

const FLOW_STEPS = [
  {
    step: '1',
    title: 'RTL / Verilog',
    label: 'Module & Testbench Code',
    placeholder: 'Code Editor Screenshot (e.g. Verilog ALU / FSM)',
  },
  {
    step: '2',
    title: 'Synthesis',
    label: 'Design & Timing Reports',
    placeholder: 'Synthesis Report Screenshot (Area, Timing, Gate Count)',
  },
  {
    step: '3',
    title: 'Place & Route',
    label: 'Floorplan & Routing Layout',
    placeholder: 'PnR Layout Screenshot (Def, Macro Placement, Routes)',
  },
  {
    step: '4',
    title: 'Timing / STA',
    label: 'Slack & Waveform Analysis',
    placeholder: 'STA Waveforms & Violation Debugging Graph',
  },
];

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
        description="For ECE, EEE and E&I students. Bridge the gap between classroom theory and real semiconductor chip design on Cadence, Synopsys and Siemens tools."
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
              <p className="eyebrow">for ece / eee / e&i students</p>
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
                  Watch Your Future
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

            {/* Right Hero Comparison Visual (with Image Space) */}
            <div className="lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Side A: Typical Path */}
                <div className="flex flex-col justify-between rounded-3xl border border-line bg-panel p-6 shadow-card">
                  <div>
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-ink-faint">
                      The typical path
                    </span>
                    <ul className="mt-4 space-y-2.5">
                      {TYPICAL_PATH.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-medium text-ink-dim">
                          <Check className="h-3.5 w-3.5 text-ink-faint shrink-0" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Placeholder Space */}
                  <div className="mt-6 aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-line bg-void-2 flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[11px] font-bold text-ink-faint">
                      [Image Space]
                    </span>
                    <span className="mt-1 text-[11px] text-ink-faint">
                      Student studying theoretical textbooks
                    </span>
                  </div>
                </div>

                {/* Side B: Semicon Labs Path */}
                <div className="flex flex-col justify-between rounded-3xl border-2 border-blue/30 bg-gradient-to-b from-blue-50/60 via-panel to-panel p-6 shadow-card">
                  <div>
                    <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-blue">
                      The other path with Semicon Labs
                    </span>
                    <ul className="mt-4 space-y-2.5">
                      {SEMICON_PATH.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs font-semibold text-ink">
                          <Check className="h-3.5 w-3.5 text-blue shrink-0" strokeWidth={3} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Placeholder Space */}
                  <div className="mt-6 aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-blue/30 bg-blue-50/40 flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-[11px] font-bold text-blue">
                      [Image Space]
                    </span>
                    <span className="mt-1 text-[11px] text-blue/70">
                      Student with real EDA tool waveforms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- SECTION 2: AFTER GRADUATION, WHICH ONE WILL YOU BE? ---- */}
      <Section alt>
        <SectionHead
          eyebrow="two different paths"
          title="After Graduation, Which One Will You Be?"
          lede="Same subjects. Same degree. Very different experience."
        />

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Card 1: Without Real Design Experience */}
          <div className="flex flex-col justify-between rounded-3xl border border-line bg-panel p-6 sm:p-8 shadow-card">
            <div>
              {/* Image Space */}
              <div className="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-line bg-void-2 flex flex-col items-center justify-center p-4 text-center mb-6">
                <span className="font-mono text-xs font-bold text-ink-faint">
                  [Image Space]
                </span>
                <span className="mt-1 text-xs text-ink-faint">
                  Graduate facing theoretical doubts
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-danger/10 text-danger text-xs font-bold">
                  ✕
                </span>
                <h3 className="font-display text-lg font-bold text-ink">
                  Without Real Design Experience
                </h3>
              </div>

              <ul className="space-y-3 border-t border-line pt-4">
                {[
                  'Mostly theoretical knowledge',
                  'No hands-on experience with industry EDA tools',
                  'No real design problem to explain',
                  'Limited project story in interviews',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm text-ink-dim">
                    <X className="h-4 w-4 text-danger/80 shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: With Semicon Labs Experience */}
          <div className="flex flex-col justify-between rounded-3xl border-2 border-blue/40 bg-gradient-to-b from-blue-50/50 to-panel p-6 sm:p-8 shadow-card">
            <div>
              {/* Image Space */}
              <div className="aspect-[16/9] w-full rounded-2xl border-2 border-dashed border-blue/30 bg-blue-50/50 flex flex-col items-center justify-center p-4 text-center mb-6">
                <span className="font-mono text-xs font-bold text-blue">
                  [Image Space]
                </span>
                <span className="mt-1 text-xs text-blue/70">
                  Engineer with verified design practice
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-blue-soft text-blue text-xs font-bold">
                  ✓
                </span>
                <h3 className="font-display text-lg font-bold text-ink">
                  With Semicon Labs Experience
                </h3>
              </div>

              <ul className="space-y-3 border-t border-line pt-4">
                {[
                  'Hands-on with real design problems',
                  'Use industry EDA tools in cloud labs',
                  'Understand the VLSI flow through practice',
                  'Build a project story you can confidently explain',
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                    <Check className="h-4 w-4 text-blue shrink-0 mt-0.5" strokeWidth={2.5} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- SECTION 3: YOU STUDIED VLSI. BUT HAVE YOU EVER WORKED ON A REAL DESIGN? ---- */}
      <Section>
        <SectionHead
          eyebrow="same knowledge. different exposure."
          title={
            <>
              You Studied VLSI.
              <br />
              But Have You Ever Worked on a Real Design?
            </>
          }
          lede="You may know the concepts. The missing part is experiencing how those concepts come together in a real design flow."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FLOW_STEPS.map((s) => (
            <div
              key={s.step}
              className="flex flex-col justify-between rounded-3xl border border-line bg-panel p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
            >
              <div>
                {/* Step badge & Title */}
                <div className="flex items-center gap-2.5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-blue text-xs font-bold text-white shadow-sm">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{s.title}</h3>
                    <p className="text-[11px] text-ink-faint">{s.label}</p>
                  </div>
                </div>

                {/* Screenshot Placeholder Space */}
                <div className="mt-4 aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-line bg-void-2 flex flex-col items-center justify-center p-3 text-center">
                  <span className="font-mono text-[11px] font-bold text-ink-faint">
                    [Image Space]
                  </span>
                  <span className="mt-1 text-[10.5px] leading-tight text-ink-dim">
                    {s.placeholder}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- SECTION 4: THE MISSING EXPERIENCE ---- */}
      <Section alt>
        <SectionHead
          eyebrow="the missing experience"
          title="Your College Taught You the Concepts. Semicon Labs Lets You Practice Them."
          lede="Step away from PPT slides. Build engineering confidence with real problem scenarios."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MISSING_EXPERIENCES.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-3xl border border-line bg-panel p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-card-hover"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-soft text-blue">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{copy}</p>
            </div>
          ))}
        </div>

        {/* Existing Website Starter Pack Card Combined (as requested) */}
        <div className="mt-14 max-w-xl mx-auto">
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

            {/* Image Placeholder Space for Chip / Wafer */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full rounded-3xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-xs font-bold text-white/60">
                  [Image Space]
                </span>
                <span className="mt-1 text-xs text-white/40">
                  Silicon Die / Chip Hardware Artwork (Ideas · Designs · Chips · Careers)
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Video Modal Stub */}
      {videoModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl bg-panel p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-line">
              <h3 className="font-display font-bold text-ink">Platform Walkthrough Preview</h3>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                className="text-ink-faint hover:text-ink text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 aspect-video w-full rounded-xl bg-ink flex items-center justify-center text-white/60 text-sm">
              [Platform Video Walkthrough]
            </div>
          </div>
        </div>
      )}
    </>
  );
}
