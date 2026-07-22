import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHead } from '@/components/ui/Section';
import { cn } from '@/lib/cn';

/**
 * "Everything your VLSI career needs" — the curriculum as activatable modules,
 * modeled on the client's Platform Modules reference. A toggle flips the grid
 * between a unified platform and scattered, pick-your-own modules — the cards
 * dramatically explode apart and reassemble. Each card links into its track.
 */

type ModuleItem = {
  key: string;
  label: string;
  kind: 'Domain' | 'Skill' | 'Test Cases';
  to: string;
  soon?: boolean;
  icon: ReactNode;
};

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

const modules: ModuleItem[] = [
  { key: 'pd', label: 'Physical Design', kind: 'Domain', to: '/domains/physical-design', icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><rect x="7" y="7" width="10" height="10" rx="1" /><path d="M12 2v5M12 17v5M2 12h5M17 12h5" /></svg>) },
  { key: 'dv', label: 'Design Verification', kind: 'Domain', to: '/domains/design-verification', icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><path d="M4 12h3l2 5 4-12 2 7h5" /></svg>) },
  { key: 'sta', label: 'Static Timing', kind: 'Skill', to: '/domains/physical-design', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>) },
  { key: 'pnr', label: 'Place & Route', kind: 'Skill', to: '/domains/physical-design', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8 6h6a2 2 0 0 1 2 2v8" /></svg>) },
  { key: 'cts', label: 'Clock Tree Synthesis', kind: 'Skill', to: '/domains/physical-design', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><path d="M12 4v6M6 20v-4M18 20v-4M6 16h12M12 10v6" /><circle cx="12" cy="4" r="1.6" /></svg>) },
  { key: 'pv', label: 'Physical Verification', kind: 'Skill', to: '/domains/physical-design', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>) },
  { key: 'fv', label: 'Functional Verification', kind: 'Skill', to: '/domains/design-verification', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><rect x="8" y="9" width="8" height="10" rx="4" /><path d="M12 5v4M8 12H4M20 12h-4M8 16H5M19 16h-3" /></svg>) },
  { key: 'cov', label: 'Coverage Analysis', kind: 'Skill', to: '/domains/design-verification', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><circle cx="12" cy="12" r="9" /><path d="M12 3v9l6.5 6.5" /></svg>) },
  { key: 'assert', label: 'Protocol & Assertions', kind: 'Skill', to: '/domains/design-verification', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><path d="M3 12h4l2-6 4 12 2-6h6" /></svg>) },
  { key: 'test', label: 'Test Cases', kind: 'Test Cases', to: '/modules', soon: true, icon: (<svg viewBox="0 0 24 24" className="h-6 w-6" {...s}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 9l1.5 1.5L13 8M9 15l1.5 1.5L13 14M15 9h1M15 15h1" /></svg>) },
];

// Explosion offsets: top row flies up-and-out, bottom row down-and-out. [x, y, rotate]
const scatter: [number, number, number][] = [
  [-210, -60, -26], [-120, -110, -15], [10, -150, 22], [135, -105, 17], [220, -66, 30],
  [-225, 96, -32], [-115, 165, -19], [18, 205, 26], [150, 160, -24], [230, 104, 33],
];

// Alternate soft tints within the brand blue family.
const tints = ['bg-blue-soft text-blue', 'bg-sky-soft text-sky', 'bg-blue-soft text-blue-600'];

export function PlatformModules() {
  const reduce = useReducedMotion();
  const [unified, setUnified] = useState(true);

  return (
    <Section id="modules">
      <SectionHead
        eyebrow="the curriculum, modular"
        title={
          <>
            Everything your VLSI career needs.
            <br className="hidden sm:block" /> Nothing it doesn't.
          </>
        }
        lede="Activate only the tracks you need. Solve real challenges, prove real competencies — pay only for what you use."
      />

      <div
        className="relative overflow-hidden rounded-3xl border border-line bg-panel/50 p-6 sm:p-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(46,30,224,0.10) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {modules.map((m, i) => {
            const [sx, sy, sr] = scatter[i % scatter.length];
            return (
              <motion.div
                key={m.key}
                animate={
                  reduce
                    ? undefined
                    : unified
                      ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }
                      : { x: sx, y: sy, rotate: sr, scale: 0.86, opacity: 0.9 }
                }
                transition={{
                  type: 'spring',
                  stiffness: 170,
                  damping: 14,
                  delay: reduce ? 0 : i * 0.02,
                }}
              >
                <Link
                  to={m.to}
                  className="group relative flex h-full flex-col items-center rounded-2xl border border-line bg-panel p-5 text-center shadow-card transition-all hover:-translate-y-1 hover:border-blue/50 hover:shadow-card-hover"
                >
                  {m.soon && (
                    <span className="absolute right-2 top-2 rounded-full bg-void-2 px-2 py-0.5 font-mono text-[9.5px] font-semibold uppercase tracking-wide text-ink-faint">
                      Soon
                    </span>
                  )}
                  <span className={cn('grid h-12 w-12 place-items-center rounded-xl transition-transform group-hover:scale-110', tints[i % tints.length])}>
                    {m.icon}
                  </span>
                  <span className="mt-3 text-[13.5px] font-bold leading-tight text-ink group-hover:text-blue">{m.label}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-wide text-ink-faint">{m.kind}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Toggle bar */}
        <div className="relative mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => setUnified((v) => !v)}
            className="group flex items-center gap-3"
            aria-pressed={unified}
          >
            <span className="text-blue">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2Z" />
              </svg>
            </span>
            <span className={cn('relative h-7 w-12 rounded-full transition-colors', unified ? 'bg-blue' : 'bg-line-strong')}>
              <span className={cn('absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all', unified ? 'left-6' : 'left-1')} />
            </span>
            <span className="text-sm font-bold text-ink">
              {unified ? 'One platform. Unified.' : 'Modular. Pick what you need.'}
            </span>
          </button>

          <Link
            to="/domains"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue transition hover:gap-2.5"
          >
            View all tracks <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </Section>
  );
}
