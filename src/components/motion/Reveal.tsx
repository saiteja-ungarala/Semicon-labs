import { type ReactNode } from 'react';
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
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, ...(reduce ? {} : offset[direction]) },
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
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, ...(reduce ? {} : offset[direction]) },
        show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
