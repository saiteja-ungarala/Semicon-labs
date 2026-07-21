import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface AnimatedCounterProps {
  /** Full display value, e.g. "2,300+", "99.6%", "180". Non-digits are kept. */
  value: string;
  className?: string;
  durationMs?: number;
}

/** Counts up to the numeric part of `value` when scrolled into view. */
export function AnimatedCounter({ value, className, durationMs = 1400 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : formatFromTarget(value, 0));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
    const decimals = (value.split('.')[1]?.replace(/[^0-9]/g, '') ?? '').length;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = target * eased;
      setDisplay(formatFromTarget(value, current, decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/** Re-inserts prefix/suffix (like "+", "%", ",") around the animated number. */
function formatFromTarget(template: string, current: number, decimals = 0): string {
  const numMatch = template.match(/[\d,.]+/);
  if (!numMatch) return template;
  const rendered =
    decimals > 0
      ? current.toFixed(decimals)
      : Math.round(current).toLocaleString('en-US');
  return template.replace(numMatch[0], rendered);
}
