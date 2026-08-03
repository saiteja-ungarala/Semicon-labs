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
}

// Face ↔ name mapping corrected per the client's WhatsApp review (2026-08-03);
// Shaik Hassan Shabbir removed at their request.
const founders: Founder[] = [
  { name: 'Sudheer Anala', role: 'Co-Founder & CEO', exp: 'Ex-Qualcomm · 15+ years', photo: '/images/founders/founder-4.png' },
  { name: 'Ravi Chakka', role: 'Co-Founder & CTO', exp: 'Ex-Intel · 15+ years', photo: '/images/founders/founder-2.png' },
  { name: 'Sashikanth Challa', role: 'Physical Design Expert', exp: 'Ex-NVIDIA · 11+ years', photo: '/images/founders/founder-5.png' },
  { name: 'Srikanth Anumalsetty', role: 'Head of Analog Design', exp: 'Ex-Texas Instruments · 12+ years', photo: '/images/founders/founder-1.png' },
  { name: 'Bharat Devireddy', role: 'Senior Design Engineer', exp: 'Ex-Broadcom · 10+ years', photo: '/images/founders/founder-3.png' },
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
      <div className="relative mx-auto flex h-[460px] max-w-4xl items-center justify-center overflow-visible sm:h-[500px]">
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
      <div className="mt-6 flex items-center justify-center gap-2">
        {founders.map((f, i) => (
          <button
            key={f.name}
            type="button"
            aria-label={`Go to ${f.name}`}
            onClick={() => setActive(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === active ? 'w-7 bg-blue' : 'w-2 bg-line-strong hover:bg-ink-faint',
            )}
          />
        ))}
      </div>
    </div>
  );
}
