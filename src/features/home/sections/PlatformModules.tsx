import { Section, SectionHead } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';

/**
 * "Everything your VLSI Career needs. That no one ever provided till now" —
 * the eight launch benefits, each an icon card. FOMO framing is deliberate:
 * miss Semicon Labs, miss every one of these.
 */

const benefits = [
  { icon: '/icons/placements.svg', title: 'Placement Community Access', copy: 'A 200+ recruiter network that sees your verified skills.' },
  { icon: '/icons/ai.svg', title: 'AI Powered Learning', copy: 'Guidance that adapts to how you debug — not a fixed script.' },
  { icon: '/icons/projects.svg', title: "Projects you haven't solved Before", copy: 'Real failures from real flows. Not textbook repeats.' },
  { icon: '/icons/library.svg', title: 'Lifetime free VLSI premium Library', copy: 'The reference material stays yours, forever.' },
  { icon: '/icons/hourly.svg', title: 'Hourly based sessions', copy: 'Industry EDA tools by the hour — pay for what you use.' },
  { icon: '/icons/testcases.svg', title: '1500+ Testcases', copy: 'The largest solvable testcase bank in VLSI learning.' },
  { icon: '/icons/progress.svg', title: 'Progress Tracking', copy: 'Every solve measured, every competency proven.' },
  { icon: '/icons/affordable.svg', title: 'Affordable', copy: 'Priced for learners — not for corporate budgets.' },
];

function ConnectingLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100 hidden sm:block text-line"
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
    >
      {/* Curved connecting paths between module positions */}
      {[
        'M 125,80 C 250,40 300,40 375,80',
        'M 375,80 C 500,120 550,120 625,80',
        'M 625,80 C 750,40 800,40 875,80',
        'M 125,220 C 250,180 300,180 375,220',
        'M 375,220 C 500,260 550,260 625,220',
        'M 625,220 C 750,180 800,180 875,220',
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="6 6"
        />
      ))}
    </svg>
  );
}

export function PlatformModules() {
  return (
    <Section id="modules" className="overflow-hidden">
      <SectionHead
        eyebrow="miss semicon labs, miss every benefit."
        title={
          <>
            Everything your VLSI Career needs.
            <br className="hidden sm:block" /> That no one ever provided till now.
          </>
        }
        lede="Each of these exists on this platform and nowhere else — together, they're the reason early registrants don't wait."
      />

      <div className="relative mx-auto max-w-5xl mt-16 px-4">
        <ConnectingLines />

        <RevealGroup className="grid grid-cols-2 sm:grid-cols-4 gap-y-16 gap-x-6 justify-items-center py-8 relative z-10" stagger={0.1}>
          {benefits.map((b) => (
            <RevealItem key={b.title} direction="down">
              <div className="group relative flex flex-col items-center gap-4 cursor-pointer">
                {/* Icon container */}
                <div
                  className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden bg-panel border border-line"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.05), transparent 70%)`,
                    }}
                  />
                  <img src={b.icon} alt="" aria-hidden className="relative z-10 h-7 w-7 transition-transform duration-300 group-hover:scale-110" loading="lazy" />
                </div>

                {/* Module name */}
                <span className="text-[13px] sm:text-sm font-semibold text-ink text-center leading-tight max-w-[120px]">
                  {b.title}
                </span>

                {/* Hover tagline tooltip */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 whitespace-nowrap hidden sm:block">
                  <span className="text-[11px] text-ink-dim bg-panel backdrop-blur-sm px-2.5 py-1.5 rounded-lg shadow-sm border border-line">
                    {b.copy}
                  </span>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
