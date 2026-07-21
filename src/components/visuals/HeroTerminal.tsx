import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Tag = 'INFO' | 'FAIL' | 'PASS';
interface Line {
  tag: Tag;
  text: string;
}

const lines: Line[] = [
  { tag: 'INFO', text: 'Running setup timing check on block: core_wrapper' },
  { tag: 'FAIL', text: 'Setup violation: 0.42ns on path FF_A/CLK → FF_B/D' },
  { tag: 'INFO', text: 'Investigating: clock skew + net delay contributors' },
  { tag: 'INFO', text: 'Root cause: unbalanced clock-tree branch, buffer sizing' },
  { tag: 'INFO', text: 'Applying fix: resize buffers, re-run incremental CTS' },
  { tag: 'PASS', text: 'Setup timing closed. Slack: +0.03ns across all corners' },
];

// White-and-blue theme: the "problem" reads deep navy, the "resolution" reads
// brand blue, and neutral steps read slate — no off-brand colors.
const tagStyle: Record<Tag, string> = {
  INFO: 'bg-panel-raised text-ink-dim',
  FAIL: 'bg-navy-soft text-navy',
  PASS: 'bg-blue-soft text-blue-600',
};

/**
 * The signature hero visual: a terminal that types out a real timing-closure
 * loop — failure, investigation, fix, validation — reinforcing the platform's
 * core promise before a word of copy is read.
 */
export function HeroTerminal() {
  const reduce = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState(reduce ? lines.length : 0);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const tick = () => {
      i += 1;
      setVisibleCount(i);
      if (i < lines.length) {
        timers.push(setTimeout(tick, 620));
      }
    };
    timers.push(setTimeout(tick, 400));
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <div className="gradient-border overflow-hidden rounded-2xl border border-transparent bg-panel shadow-card">
      <div className="flex items-center gap-2 border-b border-line bg-panel-raised px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#CBD7E8]" />
        <span className="h-3 w-3 rounded-full bg-[#9FB4D6]" />
        <span className="h-3 w-3 rounded-full bg-blue/50" />
        <span className="ml-2 font-mono text-xs text-ink-faint">sta_setup_closure.log</span>
      </div>
      <div className="min-h-[300px] space-y-2.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex items-start gap-2.5 [animation:fade-up_0.35s_ease_forwards]">
            <span className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10.5px] font-semibold ${tagStyle[line.tag]}`}>
              {line.tag}
            </span>
            <span className="text-ink-dim">{line.text}</span>
          </div>
        ))}
        {visibleCount >= lines.length && (
          <span className="inline-block h-3.5 w-1.5 animate-blink bg-blue align-middle" />
        )}
      </div>
    </div>
  );
}
