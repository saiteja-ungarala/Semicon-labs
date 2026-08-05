import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Section, SectionHead } from '@/components/ui/Section';
import { learningLoop } from '@/data/curriculum';
import { cn } from '@/lib/cn';

/**
 * The learning workflow as a pinned scroll story: on desktop the heading and
 * the stage stay put while you scroll, and the step number + its copy swap
 * 01 → 04 beneath it. Small screens get a plain stacked list — pinning a
 * viewport-tall stage on a phone just fights the reader.
 */

const EASE = [0.22, 1, 0.36, 1] as const;
/**
 * Scroll distance each step holds the stage, in vh. The track adds one extra
 * viewport on top (see TRACK_VH): the observer fires off the viewport's centre
 * line, so every runway block sits half a screen lower than the scroll
 * position it represents. Without that offset the last step would be swapped
 * in just as the stage unpins and would never really be read.
 */
const STEP_VH = 55;
const TRACK_VH = learningLoop.length * STEP_VH + 100;

const pad = (n: number) => String(n).padStart(2, '0');

const head = (
  <SectionHead
    eyebrow="the learning workflow"
    title={
      <>
        Every challenge follows
        <br className="hidden sm:block" />{' '}
        <span className="text-gradient">the same real-project loop.</span>
      </>
    }
  />
);

export function HowItWorks() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const marks = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      // Exact center-line trigger: whichever runway block holds the viewport's
      // middle is the active step, so two steps can never fight over it.
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 },
    );
    marks.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stage = learningLoop[active];

  return (
    // NOTE: no overflow-hidden on this Section — it would break the sticky stage.
    <Section id="how" className="relative bg-void-2">
      {/* ---------------------------------------------- desktop: pinned stage */}
      <div className="relative hidden lg:block" style={{ height: `${TRACK_VH}vh` }}>
        {/* Invisible runway: one block per step, giving the section its scroll
            length and telling the observer which step the reader is on. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {learningLoop.map((s, i) => (
            <div
              key={s.step}
              data-index={i}
              ref={(el) => {
                marks.current[i] = el;
              }}
              className="absolute inset-x-0"
              style={{ top: `${50 + i * STEP_VH}vh`, height: `${STEP_VH}vh` }}
            />
          ))}
        </div>

        <div className="sticky top-28 flex h-[calc(100vh-8rem)] flex-col justify-center">
          {head}

          <div className="grid grid-cols-[minmax(200px,280px)_1fr] items-center gap-12 xl:gap-16">
            {/* Rolling step number. `relative` is load-bearing: popLayout's
                exiting digit is absolutely positioned against the nearest
                positioned ancestor, and would otherwise float over the heading. */}
            <div
              aria-hidden
              className="relative overflow-hidden font-display font-bold leading-none text-blue"
              style={{ fontSize: 'clamp(7rem, 13vw, 11rem)', height: '1em' }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  className="block will-change-transform"
                  initial={reduce ? { opacity: 0 } : { y: '1em', opacity: 0.4 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-1em', opacity: 0.4 }}
                  transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
                >
                  {pad(active + 1)}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* The copy swaps in the same place, so the eye never hunts */}
            <div className="relative min-h-[220px] overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={active}
                  className="grid grid-cols-[1fr_minmax(220px,300px)] items-start gap-10 pt-4"
                  initial={reduce ? { opacity: 0 } : { y: 28, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  // The outgoing copy clears out first — without the entry
                  // delay both headlines sit on top of each other mid-swap and
                  // read as ghosting.
                  exit={
                    reduce
                      ? { opacity: 0, transition: { duration: 0 } }
                      : { y: -28, opacity: 0, transition: { duration: 0.2, ease: EASE } }
                  }
                  transition={{ duration: reduce ? 0 : 0.38, ease: EASE, delay: reduce ? 0 : 0.14 }}
                >
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-blue">
                      {stage.step}
                    </p>
                    <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-ink">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-ink-dim">{stage.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Where you are in the loop */}
          <div className="mt-10 flex items-center gap-2.5 border-t border-line-strong/60 pt-6">
            {learningLoop.map((s, i) => (
              <button
                key={s.step}
                type="button"
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === active}
                onClick={() =>
                  marks.current[i]?.scrollIntoView({
                    block: 'center',
                    behavior: reduce ? 'auto' : 'smooth',
                  })
                }
                className="group py-2"
              >
                <span
                  className={cn(
                    'block h-1 rounded-full transition-all duration-500',
                    i === active
                      ? 'w-16 bg-blue'
                      : i < active
                        ? 'w-8 bg-blue/40 group-hover:bg-blue/70'
                        : 'w-8 bg-line-strong group-hover:bg-ink-faint',
                  )}
                />
              </button>
            ))}
            <span className="ml-3 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
              {pad(active + 1)} / {pad(learningLoop.length)}
            </span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------ mobile: stacked list */}
      <div className="lg:hidden">
        {head}
        {learningLoop.map((s, i) => (
          <div key={s.step} className="grid gap-3 border-t border-line-strong/60 py-10">
            <span className="font-display text-4xl font-bold leading-none text-blue">{pad(i + 1)}</span>
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-blue">{s.step}</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-dim">{s.description}</p>
            </div>
          </div>
        ))}
        <div className="border-t border-line-strong/60" />
      </div>
    </Section>
  );
}
