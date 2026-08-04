import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { LabMixBar, DifficultyMeter, ToolBadge } from '@/components/curriculum/CurriculumBits';
import {
  formatDuration,
  useCurriculumPrefetch,
  useSkill,
  type LabType,
  type SkillSummary,
} from '@/features/curriculum/api';
import { EASE, MONO_LABEL } from './flowTokens';
import { StepDetail } from './StepDetail';
import { cn } from '@/lib/cn';

/**
 * The opened stage: a readout of what the stage contains, the list of steps
 * inside it, and one fixed slot below where the selected step's labs always
 * appear — so the thing you came for never moves around the screen.
 */

interface Props {
  domainSlug: string;
  domainCode: string;
  skill: SkillSummary;
  stageIndex: number;
  reduce: boolean;
  onClose: () => void;
}

function CountUp({ value, reduce }: { value: number; reduce: boolean }) {
  const mv = useMotionValue(reduce ? value : 0);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());

  useEffect(() => {
    if (reduce) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.7, ease: EASE });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return (
    <>
      <motion.span aria-hidden>{rounded}</motion.span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export function StationPanel({ domainSlug, domainCode, skill, stageIndex, reduce, onClose }: Props) {
  const { data, isLoading, isError } = useSkill(domainSlug, skill.slug);
  // Stable identity: the fallback [] would otherwise be a new array each render
  // and re-fire the step-selection effect forever.
  const modules = useMemo(() => data?.skill.modules ?? [], [data]);

  const [searchParams, setSearchParams] = useSearchParams();
  const [stepSlug, setStepSlug] = useState<string | null>(searchParams.get('step'));
  const [scenarioSlug, setScenarioSlug] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { prefetchTestcases } = useCurriculumPrefetch();
  const intent = useRef<number | undefined>(undefined);

  // Exactly one step is selected once data lands; a bogus ?step= falls back.
  useEffect(() => {
    if (!modules.length) return;
    if (!stepSlug || !modules.some((m) => m.slug === stepSlug)) setStepSlug(modules[0].slug);
  }, [modules, stepSlug]);

  const selectStep = (slug: string) => {
    setStepSlug(slug);
    setScenarioSlug(null);
    const p = new URLSearchParams(searchParams);
    p.set('stage', skill.slug);
    p.set('step', slug);
    setSearchParams(p, { replace: true });
  };

  const onStepIntent = (slug: string) => {
    window.clearTimeout(intent.current);
    intent.current = window.setTimeout(() => prefetchTestcases(slug), 120);
  };
  const clearStepIntent = () => window.clearTimeout(intent.current);
  useEffect(() => () => window.clearTimeout(intent.current), []);

  const onKey = (e: KeyboardEvent) => {
    const idx = modules.findIndex((m) => m.slug === stepSlug);
    let next = -1;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (idx + 1) % modules.length;
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (idx - 1 + modules.length) % modules.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = modules.length - 1;
    if (next < 0 || !modules.length) return;
    e.preventDefault();
    selectStep(modules[next].slug);
    tabRefs.current[next]?.focus();
  };

  const onPanelKey = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    if (scenarioSlug) {
      setScenarioSlug(null);
      return;
    }
    onClose();
  };

  const selectedIndex = modules.findIndex((m) => m.slug === stepSlug);
  const selectedModule = selectedIndex >= 0 ? modules[selectedIndex] : undefined;

  // Stage-level lab mix — summed across the stage's competencies.
  const stageMix = modules.reduce<Partial<Record<LabType, number>>>((acc, m) => {
    for (const [type, n] of Object.entries(m.labMix) as [LabType, number][]) {
      acc[type] = (acc[type] ?? 0) + n;
    }
    return acc;
  }, {});

  return (
    <div onKeyDown={onPanelKey}>
      <p className="max-w-[64ch] text-[14px] leading-relaxed text-ink-dim">{skill.summary}</p>

      {/* Readout paints instantly from the domain payload — never waits on the fetch */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-void-2/60">
        <div className="px-3 py-2.5 sm:px-4">
          <span className="block font-mono text-[19px] font-bold leading-none tabular-nums text-[color:var(--ac)] sm:text-[22px]">
            <CountUp value={skill.stats.modules} reduce={reduce} />
          </span>
          <span className={cn('mt-1.5 block', MONO_LABEL)}>Steps</span>
        </div>
        <div className="px-3 py-2.5 sm:px-4">
          <span className="block font-mono text-[19px] font-bold leading-none tabular-nums text-[color:var(--ac)] sm:text-[22px]">
            <CountUp value={skill.stats.testcases} reduce={reduce} />
          </span>
          <span className={cn('mt-1.5 block', MONO_LABEL)}>Labs</span>
        </div>
        <div className="px-3 py-2.5 sm:px-4">
          <span className="block font-mono text-[19px] font-bold leading-none tabular-nums text-ink sm:text-[22px]">
            {formatDuration(skill.stats.durationMin)}
          </span>
          <span className={cn('mt-1.5 block', MONO_LABEL)}>Lab time</span>
        </div>
      </div>

      {modules.length > 0 && (
        <div className="mt-3 flex items-center gap-3">
          <span className={cn('shrink-0', MONO_LABEL)}>Made of</span>
          <LabMixBar mix={stageMix} variant="bar" className="min-w-0 flex-1" />
        </div>
      )}

      <div className="mt-6 flex items-baseline justify-between gap-3 border-t border-line pt-5">
        <h4 className="text-[13px] font-bold uppercase tracking-[0.1em] text-ink">Steps in this stage</h4>
        <span className="font-mono text-[11px] font-bold tabular-nums text-[color:var(--ac)]">
          {String(skill.stats.modules).padStart(2, '0')}
        </span>
      </div>

      {isError && (
        <p className="mt-5 rounded-xl border border-line bg-void-2/60 p-4 text-[13.5px] text-ink-dim">
          This stage didn't load. Refresh, or open another stage on the line.
        </p>
      )}

      {isLoading && (
        <>
          <div className="mt-2.5 space-y-1">
            {Array.from({ length: Math.max(1, skill.stats.modules) }).map((_, i) => (
              <div key={i} className="h-[52px] animate-pulse rounded-xl bg-void-2" />
            ))}
          </div>
          <div className="mt-4 h-[260px] animate-pulse rounded-xl bg-void-2" />
        </>
      )}

      {!isLoading && !isError && modules.length > 0 && (
        <>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={`Steps in ${skill.name}`}
            onKeyDown={onKey}
            className="mt-2.5 space-y-1"
          >
            {modules.map((m, j) => {
              const sel = m.slug === stepSlug;
              return (
                <button
                  key={m.slug}
                  type="button"
                  role="tab"
                  ref={(el) => {
                    tabRefs.current[j] = el;
                  }}
                  id={`step-t-${m.slug}`}
                  aria-selected={sel}
                  aria-controls={`step-p-${m.slug}`}
                  tabIndex={sel ? 0 : -1}
                  onClick={() => selectStep(m.slug)}
                  onPointerEnter={() => onStepIntent(m.slug)}
                  onPointerLeave={clearStepIntent}
                  onFocus={() => onStepIntent(m.slug)}
                  className="group/tab relative flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-200 hover:bg-void-2 focus-visible:outline-offset-[-2px]"
                >
                  {sel && (
                    <motion.span
                      layoutId={`step-pill-${skill.slug}`}
                      aria-hidden
                      className="absolute inset-0 rounded-xl bg-[var(--ac-10)] ring-1 ring-inset ring-[color:var(--ac-30)]"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 40 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 mt-0.5 font-mono text-[11px] font-bold tabular-nums',
                      sel ? 'text-[color:var(--ac)]' : 'text-ink-faint',
                    )}
                  >
                    {String(j + 1).padStart(2, '0')}
                  </span>
                  <span className="relative z-10 min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="text-[14.5px] font-bold leading-snug text-ink">{m.title}</span>
                      <ToolBadge tool={m.toolVendor} />
                      {stageIndex === 0 && j === 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--ac-16)] px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.12em] text-[color:var(--ac)]">
                          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--ac)]" />
                          Entry point
                        </span>
                      )}
                    </span>
                    <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-faint">
                      <DifficultyMeter level={m.difficulty} compact />
                      <span>{formatDuration(m.durationMin)} lab</span>
                      <span>{m.testcaseCount} labs</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The one place labs ever appear */}
          <motion.div
            layout={reduce ? false : 'size'}
            transition={{ layout: { duration: 0.28, ease: EASE } }}
            className="relative mt-4 min-h-[260px] overflow-hidden border-t border-line pt-5"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {selectedModule && (
                <motion.div
                  key={selectedModule.slug}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: reduce ? 0 : 0.26, ease: EASE }}
                >
                  <StepDetail
                    module={selectedModule}
                    domainCode={domainCode}
                    stepIndex={selectedIndex}
                    stepTotal={modules.length}
                    scenarioSlug={scenarioSlug}
                    setScenarioSlug={setScenarioSlug}
                    reduce={reduce}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </div>
  );
}
