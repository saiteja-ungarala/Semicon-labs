import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

const HEADLINES = [
  'Industry Ready Programs.',
  'AI Powered Learning.',
  'Learn by Building.',
  'Career Accelerators.',
  'Future Skills.',
  'Enterprise Training.',
  'Pro Certifications.',
];

const BACKGROUND_WORDS = [
  'Freshers', 'Placements', 'Mentorship', 'Tapeouts', 'Physical Design', 'Verification', 'RTL', 'Timing Closure', 'UVM', 'Licensing Trust', 'Certificates',
];

const TOOL_LOGOS = [
  { name: 'Cadence', src: '/logos/hero-cadence.png', h: 'h-7' },
  { name: 'Synopsys', src: '/logos/hero-synopsys.png', h: 'h-7' },
  { name: 'Siemens', src: '/logos/hero-siemens.png', h: 'h-9' },
];

const SEATS_CLAIMED = 639;
const SEATS_TOTAL = 1000;

/** Launch registrations bar — count ticks up and the track fills on view. */
function RegistrationsBar() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(reduce ? SEATS_CLAIMED : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    const dur = 1300;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setCount(Math.round(SEATS_CLAIMED * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="w-full max-w-md">
      <div className="flex items-center justify-between font-mono text-[12px] text-ink-dim">
        <span>Launch registrations</span>
        <span>
          <b className="text-blue">{count}</b> / {SEATS_TOTAL.toLocaleString('en-IN')} claimed
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 via-blue to-sky"
          initial={{ width: reduce ? `${(SEATS_CLAIMED / SEATS_TOTAL) * 100}%` : '0%' }}
          animate={inView ? { width: `${(SEATS_CLAIMED / SEATS_TOTAL) * 100}%` } : undefined}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [headlineIndex, setHeadlineIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 15, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollingWords = [...BACKGROUND_WORDS, ...BACKGROUND_WORDS, ...BACKGROUND_WORDS];

  return (
    <section className="relative flex min-h-[62vh] flex-col items-center justify-center overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      {/* Background scrolling words, masked to the edges */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-[70%] z-0 w-full -translate-y-1/2 select-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent 0%, black 15%, black 25%, transparent 42%, transparent 58%, black 75%, black 85%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, black 15%, black 25%, transparent 42%, transparent 58%, black 75%, black 85%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-16 py-4 opacity-40 blur-[1px]">
          {scrollingWords.map((w, i) => (
            <span key={i} className="whitespace-nowrap font-display text-4xl font-extrabold text-ink-faint/30 sm:text-6xl">
              {w}
            </span>
          ))}
        </div>
      </div>

      <Container className="relative z-10 w-full px-4 sm:px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto mt-4 flex max-w-4xl flex-col items-center text-center sm:mt-8"
        >
          {/* 1 — The main claim */}
          <motion.h1 variants={item} className="font-display font-extrabold tracking-tight text-ink">
            <span className="block text-[clamp(2.5rem,5vw,4.2rem)] leading-[1.05]">
              The world's first{' '}
              <span className="bg-gradient-to-r from-blue via-[#5B4DFF] to-sky bg-clip-text text-transparent">
                VLSI cloud labs
              </span>
            </span>
            <span className="mt-3 block text-[clamp(1.25rem,2.4vw,1.9rem)] font-bold leading-snug text-ink/85">
              for solving industry-grade projects on leading EDA tools.
            </span>
          </motion.h1>

          {/* 2 — Real tool logos */}
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {TOOL_LOGOS.map((t) => (
              <img
                key={t.name}
                src={t.src}
                alt={t.name}
                className={`${t.h} w-auto max-w-[150px] object-contain opacity-90`}
                loading="eager"
              />
            ))}
          </motion.div>

          {/* 3 — The rotating promise */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-baseline justify-center gap-x-2.5 text-lg font-semibold text-ink-dim sm:text-xl"
          >
            <span>Solve real chip problems with the industry's</span>
            <span className="relative inline-flex h-[1.4em] min-w-[14ch] overflow-hidden text-left" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={headlineIndex}
                  initial={reduce ? { opacity: 0 } : { y: '1.1em', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-1.1em', opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="whitespace-nowrap font-bold text-blue"
                >
                  {HEADLINES[headlineIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* 4 — CTAs */}
          <motion.div
            variants={item}
            className="relative z-20 mt-10 flex w-full max-w-sm flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row"
          >
            <Button to="/domains" size="lg" arrow className="h-12 w-full px-8 text-[15px] shadow-glow sm:w-auto">
              Explore Skills
            </Button>
            <Button to="/pricing" size="lg" variant="secondary" className="h-12 w-full bg-white px-8 text-[15px] hover:bg-void-2 sm:w-auto">
              View Pricing
            </Button>
          </motion.div>

          {/* 5 — Launch registrations (replaces the old start-free note) */}
          <motion.div variants={item} className="relative z-20 mt-9 flex w-full justify-center">
            <RegistrationsBar />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
