import type { LabType } from '@/features/curriculum/api';

/** Shared timing + copy tokens for the curriculum "line". */
export const EASE = [0.16, 1, 0.3, 1] as const; // matches theme ease-out-expo
export const EASE_IN = [0.4, 0, 1, 1] as const;

/** What the lab's scenario paragraph is, in the learner's language. */
export const SCENARIO_LABEL: Record<LabType, string> = {
  GOLDEN: 'THE REFERENCE',
  BUGGY: 'THE FAILURE',
  EXERCISE: 'THE TASK',
  GUIDED: 'THE WALKTHROUGH',
  CHALLENGE: 'THE CHALLENGE',
};

/** "Cadence, Synopsys and Siemens Calibre" */
export function formatList(items: string[]): string {
  if (items.length <= 1) return items[0] ?? '';
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}

export const MONO_LABEL =
  'font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-ink-faint';
export const MONO_ACCENT_LABEL =
  'font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--ac)]';
