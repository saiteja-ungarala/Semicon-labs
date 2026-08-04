import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import {
  LabMixBar,
  LabTypeBadge,
  DifficultyMeter,
  SpecimenTag,
  VerifiedTag,
} from '@/components/curriculum/CurriculumBits';
import {
  TOOL_LABEL,
  formatDuration,
  useModuleTestcases,
  type SkillModule,
  type Testcase,
} from '@/features/curriculum/api';
import { EASE, MONO_LABEL, SCENARIO_LABEL } from './flowTokens';
import { cn } from '@/lib/cn';

/**
 * One competency, opened. Everything a buyer wants to know about the work sits
 * here: what you do, how hard it is, and the actual labs — with the first
 * lab's scenario already on screen, because that prose is the proof.
 */

interface Props {
  module: SkillModule;
  domainCode: string;
  stepIndex: number;
  stepTotal: number;
  scenarioSlug: string | null;
  setScenarioSlug: (slug: string | null) => void;
  reduce: boolean;
}

const PAGE = 24;
const FIRST_ROWS = 5;

function LabRow({
  tc,
  n,
  open,
  onToggle,
  reduce,
}: {
  tc: Testcase;
  n: number;
  open: boolean;
  onToggle: () => void;
  reduce: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`lab-s-${tc.slug}`}
        onClick={onToggle}
        className="group/lab flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-150 hover:bg-[var(--ac-06)] focus-visible:outline-offset-[-2px]"
      >
        <span className="font-mono text-[10.5px] font-bold tabular-nums text-ink-faint">
          T{String(n).padStart(2, '0')}
        </span>
        <span className="min-w-0 flex-1 truncate text-[13.5px] font-semibold text-ink" title={tc.title}>
          {tc.title}
        </span>
        <LabTypeBadge type={tc.labType} className="hidden sm:inline-flex" />
        {tc.verifiable && <VerifiedTag className="hidden md:inline-flex" />}
        <span className="hidden font-mono text-[10.5px] uppercase text-ink-faint sm:inline">
          ~{formatDuration(tc.estimatedMin)}
        </span>
        <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-ink-faint transition-colors group-hover/lab:text-[color:var(--ac)]">
          {open ? 'Hide' : 'Read the scenario'}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`lab-s-${tc.slug}`}
            role="region"
            aria-label={`Scenario for ${tc.title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduce ? 0 : 0.3, ease: EASE },
              opacity: { duration: reduce ? 0 : 0.16 },
            }}
            className="overflow-hidden"
          >
            <div className="relative ml-3 border-l-2 border-[color:var(--ac-30)] py-2 pl-4 pr-3">
              {/* the chips hidden from the row on small screens still land here */}
              <span className="mb-2 flex flex-wrap items-center gap-2 sm:hidden">
                <LabTypeBadge type={tc.labType} />
                {tc.verifiable && <VerifiedTag />}
                <span className="font-mono text-[10.5px] uppercase text-ink-faint">
                  ~{formatDuration(tc.estimatedMin)}
                </span>
              </span>
              <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--ac)]">
                {SCENARIO_LABEL[tc.labType]}
              </p>
              <p className="mt-1.5 max-w-[70ch] text-[13.5px] leading-relaxed text-ink-dim">{tc.scenario}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function StepDetail({
  module,
  domainCode,
  stepIndex,
  stepTotal,
  scenarioSlug,
  setScenarioSlug,
  reduce,
}: Props) {
  const { data, isLoading } = useModuleTestcases(module.slug);
  // Remounted per step (key={module.slug}), so this resets on every switch.
  const [visibleRest, setVisibleRest] = useState(FIRST_ROWS);

  const testcases = data?.testcases ?? [];
  const specimen = testcases[0];
  const rest = testcases.slice(1);
  const shown = rest.slice(0, visibleRest);
  const remaining = rest.length - shown.length;

  return (
    <div
      role="tabpanel"
      id={`step-p-${module.slug}`}
      aria-labelledby={`step-t-${module.slug}`}
      tabIndex={0}
      className="focus-visible:outline-offset-[-2px]"
    >
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--ac)]">
        Step {String(stepIndex + 1).padStart(2, '0')} of {String(stepTotal).padStart(2, '0')}
      </p>
      <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
        <h5 className="text-[17px] font-bold leading-snug text-ink">{module.title}</h5>
        <SpecimenTag code={module.externalId ?? `${domainCode}·${String(stepIndex + 1).padStart(2, '0')}`} />
      </div>
      {module.subtitle && <p className="mt-1 text-[13px] leading-snug text-ink-dim">{module.subtitle}</p>}

      {module.description && (
        <div className="mt-4">
          <p className={MONO_LABEL}>What you actually do here</p>
          <p className="mt-1.5 max-w-[66ch] text-[14px] leading-relaxed text-ink">{module.description}</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-xl border border-line bg-void-2/60">
        <div className="px-3 py-2">
          <span className={MONO_LABEL}>Level</span>
          <DifficultyMeter level={module.difficulty} className="mt-1" />
        </div>
        <div className="px-3 py-2">
          <span className={MONO_LABEL}>Lab time</span>
          <span className="mt-1 block font-mono text-[14px] font-bold tabular-nums text-ink">
            {formatDuration(module.durationMin)}
          </span>
        </div>
        <div className="px-3 py-2">
          <span className={MONO_LABEL}>Labs</span>
          <span className="mt-1 block font-mono text-[14px] font-bold tabular-nums text-ink">
            {module.testcaseCount}
          </span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className={MONO_LABEL}>Made of</span>
        <LabMixBar mix={module.labMix} />
      </div>

      <h6 className="mt-6 text-[13px] font-bold uppercase tracking-[0.1em] text-ink">
        {module.testcaseCount === 1 ? 'The one lab in this step' : `The ${module.testcaseCount} labs in this step`}
      </h6>

      {isLoading && (
        <div className="mt-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">fetching labs…</p>
          <div className="mt-3 h-[128px] animate-pulse rounded-xl bg-void-2" />
          <div className="mt-2 space-y-2">
            {Array.from({ length: Math.max(0, Math.min(module.testcaseCount, 6) - 1) }).map((_, i) => (
              <div key={i} className="h-[46px] animate-pulse rounded-lg bg-void-2" />
            ))}
          </div>
        </div>
      )}

      {!isLoading && !specimen && (
        <p className="mt-3 rounded-xl border border-dashed border-line-strong bg-void-2/50 p-4 text-[13.5px] text-ink-dim">
          These labs are still in the build queue — they land before 15 Aug.
        </p>
      )}

      {specimen && (
        <div className="relative mt-3 overflow-hidden rounded-xl border border-[color:var(--ac-30)] bg-panel p-4 shadow-card sm:p-5">
          <span className="absolute right-0 top-0 rounded-bl-lg bg-[var(--ac)] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white">
            First lab you'll open
          </span>
          <div className="flex flex-wrap items-center gap-2 pr-32">
            <span className="font-mono text-[10.5px] font-bold tabular-nums text-ink-faint">T01</span>
            <span className="text-[14.5px] font-bold leading-snug text-ink">{specimen.title}</span>
            <LabTypeBadge type={specimen.labType} />
            {specimen.verifiable && <VerifiedTag />}
            <span className="font-mono text-[10.5px] uppercase text-ink-faint">
              ~{formatDuration(specimen.estimatedMin)}
            </span>
          </div>
          <p className="mt-3 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--ac)]">
            {SCENARIO_LABEL[specimen.labType]}
          </p>
          <p className="mt-1.5 max-w-[70ch] text-[14px] leading-relaxed text-ink">{specimen.scenario}</p>
        </div>
      )}

      {shown.length > 0 && (
        <ul className="mt-2 space-y-0.5">
          {shown.map((tc, k) => (
            <LabRow
              key={tc.slug}
              tc={tc}
              n={k + 2}
              open={scenarioSlug === tc.slug}
              onToggle={() => setScenarioSlug(scenarioSlug === tc.slug ? null : tc.slug)}
              reduce={reduce}
            />
          ))}
        </ul>
      )}

      {remaining > 0 && (
        <Button variant="secondary" size="sm" className="mt-3" onClick={() => setVisibleRest((v) => v + PAGE)}>
          {remaining <= PAGE ? `Show the remaining ${remaining} labs` : `Show ${PAGE} more labs · ${remaining} left`}
        </Button>
      )}
      {remaining === 0 && rest.length > FIRST_ROWS && (
        <Button variant="ghost" size="sm" className="mt-3" onClick={() => setVisibleRest(FIRST_ROWS)}>
          Show fewer
        </Button>
      )}

      {module.toolVendor && (
        <p className={cn('mt-4 border-t border-line pt-3 text-[12.5px] leading-snug text-ink-dim')}>
          Every lab here runs on{' '}
          <b className="font-semibold text-ink">{TOOL_LABEL[module.toolVendor]}</b> in your browser — no
          licence, no install, no lab PC.
        </p>
      )}
    </div>
  );
}
