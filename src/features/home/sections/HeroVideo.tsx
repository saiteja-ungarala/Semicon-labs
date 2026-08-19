import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/cn';

/**
 * Product walkthroughs. The frame is a browser-style shell so the demo reads as
 * the real platform rather than a floating rectangle.
 *
 * Two videos share one stage: a segmented switcher slides between them and the
 * stage crossfades, so the second film gets equal billing without doubling the
 * page height. Only the active video's iframe is ever mounted, and it is
 * unmounted on switch — otherwise the previous one keeps playing audio behind
 * the new poster.
 *
 * The iframe is mounted only after a click: a facade keeps YouTube's ~1MB
 * player off the initial load.
 *
 * NOTE: the second entry currently points at the same film as the first — the
 * client is sending its link. Swapping `id` (and the label/caption) is the only
 * change needed; everything else is driven off this array.
 */

interface Film {
  id: string;
  /** Switcher pill text. */
  label: string;
  /** Sits under the stage. */
  caption: string;
  /** Fake address-bar path in the browser chrome. */
  path: string;
  /** Overlay text on the poster. */
  cta: string;
}

const FILMS: Film[] = [
  {
    id: 'vNIhL9TKd0E',
    label: 'Platform walkthrough',
    caption: 'A tour of the labs, the tools and how a challenge is solved end to end.',
    path: 'semiconlabs.com/labs',
    cta: 'Watch the walkthrough',
  },
  {
    // TODO: replace with the client's second video id when it arrives.
    id: 'vNIhL9TKd0E',
    label: 'Inside a real lab',
    caption: 'A closer look at an industry-grade lab session running in the browser.',
    path: 'semiconlabs.com/demo',
    cta: 'Watch the lab session',
  },
];

const embed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function HeroVideo() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const film = FILMS[active];

  const select = (i: number) => {
    if (i === active) return;
    setPlaying(false); // never leave the previous iframe running
    setActive(i);
  };

  return (
    <section className="relative z-20 mt-8 pb-16 sm:mt-12 sm:pb-24">
      <Container className="px-4 sm:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 48, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: reduce ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-5xl"
        >
          {/* Switcher. The active pill is one element that slides between the
              two via layoutId, so the movement reads as a single control
              rather than two independent fades. */}
          <div className="mb-5 flex justify-center">
            <div
              role="tablist"
              aria-label="Choose a video"
              className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-line bg-panel/80 p-1 shadow-sm backdrop-blur"
            >
              {FILMS.map((f, i) => (
                <button
                  key={f.label}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => select(i)}
                  className={cn(
                    'relative min-h-11 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors sm:px-5',
                    i === active ? 'text-white' : 'text-ink-dim hover:text-ink',
                  )}
                >
                  {i === active && (
                    <motion.span
                      layoutId="video-switch-pill"
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-blue shadow-glow"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    <span
                      aria-hidden
                      className={cn(
                        'font-mono text-[10px]',
                        i === active ? 'text-white/70' : 'text-ink-faint',
                      )}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {f.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* soft brand glow under the shell. Clipped horizontally because the
              glow is inset -2rem either side, which pushed the document wider
              than the viewport on phones and gave the whole page a sideways
              scroll. */}
          <div className="relative [overflow-x:clip]">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-8 -bottom-6 top-10 rounded-[3rem] blur-3xl"
              style={{ background: 'radial-gradient(60% 60% at 50% 50%, rgba(46,30,224,0.16), transparent 70%)' }}
            />

            <div className="relative overflow-hidden rounded-[1.25rem] border border-line/60 bg-white shadow-[0_24px_80px_-12px_rgba(28,20,120,0.22)] sm:rounded-[1.75rem]">
              {/* browser chrome */}
              <div className="flex items-center gap-3 border-b border-line/70 bg-void-2/70 px-4 py-2.5 sm:px-5">
                <span aria-hidden className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                </span>
                <span className="mx-auto hidden min-w-0 max-w-[280px] flex-1 items-center gap-2 rounded-full border border-line bg-panel px-3 py-1 font-mono text-[11px] text-ink-faint sm:flex">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                  </svg>
                  <span className="truncate">{film.path}</span>
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint sm:ml-0">
                  Live demo
                </span>
              </div>

              {/* 16:9 stage — nothing is cropped */}
              <div className="relative aspect-video bg-[#0B0E24]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                    transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {playing ? (
                      <iframe
                        src={embed(film.id)}
                        title={`Semicon Labs — ${film.label}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlaying(true)}
                        aria-label={`Play: ${film.label}`}
                        className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                      >
                        <img
                          src={`https://i.ytimg.com/vi/${film.id}/maxresdefault.jpg`}
                          alt=""
                          aria-hidden
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://i.ytimg.com/vi/${film.id}/hqdefault.jpg`;
                          }}
                        />
                        <span aria-hidden className="absolute inset-0 bg-[#0B0E24]/25 transition-colors group-hover:bg-[#0B0E24]/10" />
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-blue text-white shadow-glow transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20"
                        >
                          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/45 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
                          {film.cta}
                        </span>
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Caption changes with the film, so the switch reads as two distinct
              pieces of content rather than the same video relabelled. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.25 }}
              className="mx-auto mt-4 max-w-xl text-pretty text-center text-[13.5px] text-ink-dim"
            >
              {film.caption}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
