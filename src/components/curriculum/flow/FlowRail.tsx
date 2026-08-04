import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { StepTicks, ToolBadge, DifficultyMeter } from '@/components/curriculum/CurriculumBits';
import {
  TOOL_LABEL,
  formatDuration,
  useCurriculumPrefetch,
  type DomainSummary,
  type ToolVendor,
} from '@/features/curriculum/api';
import { accentVars } from '@/features/curriculum/accent';
import { EASE, EASE_IN, formatList } from './flowTokens';
import { StationPanel } from './StationPanel';
import { cn } from '@/lib/cn';

/**
 * "The line" — the domain's curriculum drawn as a route rather than a stack of
 * boxes. Skills are stages on a track, competencies are steps inside the open
 * stage, testcases are the labs. Exactly one stage is open at a time, which is
 * what keeps the column short enough for the pricing rail to stay alongside it.
 */

type Action = 'open' | 'switch' | 'close';

const panelVariants: Variants = {
  open: (c: { reduce: boolean; instant: boolean }) => ({
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: c.reduce ? 0 : 0.34, ease: EASE },
      opacity: { duration: c.reduce ? 0 : 0.18, delay: c.reduce ? 0 : 0.04 },
    },
  }),
  closed: (c: { reduce: boolean; instant: boolean }) => ({
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: c.reduce || c.instant ? 0 : 0.22, ease: EASE_IN },
      opacity: { duration: c.reduce || c.instant ? 0 : 0.12 },
    },
  }),
};

export function FlowRail({ domain }: { domain: DomainSummary }) {
  const reduce = useReducedMotion() ?? false;
  const [searchParams, setSearchParams] = useSearchParams();
  const skills = domain.skills;

  const initialIdx = (() => {
    const i = skills.findIndex((s) => s.slug === searchParams.get('stage'));
    return i >= 0 ? i : 0;
  })();

  const [openIdx, setOpenIdx] = useState(initialIdx);
  const [action, setAction] = useState<Action>('open');
  const [clip, setClip] = useState(true);
  const prevIdx = useRef(initialIdx);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const headRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const deepLinked = useRef(searchParams.get('stage') !== null);
  const pendingScroll = useRef<number | null>(deepLinked.current ? initialIdx : null);
  const pendingFocus = useRef<number | null>(null);
  const firstRun = useRef(true);

  const { prefetchSkill } = useCurriculumPrefetch();
  const intent = useRef<number | undefined>(undefined);
  const onIntent = (slug: string) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => prefetchSkill(domain.slug, slug), 120);
  };
  const clearIntent = () => window.clearTimeout(intent.current);
  useEffect(() => () => window.clearTimeout(intent.current), []);

  const toggle = (i: number) => {
    const next = openIdx === i ? -1 : i;
    setAction(openIdx === i ? 'close' : openIdx === -1 ? 'open' : 'switch');
    prevIdx.current = openIdx;
    // Re-arm the clip before the next panel mounts, or its content spills out
    // of the box for the frame before onAnimationStart lands.
    setClip(true);
    setOpenIdx(next);
    if (next >= 0) pendingScroll.current = next;

    const p = new URLSearchParams(searchParams);
    p.delete('step');
    if (next >= 0) p.set('stage', skills[next].slug);
    else p.delete('stage');
    setSearchParams(p, { replace: true });
  };

  // Escape from inside the panel: close, then put focus back on the header —
  // after the re-render, since the open header button unmounts with the panel.
  const closeAndFocus = (i: number) => {
    setAction('close');
    prevIdx.current = openIdx;
    setClip(true);
    setOpenIdx(-1);
    pendingFocus.current = i;
    const p = new URLSearchParams(searchParams);
    p.delete('stage');
    p.delete('step');
    setSearchParams(p, { replace: true });
  };

  useEffect(() => {
    const i = pendingFocus.current;
    pendingFocus.current = null;
    if (i != null) headRefs.current[i]?.focus();
  }, [openIdx]);

  // The only place this component scrolls the page.
  useEffect(() => {
    const i = pendingScroll.current;
    pendingScroll.current = null;
    const wasFirst = firstRun.current;
    firstRun.current = false;
    if (i == null) return;

    const raf = requestAnimationFrame(() => {
      const row = rowRefs.current[i];
      if (!row) return;
      const top = row.getBoundingClientRect().top;
      // already sitting comfortably in view → leave the page where it is
      if (!wasFirst && top >= 88 && top <= window.innerHeight * 0.5) return;
      const far = Math.abs(top - 104) > window.innerHeight * 1.5;
      row.scrollIntoView({ block: 'start', behavior: reduce || wasFirst || far ? 'auto' : 'smooth' });
    });
    return () => cancelAnimationFrame(raf);
  }, [openIdx, reduce]);

  const vendors = [...new Set(skills.map((s) => s.toolVendor).filter(Boolean))] as ToolVendor[];
  const vendorList = formatList(vendors.map((v) => TOOL_LABEL[v]));
  const custom = { reduce, instant: action === 'switch' };

  return (
    <div className="relative min-w-0" style={accentVars(domain.slug)}>
      {/* base track — static wrapper owns position, motion child owns motion */}
      {/* The viewport trigger must live on the WRAPPER: the child starts at
          scaleY(0), and a zero-height box never intersects, so observing the
          child directly leaves the rail permanently invisible. */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute bottom-3 left-[15px] top-3 w-0.5 overflow-hidden rounded-full sm:left-[19px]"
        initial={reduce ? false : 'hidden'}
        whileInView="shown"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.span
          className="block h-full w-full origin-top rounded-full bg-line-strong"
          variants={{ hidden: { scaleY: 0 }, shown: { scaleY: 1 } }}
          transition={{ duration: reduce ? 0 : 0.85, ease: EASE }}
        />
      </motion.span>

      {/* start cap */}
      <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 pb-3 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-4 sm:pb-4">
        <span aria-hidden className="relative flex justify-start">
          <span className="ml-[15px] mt-1 h-6 w-0.5 rounded-full bg-gradient-to-b from-transparent to-line sm:ml-[19px]" />
        </span>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--ac)]">
            Line starts here
          </p>
          <p className="-rotate-1 font-hand text-[19px] leading-none text-ink-dim">
            open one — see exactly what you'd be running
          </p>
        </div>
      </div>

      <ol className="relative space-y-0">
        {skills.map((skill, i) => {
          const open = openIdx === i;
          const filled = openIdx >= 0 && i <= openIdx;
          const passed = openIdx >= 0 && i < openIdx;
          const m = skill.stats.modules;
          const t = skill.stats.testcases;

          return (
            <li
              key={skill.slug}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={cn(
                'group relative grid scroll-mt-[104px] grid-cols-[40px_minmax(0,1fr)] gap-x-3 py-2 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-4 sm:py-2.5',
                // hairline between collapsed rows, which fades as the row lifts
                !open &&
                  'after:pointer-events-none after:absolute after:bottom-0 after:left-[64px] after:right-4 after:h-px after:bg-line after:transition-opacity group-hover:after:opacity-0 sm:after:left-[76px]',
              )}
            >
              {/* accent fill — the run head travelling down the line */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-[14px] top-0 w-1 overflow-hidden rounded-full sm:left-[18px]"
              >
                <motion.span
                  className="block h-full w-full origin-top rounded-full bg-[var(--ac)]"
                  initial={false}
                  animate={{ scaleY: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : {
                          duration: 0.32,
                          ease: EASE,
                          delay: Math.min(Math.abs(i - prevIdx.current), 5) * 0.045,
                        }
                  }
                />
              </span>

              {/* the tick that welds a row to the line — accent when open, a
                  quiet hover cue when collapsed */}
              <span
                aria-hidden
                className={cn(
                  'pointer-events-none absolute left-4 top-[38px] h-0.5 rounded-full transition-all duration-200 sm:left-5 sm:top-[43px]',
                  open
                    ? 'w-9 bg-[var(--ac-30)] sm:w-11'
                    : 'w-6 bg-line opacity-0 group-hover:opacity-100 sm:w-8',
                )}
              />

              {/* node */}
              <div className="relative z-10 flex justify-start pt-2.5 sm:pt-3">
                <span className="relative flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10">
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[var(--ac)]"
                    initial={false}
                    animate={{ scale: open ? 1 : 0.35, opacity: open ? 1 : 0 }}
                    transition={
                      reduce ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32, mass: 0.7 }
                    }
                  />
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-[3px] rounded-full border-2 bg-panel shadow-sm transition-all duration-300 sm:inset-[4px]',
                      open
                        ? 'scale-90 opacity-0'
                        : passed
                          ? 'border-[color:var(--ac)] bg-[var(--ac-10)]'
                          : 'border-line-strong group-hover:border-[color:var(--ac-30)] group-hover:bg-[var(--ac-06)]',
                    )}
                  />
                  <span
                    className={cn(
                      'relative font-mono tabular-nums transition-colors duration-300',
                      open
                        ? 'text-[12.5px] font-bold text-white'
                        : passed
                          ? 'text-[11px] font-bold text-[color:var(--ac)]'
                          : 'text-[11px] font-bold text-ink-dim group-hover:text-[color:var(--ac)]',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <AnimatePresence>
                    {open && !reduce && (
                      <motion.span
                        key={openIdx}
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-[var(--ac)]"
                        initial={{ scale: 0.6, opacity: 0.45 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    )}
                  </AnimatePresence>
                </span>
              </div>

              {/* content column */}
              <div
                className={cn(
                  'relative min-w-0',
                  open && 'rounded-2xl border border-line border-l-[3px] border-l-[color:var(--ac)] bg-panel shadow-card',
                )}
              >
                {open ? (
                  <button
                    type="button"
                    ref={(el) => {
                      headRefs.current[i] = el;
                    }}
                    id={`stage-h-${skill.slug}`}
                    aria-expanded
                    aria-controls={`stage-p-${skill.slug}`}
                    onClick={() => toggle(i)}
                    className="group/head flex w-full items-start justify-between gap-4 px-5 pt-5 text-left sm:px-6 sm:pt-6"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--ac)]">
                        Stage {String(i + 1).padStart(2, '0')} of {String(skills.length).padStart(2, '0')}
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2.5">
                        <span className="text-[20px] font-bold leading-tight text-ink">{skill.name}</span>
                        <ToolBadge tool={skill.toolVendor} />
                        {skill.difficulty && <DifficultyMeter level={skill.difficulty} />}
                      </span>
                    </span>
                    <span className="shrink-0 pt-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.14em] text-ink-faint transition-colors duration-200 group-hover/head:text-ink">
                      Close stage <span aria-hidden className="ml-1">×</span>
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    ref={(el) => {
                      headRefs.current[i] = el;
                    }}
                    id={`stage-h-${skill.slug}`}
                    aria-expanded={false}
                    aria-controls={`stage-p-${skill.slug}`}
                    onClick={() => toggle(i)}
                    onPointerEnter={() => onIntent(skill.slug)}
                    onPointerLeave={clearIntent}
                    onFocus={() => onIntent(skill.slug)}
                    className="flex w-full items-center gap-4 rounded-2xl border border-transparent px-4 py-3.5 text-left transition-all duration-200 group-hover:border-[color:var(--ac-30)] group-hover:bg-panel group-hover:shadow-card"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[16.5px] font-bold leading-tight text-ink transition-colors duration-200 group-hover:text-[color:var(--ac)]">
                          {skill.name}
                        </span>
                        <ToolBadge tool={skill.toolVendor} />
                      </span>
                      <span className="mt-1 block max-w-[58ch] text-[13.5px] leading-snug text-ink-dim line-clamp-2 sm:line-clamp-1">
                        {skill.summary}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1.5 flex items-center gap-2 font-mono text-[11px] tabular-nums text-ink-faint sm:hidden"
                      >
                        <StepTicks count={m} active={false} />
                        {m} steps · {t} labs · {formatDuration(skill.stats.durationMin)}
                      </span>
                    </span>

                    {/* stats live in a fixed-width column of their own */}
                    <span className="hidden w-[152px] shrink-0 text-right sm:block">
                      <span className="block font-mono text-[13px] font-bold tabular-nums text-ink">
                        {m}
                        <span className="ml-1 font-medium text-ink-faint">steps</span>
                        <span className="mx-1.5 text-line-strong">·</span>
                        {t}
                        <span className="ml-1 font-medium text-ink-faint">labs</span>
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                        {formatDuration(skill.stats.durationMin)} lab time
                      </span>
                    </span>

                    {/* its own column, so it can never print over the stats */}
                    <span
                      aria-hidden
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-panel text-ink-faint transition-all duration-200 group-hover:border-[color:var(--ac-30)] group-hover:bg-[var(--ac-10)] group-hover:text-[color:var(--ac)]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-200 group-hover:translate-y-0.5"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                )}

                <AnimatePresence initial={false} custom={custom}>
                  {open && (
                    <motion.section
                      key="panel"
                      id={`stage-p-${skill.slug}`}
                      aria-labelledby={`stage-h-${skill.slug}`}
                      custom={custom}
                      variants={panelVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      onAnimationStart={() => setClip(true)}
                      onAnimationComplete={(def) => {
                        if (def === 'open') setClip(false);
                      }}
                      style={{ overflow: clip ? 'hidden' : 'visible' }}
                    >
                      <motion.div
                        initial={reduce ? false : { y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: EASE, delay: reduce ? 0 : 0.06 }}
                        className="px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
                      >
                        <StationPanel
                          domainSlug={domain.slug}
                          domainCode={domain.code}
                          skill={skill}
                          stageIndex={i}
                          reduce={reduce}
                          onClose={() => closeAndFocus(i)}
                        />
                      </motion.div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>

      {/* end cap */}
      <div className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-x-3 pt-5 sm:grid-cols-[48px_minmax(0,1fr)] sm:gap-x-4">
        <div className="relative flex justify-start">
          <span
            aria-hidden
            className="ml-[10px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-[color:var(--ac)] bg-void sm:ml-[13px]"
          />
        </div>
        <div className="rounded-2xl border border-[color:var(--ac-30)] bg-[var(--ac-06)] p-5 sm:p-6">
          <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--ac)]">
            End of the {domain.code} line
          </p>
          <h3 className="mt-2 text-[19px] font-bold leading-snug text-ink sm:text-[21px]">
            You come out having run {domain.stats.testcases} real labs.
          </h3>
          <p className="mt-2.5 max-w-[62ch] text-[14px] leading-relaxed text-ink-dim">
            On {vendorList}. The same flow, the same checks, the same failure modes a working {domain.code}{' '}
            engineer hits on a Tuesday. Not a certificate — a body of work.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-line pl-[52px] pt-3 sm:pl-[64px]">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          {domain.code} · {domain.stats.skills} stages · {domain.stats.modules} steps ·{' '}
          {domain.stats.testcases} labs · {vendors.length} EDA vendors
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
          read live from the lab catalog
        </p>
      </div>
    </div>
  );
}
