import { type CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface FailChipProps {
  label: string;
  className?: string;
  style?: CSSProperties;
  /** Emphasize the label in brand blue (else deep ink). */
  accent?: boolean;
  size?: 'sm' | 'md';
}

/**
 * White soft-shadow pill with a blue ✕ badge — the "failure state" motif from
 * the brand key art (REGRESSION FAILED, TIMING FAILED, COVERAGE 82%, …).
 */
export function FailChip({ label, className, style, accent = false, size = 'md' }: FailChipProps) {
  return (
    <span
      style={style}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-line bg-panel font-display font-extrabold uppercase tracking-tight shadow-pill',
        size === 'md' ? 'px-4 py-2.5 text-sm' : 'px-3 py-1.5 text-xs',
        className,
      )}
    >
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-full bg-blue text-white',
          size === 'md' ? 'h-5 w-5' : 'h-4 w-4',
        )}
        aria-hidden
      >
        <svg viewBox="0 0 14 14" className={size === 'md' ? 'h-2.5 w-2.5' : 'h-2 w-2'} fill="none">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </span>
      <span className={accent ? 'text-blue' : 'text-ink'}>{label}</span>
    </span>
  );
}
