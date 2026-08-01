import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHead } from '@/components/ui/Section';
import { learningLoop } from '@/data/curriculum';
import { cn } from '@/lib/cn';

/**
 * The learning workflow as a scroll story (Clear Street pattern): a sticky
 * oversized step number rolls 01 → 04 while the steps scroll past, the active
 * step in full ink and the rest receded.
 */
export function HowItWorks() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      // Exact center-line trigger: the step containing the viewport's vertical
      // middle is active — two steps can never fight over it.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    // NOTE: no overflow-hidden on this Section — it would break the sticky number rail.
    <Section id="how" className="relative bg-void-2">
      <SectionHead
        eyebrow="the learning workflow"
        title={
          <>
            Every challenge follows
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">the same real-project loop.</span>
          </>
        }
        lede="Problem → Investigation → Solution → Validation. The same sequence you'd run on a live project."
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(220px,320px)_1fr] lg:gap-16">
        {/* Sticky rolling step number */}
        <div className="hidden lg:block" aria-hidden>
          <div className="sticky top-36">
            {/* `relative` is load-bearing: popLayout's exiting digit is absolutely
                positioned against the nearest positioned ancestor — without it,
                ghost digits escape this masked box and float over the heading. */}
            <div
              className="relative overflow-hidden font-display font-bold leading-none text-blue"
              style={{ fontSize: 'clamp(8rem, 16vw, 13rem)', height: '1em' }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  className="block will-change-transform"
                  initial={reduce ? { opacity: 0 } : { y: '1em', opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-1em', opacity: 0.4 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {String(active + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div>
          {learningLoop.map((stage, i) => (
            <div
              key={stage.step}
              data-index={i}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className="grid gap-4 border-t border-line-strong/60 py-16 sm:grid-cols-[1fr_280px] sm:gap-10 lg:py-24"
            >
              <div>
                {/* Inline number on small screens (sticky rail is desktop-only) */}
                <span className="mb-3 block font-display text-4xl font-bold text-blue lg:hidden">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p
                  className={cn(
                    'font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-500',
                    i === active ? 'text-blue' : 'text-ink-faint',
                  )}
                >
                  {stage.step}
                </p>
                <h3
                  className={cn(
                    'mt-3 font-display text-3xl font-bold leading-tight transition-colors duration-500 sm:text-4xl',
                    i === active ? 'text-ink' : 'text-ink-faint/50',
                  )}
                >
                  {stage.title}
                </h3>
              </div>
              <p
                className={cn(
                  'self-center text-[15px] leading-relaxed transition-colors duration-500',
                  i === active ? 'text-ink-dim' : 'text-ink-faint/60',
                )}
              >
                {stage.description}
              </p>
            </div>
          ))}
          <div className="border-t border-line-strong/60" />
        </div>
      </div>
    </Section>
  );
}
