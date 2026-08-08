import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from '@/lib/cn';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  none: {},
};

/**
 * Below `sm` a horizontal reveal is swapped for a vertical one. An element
 * waiting off-screen sits at its start offset, and a sideways offset widens
 * the document — which showed up as a few pixels of horizontal scroll on a
 * phone. Vertical offsets cannot do that.
 */
const NARROW_MQ = '(max-width: 639px)';

function useNarrow() {
  // Read synchronously on the FIRST render: framer resolves the `initial`
  // variant at mount, so a value that only arrives in an effect lands too late
  // and the element keeps the sideways offset it was never meant to have.
  const [narrow, setNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(NARROW_MQ).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(NARROW_MQ);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return narrow;
}

function offsetFor(direction: Direction, reduce: boolean, narrow: boolean) {
  if (reduce) return {};
  if (narrow && (direction === 'left' || direction === 'right')) return offset.up;
  return offset[direction];
}

interface RevealProps {
  as?: 'div' | 'section' | 'li' | 'span' | 'article';
  direction?: Direction;
  delay?: number;
  className?: string;
  once?: boolean;
  children: ReactNode;
}

/** Scroll-triggered reveal. Honors prefers-reduced-motion automatically. */
export function Reveal({
  as = 'div',
  direction = 'up',
  delay = 0,
  className,
  once = true,
  children,
}: RevealProps) {
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...offsetFor(direction, !!reduce, narrow) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers the reveal of its children. Pair with RevealItem. */
export function RevealGroup({
  className,
  stagger = 0.08,
  children,
}: {
  className?: string;
  stagger?: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  className,
  direction = 'up',
  children,
}: {
  className?: string;
  direction?: Direction;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const narrow = useNarrow();
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...offsetFor(direction, !!reduce, narrow) },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
