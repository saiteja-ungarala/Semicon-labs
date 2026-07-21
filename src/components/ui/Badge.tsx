import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'blue' | 'sky' | 'navy' | 'pass' | 'fail' | 'neutral';

const tones: Record<Tone, string> = {
  blue: 'bg-blue-soft text-blue-600 ring-blue/30',
  sky: 'bg-sky-soft text-sky ring-sky/30',
  navy: 'bg-navy-soft text-navy ring-navy/30',
  pass: 'bg-blue-soft text-blue-600 ring-blue/30',
  fail: 'bg-panel-raised text-ink-dim ring-line-strong',
  neutral: 'bg-panel-raised text-ink-dim ring-line-strong',
};

export function Badge({
  tone = 'neutral',
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
