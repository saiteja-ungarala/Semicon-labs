import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHead } from '@/components/ui/Section';
import { HandArrow } from '@/components/marketing/HandArrow';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { cn } from '@/lib/cn';

/**
 * "Everything your VLSI Career needs. That no one ever provided till now" —
 * the eight launch benefits as icon tiles. The toggle flips the grid into the
 * "without Semicon Labs" world: everything greys out, scatters, and each tile
 * shows the handwritten alternative you'd be stuck with.
 */

const benefits = [
  { icon: '/icons/projects.svg', title: "Projects you haven't solved Before", copy: 'Real failures from real flows. Not textbook repeats.', without: 'the same toy projects' },
  { icon: '/icons/ai.svg', title: 'AI Powered Learning', copy: 'Guidance that adapts to how you debug — not a fixed script.', without: 'generic video courses' },
  { icon: '/icons/library.svg', title: '50+ skills\n100+ modules', copy: 'Master essential VLSI skills through comprehensive modules.', without: 'limited topics' },
  { icon: '/icons/testcases.svg', title: '1500+ Real world scenarios', copy: 'The largest solvable real world scenario bank in VLSI learning.', without: 'a handful of demos' },
  { icon: '/icons/access247.png', title: '24x7 Access Your Labs Anytime, Anywhere', copy: 'The lab is open whenever you are — no seat queue, no lab hours.', without: 'waiting for a lab seat' },
  { icon: '/icons/library.svg', title: 'Lifetime free VLSI premium Library', copy: 'The reference material stays yours, forever.', without: 'scattered PDFs' },
  { icon: '/icons/certification.png', title: 'Validated Industry Certification', copy: 'Certification backed by solves the platform actually verified.', without: 'an unverified PDF' },
  { icon: '/icons/placements.svg', title: 'Access to placement community', copy: 'A recruiter network that sees your verified skills.', without: 'cold-applying alone' },
];

const scatter: [number, number, number][] = [
  [-26, 14, -8], [18, -12, 6], [-14, 20, -5], [30, 10, 9],
  [22, -16, 7], [-30, 8, -9], [12, 18, 5], [-18, -10, -6],
];

function ConnectingLines({ hidden }: { hidden: boolean }) {
  return (
    <svg
      className={cn(
        'pointer-events-none absolute inset-0 z-0 hidden h-full w-full text-line transition-opacity duration-500 sm:block',
        hidden ? 'opacity-0' : 'opacity-100',
      )}
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
    >
      {[
        'M 125,80 C 250,40 300,40 375,80',
        'M 375,80 C 500,120 550,120 625,80',
        'M 625,80 C 750,40 800,40 875,80',
        'M 125,220 C 250,180 300,180 375,220',
        'M 375,220 C 500,260 550,260 625,220',
        'M 625,220 C 750,180 800,180 875,220',
      ].map((d, i) => (
        <path key={i} d={d} stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="6 6" />
      ))}
    </svg>
  );
}

export function PlatformModules() {
  const reduce = useReducedMotion();
  const [without, setWithout] = useState(false);

  return (
    <Section id="modules" className="overflow-hidden">
      <SectionHead
        eyebrow="miss semicon labs, miss every benefit."
        title={
          <>
            Everything your VLSI Career needs.
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">That no one ever provided till now.</span>
          </>
        }
        right={
          <div className="relative">
            {/* Hand-drawn arrow so the eye lands on the toggle — without it the
                control reads as decoration next to the heading. */}
            <div aria-hidden className="pointer-events-none absolute -left-7 -top-[56px] hidden h-[54px] w-[110px] lg:block">
              <HandArrow variant="to-toggle" className="inset-0 h-full w-full" delay={0.35} />
            </div>
            <button
              type="button"
              onClick={() => setWithout((v) => !v)}
              className="group flex min-h-11 max-w-xs items-center gap-3 py-1 text-left"
              aria-pressed={without}
            >
            <span className="text-blue transition-colors">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2Z" />
              </svg>
            </span>
            <span className={cn('relative h-7 w-12 shrink-0 rounded-full transition-colors', without ? 'bg-blue' : 'bg-line-strong')}>
              <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', without ? 'left-6' : 'left-1')} />
            </span>
              {without ? (
                <span className="text-sm font-bold text-ink">
                  Semicon Labs brings it all back — <span className="text-blue">every benefit, one platform.</span>
                </span>
              ) : (
                <span className="whitespace-nowrap font-hand text-xl font-bold text-ink">
                  Imagine <span className="text-blue">without</span> Semicon Labs…
                </span>
              )}
            </button>
          </div>
        }
      />

      <div className="relative mx-auto mt-16 max-w-5xl px-4">
        <ConnectingLines hidden={without} />

        <RevealGroup
          className="relative z-10 grid grid-cols-2 justify-items-center gap-x-6 gap-y-16 py-8 sm:grid-cols-4"
          stagger={0.1}
        >
          {benefits.map((b, i) => {
            const [sx, sy, sr] = scatter[i % scatter.length];
            return (
              <RevealItem key={b.title} direction="down">
                <motion.div
                  animate={
                    reduce
                      ? undefined
                      : without
                        ? { x: sx, y: sy, rotate: sr, scale: 0.94 }
                        : { x: 0, y: 0, rotate: 0, scale: 1 }
                  }
                  transition={{ type: 'spring', stiffness: 160, damping: 15 }}
                  className="group relative flex cursor-pointer flex-col items-center gap-4"
                >
                  {/* Icon container */}
                  <div
                    className={cn(
                      'relative flex h-[72px] w-[72px] items-center justify-center overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition-all duration-500 sm:h-20 sm:w-20',
                      without ? 'opacity-40 grayscale' : 'hover:shadow-md',
                    )}
                  >
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: 'radial-gradient(circle at 30% 30%, rgba(37, 99, 235, 0.05), transparent 70%)' }}
                    />
                    <img
                      src={b.icon}
                      alt=""
                      aria-hidden
                      className="relative z-10 h-10 w-10 transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11"
                      loading="lazy"
                    />
                  </div>

                  {/* Benefit name — struck through in the "without" world */}
                  <span
                    className={cn(
                      'max-w-[150px] text-center text-[13px] font-semibold leading-tight transition-colors duration-500 sm:text-sm whitespace-pre-line',
                      without ? 'text-ink-faint line-through decoration-red-500/80 decoration-2' : 'text-ink',
                    )}
                  >
                    {b.title}
                  </span>

                  {/* The handwritten alternative you're left with */}
                  <span
                    aria-hidden={!without}
                    className={cn(
                      'pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-hand text-lg font-bold text-red-600 transition-all duration-500',
                      without ? 'rotate-[-3deg] opacity-90' : 'opacity-0',
                    )}
                  >
                    {b.without}
                  </span>

                  {/* Hover tagline tooltip (only in the "with" world) */}
                  {!without && (
                    <div className="pointer-events-none absolute -bottom-10 left-1/2 z-30 hidden -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100 sm:block">
                      <span className="rounded-lg border border-line bg-panel px-2.5 py-1.5 text-[11px] text-ink-dim shadow-sm backdrop-blur-sm">
                        {b.copy}
                      </span>
                    </div>
                  )}
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Footer link — the toggle now lives beside the section heading */}
        <div className="relative z-10 mt-14 flex justify-center border-t border-line pt-6">
          <a href="#pricing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition hover:gap-2.5">
            Lock every benefit <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
