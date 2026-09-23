import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Modal } from '@/components/ui/Modal';
import { StarterPackCard } from '@/components/marketing/IndividualOffer';

// The rotating slot after "…the industry's" cycles the real EDA vendor logos,
// in full colour, with the same slide transition the headlines used.
// The slot after "Get Placed at" cycles recruiter logos rather than words:
// the names carry more weight than any phrase we could write there.
const PLACEMENT_LOGOS = [
  { name: 'AMD', src: '/logos/trim/amd.png', h: 'h-6 sm:h-7' },
  { name: 'Qualcomm', src: '/logos/trim/qualcomm.png', h: 'h-5 sm:h-6' },
  { name: 'Intel', src: '/logos/trim/intel.png', h: 'h-6 sm:h-7' },
];

const BACKGROUND_WORDS = [
  'Freshers', 'Placements', 'Mentorship', 'Tapeouts', 'Physical Design', 'Verification', 'RTL', 'Timing Closure', 'UVM', 'Licensing Trust', 'Certificates',
];

const TOOL_LOGOS = [
  { name: 'Cadence', src: '/logos/hero-cadence.png', h: 'h-7' },
  { name: 'Synopsys', src: '/logos/hero-synopsys.png', h: 'h-7' },
  { name: 'Siemens', src: '/logos/hero-siemens.png', h: 'h-9' },
];

/** The launch-registrations bar became the ₹499 offer: two chips — the
 *  Launch Pad name and its price — both landing on the pricing cards. */
function LaunchPadOffer() {
  return (
    <Link
      to="/pricing#plans"
      aria-label="VLSI Launch Pad — ₹499 one-time. See the pricing card."
      className="group w-full flex-1 sm:min-w-[240px]"
    >
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:justify-start">
        <span className="rounded-full border border-line-strong bg-void/60 px-4 py-1.5 font-display text-[13.5px] font-bold text-ink">
          VLSI Launch Pad
        </span>
        <span className="rounded-full bg-blue px-4 py-1.5 font-mono text-[13px] font-bold text-white shadow-sm transition group-hover:bg-blue-600">
          @ ₹499
        </span>
      </div>
      <p className="mt-2.5 text-center font-mono text-[11px] text-ink-dim sm:text-left">
        10 Lab Hours · Premium VLSI Content ·{' '}
        <span className="whitespace-nowrap">
          EDA Tools
          <span className="ml-1 inline-block text-blue transition group-hover:translate-x-0.5">→</span>
        </span>
      </p>
    </Link>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [pricingOpen, setPricingOpen] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const i = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % PLACEMENT_LOGOS.length);
    }, 2500);
    return () => clearInterval(i);
  }, [reduce]);

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
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden pb-8 pt-8 sm:pb-10 sm:pt-10">
      {/* Subtle radial glow to enhance tech feel */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-blue-600/10 blur-[120px]" />

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
        <div className="flex w-max animate-marquee items-center gap-16 py-4 opacity-25 blur-[1px]">
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
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
        >
          {/* 1 — The main claim */}
          <motion.h1 variants={item} className="font-display font-extrabold tracking-tight text-ink">
            <span className="block text-balance text-[clamp(2.75rem,5.4vw,6rem)] leading-[1.02]">
              The world's first{' '}
              <span className="bg-gradient-to-r from-blue via-[#5B4DFF] to-sky bg-clip-text text-transparent">
                VLSI cloud labs
              </span>
            </span>
            {/* Ends on placements — the client's "highlight placements" note on
                the hero (Aug 2026 change doc). */}
            <span className="mx-auto mt-5 block max-w-2xl text-[clamp(1.1rem,2vw,1.4rem)] font-medium leading-relaxed text-ink-dim">
              Solve Real-Time Industry Projects, Master Practical Skills, and{' '}
              <span className="font-semibold text-blue">Get Placement-Ready</span>
            </span>
          </motion.h1>

          {/* 3 — The rotating promise */}
          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-3 text-[16px] text-ink-dim"
          >
            <span className="text-[18px] font-semibold text-ink">Get Placed at</span>
            {/* popLayout (not "wait") so the outgoing logo leaves while the next
                one arrives — with "wait" there is a visibly empty gap. */}
            <span className="relative inline-flex h-[2.6em] min-w-[150px] items-center justify-center overflow-hidden rounded-full bg-blue-50/80 border border-blue-100 shadow-sm px-5" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.img
                  key={headlineIndex}
                  src={PLACEMENT_LOGOS[headlineIndex].src}
                  alt={PLACEMENT_LOGOS[headlineIndex].name}
                  initial={reduce ? { opacity: 0 } : { y: '1.1em', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: '-1.1em', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute w-auto max-w-[120px] object-contain ${PLACEMENT_LOGOS[headlineIndex].h}`}
                />
              </AnimatePresence>
            </span>
          </motion.div>

          {/* 4 — CTAs, kept close to the claim */}
          <motion.div
            variants={item}
            className="relative z-20 mt-8 flex w-full max-w-sm flex-col items-center justify-center gap-3.5 sm:max-w-none sm:flex-row"
          >
            <Button to="/domains" size="lg" arrow className="h-12 w-full px-8 text-[15px] shadow-glow sm:w-auto">
              Explore now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setPricingOpen(true)}
              className="h-12 w-full bg-white px-8 text-[15px] hover:bg-void-2 sm:w-auto"
            >
              View Pricing
            </Button>
          </motion.div>

          {/* 5 — One designed strip closes the hero: real tools + the ₹499 offer */}
          <motion.div variants={item} className="relative z-20 mt-10 w-full">
            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-2xl backdrop-blur-md"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-line bg-void/50 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 text-center font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                  Get hands on experience with{' '}
                  <span className="font-bold text-blue">VLSI Launch Pad</span>
                </div>
                <div className="w-10" /> {/* Spacer for flex balance */}
              </div>

              {/* Window Body */}
              <div className="flex flex-col items-center gap-6 px-8 py-8 sm:flex-row sm:gap-10">
                <div className="flex shrink-0 flex-col items-center gap-3 sm:items-start">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink-dim">
                    Real tools, in your browser
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
                    {TOOL_LOGOS.map((t) => (
                      <img
                        key={t.name}
                        src={t.src}
                        alt={t.name}
                        className={`${t.h} w-auto max-w-[130px] object-contain opacity-90`}
                        loading="eager"
                      />
                    ))}
                  </div>
                </div>
                <div aria-hidden className="hidden h-14 w-px shrink-0 bg-line sm:block" />
                <LaunchPadOffer />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
      <Modal open={pricingOpen} onClose={() => setPricingOpen(false)} label="Individual pricing">
        <StarterPackCard />
      </Modal>
    </section>
  );
}
