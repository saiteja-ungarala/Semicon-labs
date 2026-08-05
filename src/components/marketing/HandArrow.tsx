import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Hand-drawn marker arrow, in the vein of the annotated arrows on Odoo's site:
 * a loose curve with an uneven head, drawn on scroll so the eye follows it to
 * whatever it points at. Purely decorative — always aria-hidden, never
 * intercepts pointer events.
 *
 * Each variant is hand-fitted to one spot on the page; the head barbs are
 * computed off the curve's end tangent so the arrow actually aims where the
 * curve is travelling.
 */

interface HandArrowProps {
  variant: keyof typeof PATHS;
  className?: string;
  /** Delay before the stroke draws, in seconds. */
  delay?: number;
}

const PATHS = {
  /** Hero: sweeps up from beside the headline and points at the logo. */
  'to-logo': {
    viewBox: '0 0 260 210',
    d: 'M250 190C210 150 150 120 128 20',
    head: 'M118 50L128 20L150 44',
  },
  /** Benefits: drops from the heading down onto the toggle. */
  'to-toggle': {
    viewBox: '0 0 130 70',
    d: 'M6 8C44 6 92 18 112 58',
    head: 'M113 38L112 58L95 47',
  },
} as const;

export function HandArrow({ variant, className, delay = 0.4 }: HandArrowProps) {
  const reduce = useReducedMotion() ?? false;
  const { viewBox, d, head } = PATHS[variant];

  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const draw = (i: number) => ({
    initial: reduce ? undefined : { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: {
      pathLength: { duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.55 },
      opacity: { duration: reduce ? 0 : 0.2, delay: delay + i * 0.55 },
    },
  });

  return (
    <svg
      aria-hidden
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute text-blue/60', className)}
    >
      <motion.path d={d} {...stroke} {...draw(0)} />
      <motion.path d={head} {...stroke} {...draw(1)} />
    </svg>
  );
}
