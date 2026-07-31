import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  LAB_TYPE_LABEL,
  TOOL_LABEL,
  type Difficulty,
  type LabType,
  type ToolVendor,
} from '@/features/curriculum/api';

/* ------------------------------------------------------------------ tools */

const toolStyles: Record<ToolVendor, string> = {
  CADENCE: 'bg-panel text-[#B0261C] ring-[#B0261C]/25',
  SYNOPSYS: 'bg-panel text-[#5A2D82] ring-[#5A2D82]/25',
  SIEMENS: 'bg-panel text-[#009999] ring-[#009999]/25',
};

/** Vendor chip — real EDA tool branding cue without using logos. */
export function ToolBadge({ tool, className }: { tool: ToolVendor | null; className?: string }) {
  if (!tool) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        toolStyles[tool],
        className,
      )}
    >
      <span aria-hidden className="text-[8px]">▮</span>
      {TOOL_LABEL[tool]}
    </span>
  );
}

/* --------------------------------------------------------------- lab type */

const labStyles: Record<LabType, string> = {
  GOLDEN: 'bg-blue-soft text-blue-600 ring-blue/30',
  GUIDED: 'bg-blue-soft text-blue-600 ring-blue/30',
  BUGGY: 'bg-[#FFF3EB] text-[#B4451F] ring-[#B4451F]/25',
  EXERCISE: 'bg-sky-soft text-sky ring-sky/30',
  CHALLENGE: 'bg-navy-soft text-navy ring-navy/30',
};

export function LabTypeBadge({ type, className }: { type: LabType; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[10.5px] font-semibold uppercase tracking-wider ring-1 ring-inset',
        labStyles[type],
        className,
      )}
    >
      {LAB_TYPE_LABEL[type]}
    </span>
  );
}

/* ------------------------------------------------------------- difficulty */

const diffDots: Record<Difficulty, number> = { BEGINNER: 1, INTERMEDIATE: 2, ADVANCED: 3 };

export function DifficultyDots({ level, className }: { level: Difficulty; className?: string }) {
  const active = diffDots[level];
  return (
    <span className={cn('inline-flex items-center gap-1', className)} title={level.toLowerCase()}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn('h-1.5 w-1.5 rounded-full', i <= active ? 'bg-blue' : 'bg-line-strong')}
        />
      ))}
      <span className="ml-1 font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
        {level.toLowerCase()}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- lab mix */

const mixColor: Record<LabType, string> = {
  GOLDEN: 'bg-blue',
  GUIDED: 'bg-blue',
  BUGGY: 'bg-[#E8850C]',
  EXERCISE: 'bg-sky',
  CHALLENGE: 'bg-navy',
};

/** Tiny stacked bar showing a module's mix of lab types. */
export function LabMixBar({
  mix,
  className,
}: {
  mix: Partial<Record<LabType, number>>;
  className?: string;
}) {
  const entries = (Object.entries(mix) as [LabType, number][]).filter(([, n]) => n > 0);
  const total = entries.reduce((n, [, c]) => n + c, 0);
  if (!total) return null;
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-void-2">
        {entries.map(([type, count]) => (
          <span key={type} className={mixColor[type]} style={{ width: `${(count / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {entries.map(([type, count]) => (
          <span key={type} className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
            <span className={cn('mr-1 inline-block h-1.5 w-1.5 rounded-full align-middle', mixColor[type])} />
            {count} {LAB_TYPE_LABEL[type].toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- exclusivity */

/**
 * The scarcity band: these labs exist only on Semicon Labs. Rendered as a
 * quiet, factual strip — the claim itself does the work.
 */
export function OnlyHereStrip({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-blue/20 bg-blue-soft/60 px-6 py-4 text-center',
        className,
      )}
    >
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-blue-600">
        Not on YouTube · Not on Udemy · Not in any textbook
      </p>
      <p className="text-sm font-semibold text-ink">
        {children ?? 'These testcases come from real project failures — and they exist only here.'}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ stat */

export function StatChip({ value, label, className }: { value: ReactNode; label: string; className?: string }) {
  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span className="font-mono text-lg font-bold text-blue">{value}</span>
      <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">{label}</span>
    </div>
  );
}
