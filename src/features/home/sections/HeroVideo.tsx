import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

/**
 * Product walkthrough. The frame is a browser-style shell so the demo reads as
 * the real platform rather than a floating rectangle.
 *
 * The iframe is only mounted after a click: the previous version autoplayed a
 * local file and cropped it with object-cover, which sliced the UI labels off
 * both edges. A facade also keeps YouTube's ~1MB player off the initial load.
 */

const VIDEO_ID = 'vNIhL9TKd0E';
const EMBED = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

export function HeroVideo() {
  const reduce = useReducedMotion() ?? false;
  const [playing, setPlaying] = useState(false);

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
                  <span className="truncate">semiconlabs.com/labs</span>
                </span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint sm:ml-0">
                  Live demo
                </span>
              </div>

              {/* 16:9 stage — nothing is cropped */}
              <div className="relative aspect-video bg-[#0B0E24]">
                {playing ? (
                  <iframe
                    src={EMBED}
                    title="Semicon Labs product walkthrough"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    aria-label="Play the Semicon Labs walkthrough"
                    className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
                  >
                    <img
                      src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-contain"
                      onError={(e) => {
                        e.currentTarget.src = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
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
                      Watch the walkthrough
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
