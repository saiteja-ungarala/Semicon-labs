import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { FailChip } from '@/components/marketing/FailChip';

const queries = [
  'How do I remove timing violations?',
  'Why is my regression failing?',
  'Where is the coverage gap?',
  'How do I close this setup path?',
];

const failures: { label: string; accent?: boolean }[] = [
  { label: 'Regression failed' },
  { label: 'Timing failed', accent: true },
  { label: 'Slack violated' },
  { label: 'Coverage 82%', accent: true },
  { label: 'DRC errors' },
];

/**
 * Hero visual matched to the brand key art: a search bar that cycles real
 * engineering questions above a glowing cluster of "failing result" chips —
 * the problems you learn to solve. Resolves to a single passing state.
 */
export function HeroSearchCluster() {
  const reduce = useReducedMotion();
  const [qi, setQi] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setQi((i) => (i + 1) % queries.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="relative">
      {/* Blue glow behind the cluster */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle_at_60%_40%,rgba(46,30,224,0.22),transparent_65%)] blur-2xl animate-pulse-glow"
        aria-hidden
      />

      <div className="gradient-border relative rounded-2xl border border-transparent bg-panel/90 p-5 shadow-card backdrop-blur-sm sm:p-6">
        {/* Search bar */}
        <div className="flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-3.5 shadow-pill">
          <span className="min-w-0 flex-1 truncate font-display text-[15px] font-bold text-ink sm:text-base">
            {queries[qi]}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue text-white">
            <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {/* Failing results */}
        <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          What projects actually hand you
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {failures.map((f, i) => (
            <FailChip
              key={f.label}
              label={f.label}
              accent={f.accent}
              size="sm"
              className={reduce ? '' : 'animate-float'}
              // stagger the float so the cluster feels alive, not synchronized
              style={reduce ? undefined : { animationDelay: `${i * 0.4}s` }}
            />
          ))}
        </div>

        {/* Resolution state */}
        <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-blue/20 bg-blue-soft px-4 py-3">
          <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue text-white" aria-hidden>
            <svg viewBox="0 0 14 14" className="h-2.5 w-2.5" fill="none">
              <path d="M2.5 7.5l3 3 6-6.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="font-display text-sm font-extrabold uppercase tracking-tight text-blue">
            Timing closed · slack +0.03ns
          </span>
        </div>
      </div>
    </div>
  );
}
