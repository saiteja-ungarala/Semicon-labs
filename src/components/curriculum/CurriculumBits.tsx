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
  CADENCE: 'bg-[#B0261C]/10 text-[#B0261C]',
  SYNOPSYS: 'bg-[#5A2D82]/10 text-[#5A2D82]',
  SIEMENS: 'bg-[#009999]/10 text-[#009999]',
};

/** Vendor chip — real EDA tool branding cue without using logos. */
export function ToolBadge({ tool, className }: { tool: ToolVendor | null; className?: string }) {
  if (!tool) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded px-2 py-0.5 font-mono text-[10.5px] font-bold uppercase tracking-widest',
        toolStyles[tool],
        className,
      )}
    >
      <svg width="6" height="6" viewBox="0 0 8 8" className="fill-current opacity-75">
        <circle cx="4" cy="4" r="4" />
      </svg>
      {TOOL_LABEL[tool]}
    </span>
  );
}

/* --------------------------------------------------------------- lab type */

const labStyles: Record<LabType, string> = {
  GOLDEN: 'bg-blue-soft text-blue-700',
  GUIDED: 'bg-blue-soft text-blue-700',
  BUGGY: 'bg-[#FFF3EB] text-[#B4451F]',
  EXERCISE: 'bg-sky-soft text-sky-700',
  CHALLENGE: 'bg-navy-soft text-navy-700',
};

export function LabTypeBadge({ type, className }: { type: LabType; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 font-mono text-[11.5px] font-bold uppercase tracking-wider',
        labStyles[type],
        className,
      )}
    >
      {LAB_TYPE_LABEL[type]}
    </span>
  );
}

/* ------------------------------------------------------------- difficulty */

const diffStyles: Record<Difficulty, string> = {
  BEGINNER: 'bg-sky-soft text-sky ring-sky/20',
  INTERMEDIATE: 'bg-blue-soft text-blue-600 ring-blue/20',
  ADVANCED: 'bg-navy-soft text-navy ring-navy/20',
};

export function DifficultyDots({ level, className }: { level: Difficulty; className?: string }) {
  return (
    <span className={cn('inline-flex items-center', className)} title={level.toLowerCase()}>
      <span className={cn(
        "font-mono text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ring-1 ring-inset",
        diffStyles[level] || 'bg-line/50 text-ink-dim'
      )}>
        {level.toLowerCase()}
      </span>
    </span>
  );
}

/* ---------------------------------------------------------------- lab mix */

const mixColor: Record<LabType, string> = {
  GOLDEN: 'text-blue-600 bg-blue-soft border-blue/20',
  GUIDED: 'text-blue-600 bg-blue-soft border-blue/20',
  BUGGY: 'text-[#B4451F] bg-[#FFF3EB] border-[#B4451F]/20',
  EXERCISE: 'text-sky bg-sky-soft border-sky/20',
  CHALLENGE: 'text-navy bg-navy-soft border-navy/20',
};

/** Simple text summary showing a module's mix of lab types. */
export function LabMixBar({
  mix,
  className,
}: {
  mix: Partial<Record<LabType, number>>;
  className?: string;
}) {
  const entries = (Object.entries(mix) as [LabType, number][]).filter(([, n]) => n > 0);
  if (entries.length === 0) return null;
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {entries.map(([type, count]) => (
        <span key={type} className={cn(
          "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[11px]",
          mixColor[type] || "bg-panel border-line text-ink-dim"
        )}>
          <span className="font-bold">{count}</span>
          <span className="uppercase tracking-wider">{LAB_TYPE_LABEL[type].toLowerCase()}</span>
        </span>
      ))}
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
