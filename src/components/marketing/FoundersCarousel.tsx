import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/cn';

/**
 * Founders carousel (reference-style): a fanned deck of portrait cards that
 * auto-rotates — the centered card is full-color and raised, the flanks fall
 * back into grayscale. Click any card (or a dot) to bring it forward.
 */

interface Founder {
  name: string;
  role: string;
  exp: string;
  photo: string | null; // null → initials card until the photo arrives
  /**
   * Per-photo framing. The sources are already 4:5, so object-cover shows the
   * whole frame including whatever empty studio background it carries — these
   * shots vary, so the zoom is set per portrait rather than globally.
   */
  imgClass?: string;
}

// Names, experience and backgrounds from the client's founder bio table
// (2026-08-03); face ↔ photo mapping per their earlier WhatsApp review.
const founders: Founder[] = [
  { name: 'Sudheer Anala', role: 'Co-Founder & CEO', exp: 'Ex-NVIDIA (Tegra) · 24+ years', photo: '/images/founders/founder-4.png' },
  { name: 'Ravi Chakka', role: 'Co-Founder & CTO', exp: 'Ex-Synopsys, Intel & AMD · 20+ years', photo: '/images/founders/founder-2.png' },
  // Tighter crop: this portrait carries a lot of empty wall either side.
  { name: 'Sashikanth Challa', role: 'Head of Software', exp: 'Ex-Apple & eBay · 20+ years', photo: '/images/founders/founder-5.png', imgClass: 'scale-[1.3] origin-top' },
  // Zoomed so the frame ends around the folded hands rather than mid-torso.
  { name: 'Srikanth Anumalasetty', role: 'Synthesis & STA Expert', exp: 'Ex-AMD & Xilinx · 15+ years', photo: '/images/founders/founder-1.png', imgClass: 'scale-[1.3] origin-top' },
  { name: 'Bharath Devireddy', role: 'Senior Design Engineer', exp: 'Ex-Marvell & AMD · 15+ years', photo: '/images/founders/founder-3.png' },
];

const AUTO_MS = 3200;

export function FoundersCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % founders.length), AUTO_MS);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* The deck fans cards out to either side with absolute offsets tuned for
          desktop; on a phone those reach past the viewport and scroll the page
          sideways. Clipping on the x-axis only keeps the fan intact while the
          cards that sit outside simply disappear, which is the intent anyway. */}
      <div className="relative mx-auto flex h-[460px] max-w-4xl items-center justify-center [overflow-x:clip] sm:h-[500px]">
        {founders.map((f, i) => {
          // Signed circular offset from the active card: ... -2 -1 0 1 2 ...
          let off = i - active;
          const n = founders.length;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          const visible = abs <= 2;
          return (
            <motion.button
              key={f.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${f.name}`}
              className="absolute w-[240px] sm:w-[270px]"
              initial={false}
              animate={{
                x: off * (typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 190),
                scale: abs === 0 ? 1 : abs === 1 ? 0.86 : 0.74,
                opacity: visible ? (abs === 0 ? 1 : abs === 1 ? 0.85 : 0.5) : 0,
                zIndex: 10 - abs,
                rotate: off * 2.5,
              }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 210, damping: 26 }}
              style={{ pointerEvents: visible ? 'auto' : 'none' }}
            >
              <span
                className={cn(
                  'block overflow-hidden rounded-3xl border bg-panel shadow-card transition-all duration-500',
                  abs === 0 ? 'border-blue/40 shadow-card-hover' : 'border-line',
                )}
              >
                <span className="block aspect-[4/5] w-full overflow-hidden bg-void-2">
                  {f.photo ? (
                    <img
                      src={f.photo}
                      alt={f.name}
                      loading="lazy"
                      className={cn(
                        'h-full w-full object-cover transition-all duration-700',
                        abs === 0 ? 'grayscale-0' : 'grayscale',
                        f.imgClass,
                      )}
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-blue-soft font-display text-5xl font-extrabold text-blue">
                      {f.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </span>
                  )}
                </span>
                <span className="block px-4 py-4 text-center">
                  <span className={cn('block text-lg font-bold transition-colors', abs === 0 ? 'text-blue' : 'text-ink')}>
                    {f.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] font-semibold text-ink">{f.role}</span>
                  <span className="block text-[12px] text-ink-dim">{f.exp}</span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Dots */}
      {/* No gap: each button already carries its own 44px tap padding. */}
      <div className="mt-6 flex items-center justify-center">
        {founders.map((f, i) => (
          <button
            key={f.name}
            type="button"
            aria-label={`Go to ${f.name}`}
            onClick={() => setActive(i)}
            // The dot stays 8px visually, but the button is padded to a 44px
            // tap target — an 8px hit area is unusable on a phone.
            className="grid h-11 w-11 place-items-center"
          >
            <span
              aria-hidden
              className={cn(
                'block h-2 rounded-full transition-all',
                i === active ? 'w-7 bg-blue' : 'w-2 bg-line-strong hover:bg-ink-faint',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
