import { Link } from 'react-router-dom';
import { Check, CheckCircle2, Users, Layers, Award, Terminal, Wrench, ShieldCheck, Activity } from 'lucide-react';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CorporateEnquiryForm } from '@/components/marketing/CorporateEnquiryForm';
import { audiencePages } from '@/data/audiencePages';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * /who-we-serve/teams & /who-we-serve/corporates — Corporate Engineering Teams page.
 * Built from the new Corporate landing comp + combined existing website features and plans.
 */

const PIPELINE_FLOW = [
  { name: 'RTL Design', icon: Terminal },
  { name: 'Verification', icon: ShieldCheck },
  { name: 'Physical Design', icon: Layers },
  { name: 'STA', icon: Activity },
  { name: 'Debug', icon: Wrench },
  { name: 'Signoff', icon: CheckCircle2 },
];

const CAPABILITIES = [
  {
    icon: Wrench,
    title: 'Real Industry Problems',
    copy: 'Work on problems that require investigation.',
    badge: 'Real Problems',
  },
  {
    icon: Terminal,
    title: 'Industry EDA Tools',
    copy: 'Practise with the tools used in real projects.',
    badge: 'Cadence · Synopsys · Siemens',
  },
  {
    icon: Layers,
    title: 'Cross-Domain Practice',
    copy: 'Build competencies outside their current project scope.',
    badge: 'Multi-Domain',
  },
  {
    icon: ShieldCheck,
    title: 'Validated Solutions',
    copy: 'Know what they solved — and whether they solved it correctly.',
    badge: 'Objective Signoff',
  },
];

const TEAM_PILLARS = [
  {
    title: 'Access',
    copy: 'Individual logins for your team.',
    icon: Users,
  },
  {
    title: 'Practice',
    copy: 'Structured learning programs.',
    icon: Layers,
  },
  {
    title: 'Assess',
    copy: 'Track progress and competency.',
    icon: Activity,
  },
  {
    title: 'Measure',
    copy: 'Get visibility on outcomes.',
    icon: Award,
  },
];

export default function CorporatePage() {
  const corporateData = audiencePages.find((p) => p.slug === 'teams')!;

  return (
    <>
      <Seo
        title="VLSI Cloud Labs for Corporate Engineering Teams — Semicon Labs"
        description="Upskill semiconductor engineering cohorts on industry-standard Cadence, Synopsys and Siemens EDA workflows with zero infrastructure overhead."
        path="/who-we-serve/teams"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Who We Serve', path: '/who-we-serve' },
            { name: 'Corporates', path: '/who-we-serve/teams' },
          ]),
        ]}
      />

      {/* ---- Track Switcher Header Bar ---- */}
      <div className="border-b border-line bg-void-2/60">
        <Container className="py-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-1.5 font-medium">
              <span className="font-mono uppercase tracking-wider text-ink-faint mr-2">Track:</span>
              <Link
                to="/who-we-serve/students"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Students
              </Link>
              <Link
                to="/who-we-serve/individuals"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Trained Freshers
              </Link>
              <span className="rounded-full bg-blue px-3 py-1 font-bold text-white shadow-sm">
                Corporate
              </span>
              <Link
                to="/who-we-serve/corporates"
                className="rounded-full px-3 py-1 text-ink-dim hover:bg-void hover:text-ink transition"
              >
                Enterprise
              </Link>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 font-bold text-blue hover:underline"
            >
              <span>Talk to Us</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Container>
      </div>

      {/* ---- HERO SECTION (DARK THEME) ---- */}
      <section
        className="relative overflow-hidden pt-14 pb-20 text-white lg:pt-20 lg:pb-28"
        style={{
          background: 'radial-gradient(ellipse at 80% 30%, rgba(91,78,242,0.42), transparent 60%), #0A0D22',
        }}
      >
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column */}
            <div className="lg:col-span-6">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                for engineering teams
              </p>
              <h1 className="mt-4 font-display text-[36px] font-bold leading-[1.1] text-white sm:text-[46px] lg:text-[52px]">
                Keep Your Team
                <br />
                <span className="text-blue-300">Industry-Ready.</span>
              </h1>
              <p className="mt-4 font-display text-xl font-medium text-white/90 sm:text-2xl">
                Give engineers the practice their projects can't.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                Build cross-domain skills with real industry problems, professional EDA tools and structured hands-on programs.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button to="/contact" arrow>
                  Talk to Us
                </Button>
              </div>
            </div>

            {/* Right Hero Image Space */}
            <div className="lg:col-span-6">
              <div className="aspect-[4/3] w-full rounded-3xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-xs font-bold text-white/70">
                  [Image Space]
                </span>
                <span className="mt-1 text-xs text-white/40">
                  Engineering team collaborating around multi-monitor EDA workstations
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- SECTION 2: YOUR PROJECT HAS A SCOPE. YOUR ENGINEERS SHOULDN'T. ---- */}
      <Section>
        <SectionHead
          eyebrow="your project has a scope."
          title="Your Engineers Shouldn't."
          lede="Give your teams practical exposure across the semiconductor design flow."
        />

        <div className="relative mt-8">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {PIPELINE_FLOW.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.name}
                  className="group relative flex flex-col items-center rounded-2xl border border-line bg-panel p-5 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-blue border border-blue-100 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="mt-3 font-display text-sm font-bold text-ink">
                    {f.name}
                  </span>
                  {i < PIPELINE_FLOW.length - 1 && (
                    <span
                      aria-hidden
                      className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-ink-faint font-mono text-xs z-10"
                    >
                      →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ---- SECTION 3: REAL PROBLEMS. REAL TOOLS. BROADER SKILLS. (DARK THEME) ---- */}
      <section
        className="py-16 text-white sm:py-20"
        style={{
          background: 'linear-gradient(180deg, #0A0D22 0%, #0F1433 100%)',
        }}
      >
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              give engineers access to real practice.
            </p>
            <h2 className="mt-3 font-display text-[30px] font-bold leading-tight sm:text-[38px]">
              Real Problems. Real Tools. Broader Skills.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.08]"
                >
                  <div>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-blue-300 border border-white/15">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="mt-4 block font-mono text-[11px] font-bold uppercase tracking-wider text-blue-300">
                      {c.badge}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-white">{c.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">{c.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---- SECTION 4: GIVE EVERY ENGINEER A LAB WITHOUT BUILDING ONE ---- */}
      <Section>
        <SectionHead
          eyebrow="individual logins. structured programs."
          title="Give Every Engineer a Lab Without Building One."
          lede="Provision access for your teams and let them practise, assess and measure — without infrastructure hassles."
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left Side: Mockup Image Placeholder */}
          <div className="lg:col-span-7">
            <div className="aspect-[16/10] w-full rounded-3xl border-2 border-dashed border-line bg-void-2 flex flex-col items-center justify-center p-6 text-center">
              <span className="font-mono text-xs font-bold text-ink">
                [Dashboard Interface Space]
              </span>
              <span className="mt-1 text-xs text-ink-dim max-w-sm">
                Team Access Dashboard: User Roster (Akhil R, Priya S, Vikram K), Progress Analytics, and Lab Assignments
              </span>
            </div>
          </div>

          {/* Right Side: 4 Pillars */}
          <div className="space-y-4 lg:col-span-5">
            {TEAM_PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-4 shadow-card transition-all hover:border-blue/30"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-soft text-blue">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{p.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-dim">{p.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* ---- SECTION 5: WHY CORPORATES CHOOSE SEMICON LABS (EXISTING CONTENT COMBINED) ---- */}
      <Section alt>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="eyebrow">{corporateData.sectionEyebrow}</p>
            <h2 className="mt-4 font-display text-[30px] font-bold text-ink sm:text-[36px]">
              {corporateData.sectionTitle}
            </h2>
            <p className="mt-3 text-base text-ink-dim leading-relaxed">
              {corporateData.sectionLede}
            </p>

            <div className="mt-8 border-t border-line">
              {corporateData.features.map((f, i) => (
                <div
                  key={f.title}
                  className="grid gap-2 border-b border-line py-5 sm:grid-cols-[56px_1fr] sm:gap-4"
                >
                  <span className="font-mono text-base font-bold text-blue">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-dim">{f.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Corporate Plans & Enquiry Form */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Corporate Plans Card (as in Image 3) */}
            <div className="rounded-3xl border border-line bg-panel p-6 sm:p-8 shadow-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink-faint">
                  Corporate Plans
                </span>
                <span className="rounded-full bg-blue-soft px-2.5 py-0.5 font-mono text-[10.5px] font-bold text-blue uppercase">
                  Most Popular
                </span>
              </div>

              {/* Tiers Grid */}
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line bg-void-2/60 p-4 text-center">
                  <span className="font-mono text-xs font-semibold uppercase text-ink-faint">Basic</span>
                  <div className="mt-1 font-mono text-2xl font-bold text-ink">₹12,000</div>
                  <span className="text-[11px] text-ink-faint">per session</span>
                </div>
                <div className="rounded-2xl border-2 border-blue bg-blue-50/60 p-4 text-center shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase text-blue">Pro</span>
                  <div className="mt-1 font-mono text-2xl font-bold text-ink">₹13,500</div>
                  <span className="text-[11px] text-blue-700">per session</span>
                </div>
              </div>

              <p className="mt-3 text-[11.5px] text-ink-faint text-center">
                1 session = 1 seat × 1 month × 240 lab hours · minimum 2 sessions
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-xs text-ink-dim">
                {[
                  'Every PD & DV module included',
                  'Dedicated admin and manager accounts',
                  'Automated practical evaluation + certification',
                  'Up to 30% off at 5 sessions',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue shrink-0" strokeWidth={2.5} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Button to="/contact" arrow className="w-full">
                  Talk to Us for Custom Rollout
                </Button>
              </div>
            </div>

            {/* Corporate Enquiry Form */}
            <div className="rounded-3xl border border-line bg-panel p-6 shadow-card">
              <h4 className="font-display text-base font-bold text-ink">Request a Team Demo</h4>
              <p className="mt-1 text-xs text-ink-dim mb-4">
                Leave your details to schedule a live EDA lab demo.
              </p>
              <CorporateEnquiryForm />
            </div>
          </aside>
        </div>
      </Section>

      {/* ---- SECTION 6: FINAL CLOSING CALLOUT ---- */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(91,78,242,0.38), transparent 55%), #0B0E24',
        }}
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
                from project-dependent skills to broader capability.
              </p>
              <h2 className="mt-3 font-display text-[32px] font-bold leading-tight sm:text-[40px]">
                Make Your Team Ready Before the Project Needs Them.
              </h2>
              <p className="mt-3 max-w-lg text-base text-white/70">
                Real labs. Real problems. Measured outcomes.
              </p>

              <div className="mt-8">
                <Button to="/contact" arrow>
                  Talk to Us
                </Button>
              </div>
            </div>

            {/* Hardware / Cleanroom Image Space */}
            <div className="lg:col-span-5">
              <div className="aspect-[4/3] w-full rounded-3xl border-2 border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-xs font-bold text-white/60">
                  [Image Space]
                </span>
                <span className="mt-1 text-xs text-white/40">
                  Wafer Probe / Silicon Inspection Equipment in cleanroom
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
