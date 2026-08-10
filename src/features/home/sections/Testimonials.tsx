import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/data/marketing';

/** Five-star row with half-star support, drawn from the review's rating. */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i + 1));
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
            <defs>
              <linearGradient id={`star-${i}-${String(rating).replace('.', '_')}`}>
                <stop offset={`${fill * 100}%`} stopColor="#F5A623" />
                <stop offset={`${fill * 100}%`} stopColor="#E6E7F4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"
              fill={`url(#star-${i}-${String(rating).replace('.', '_')})`}
            />
          </svg>
        );
      })}
      <span className="ml-1.5 font-mono text-[11.5px] font-bold text-ink-dim">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Rotate every 6 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <Section alt className="overflow-hidden bg-void/5 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Massive quote mark icon */}
        <div className="mb-8 flex justify-center opacity-20">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>

        <div className="relative h-[280px] sm:h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="text-pretty text-2xl font-medium leading-relaxed text-ink sm:text-3xl lg:text-4xl">
                {testimonials[currentIndex].quote}
              </h2>
              
              <div className="mt-10 flex items-center justify-center gap-6">
                <div className="text-right">
                  <Stars rating={testimonials[currentIndex].rating} />
                  <div className="mt-2 font-semibold text-ink">{testimonials[currentIndex].name}</div>
                  <div className="font-mono text-xs text-ink-dim">{testimonials[currentIndex].role}</div>
                </div>
                
                {testimonials[currentIndex].logo === 'google' && (
                  <>
                    <div className="h-8 w-px bg-line" />
                    <div className="flex font-display text-2xl font-bold tracking-tight">
                      <span className="text-blue-500">G</span>
                      <span className="text-red-500">o</span>
                      <span className="text-yellow-500">o</span>
                      <span className="text-blue-500">g</span>
                      <span className="text-green-500">l</span>
                      <span className="text-red-500">e</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
