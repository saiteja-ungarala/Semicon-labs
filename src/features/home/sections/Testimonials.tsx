import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { testimonials } from '@/data/marketing';

/**
 * The review wall. This used to rotate one quote at a time on a six-second
 * timer, which meant eight of the nine reviews were never seen — the proof
 * was there and the page spent it one line at a time. Showing them all at
 * once is what makes a testimonial section persuasive.
 *
 * Laid out in CSS columns rather than a grid: the quotes vary a lot in
 * length, and columns let a short card sit under a long one instead of
 * leaving every row as tall as its tallest card.
 */

/** Reviewers give an employer or an institute, never a logo. Matching on the
 *  role keeps the data file free of presentation detail. */
const CRESTS: { match: RegExp; src: string; alt: string; h: string }[] = [
  { match: /IIT/i, src: '/logos/iit-kharagpur.png', alt: 'IIT Kharagpur', h: 'h-8' },
  { match: /NVIDIA/i, src: '/logos/trim/nvidia.png', alt: 'NVIDIA', h: 'h-4' },
  { match: /Intel/i, src: '/logos/trim/intel.png', alt: 'Intel', h: 'h-5' },
];
const crestFor = (role: string) => CRESTS.find((c) => c.match.test(role));

/** Neutral stand-in: we have no reviewer photos, and inventing faces for real
 *  quotes would misrepresent them. */
function Avatar({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue/15"
      title={name}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue/45" fill="currentColor">
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" />
      </svg>
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  const key = String(rating).replace('.', '_');
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - i + 1));
        return (
          <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
            <defs>
              <linearGradient id={`t-star-${i}-${key}`}>
                <stop offset={`${fill * 100}%`} stopColor="#F5A623" />
                <stop offset={`${fill * 100}%`} stopColor="#E6E7F4" />
              </linearGradient>
            </defs>
            <path
              d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4 6.2 20.5l1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z"
              fill={`url(#t-star-${i}-${key})`}
            />
          </svg>
        );
      })}
      <span className="ml-1.5 font-mono text-[10.5px] font-bold text-ink-faint">{rating.toFixed(1)}</span>
    </div>
  );
}

export function Testimonials() {
  const average = testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length;

  return (
    <Section alt id="reviews" className="overflow-hidden">
      <SectionHead
        eyebrow="what learners say"
        title={
          <>
            Reviewed by the engineers
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">who trained here</span>
          </>
        }
      />

      <div className="mb-10 flex items-center justify-center gap-3">
        <Stars rating={average} />
        <span className="text-[13px] text-ink-dim">
          from <b className="font-semibold text-ink">{testimonials.length}</b> verified learners
        </span>
      </div>

      {/* columns, not grid — see the note at the top of the file */}
      <div className="mx-auto max-w-6xl gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {testimonials.map((t, i) => {
          const crest = crestFor(t.role);
          return (
            <Reveal key={t.name + i} delay={(i % 3) * 0.06}>
              <figure className="mb-5 break-inside-avoid rounded-2xl border border-line bg-panel p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                <Stars rating={t.rating} />
                <blockquote className="mt-3.5 text-pretty text-[14.5px] leading-relaxed text-ink-dim">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                  <Avatar name={t.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-ink">{t.name}</span>
                    <span className="block truncate font-mono text-[11px] text-ink-faint">{t.role}</span>
                  </span>
                  {crest && (
                    <img
                      src={crest.src}
                      alt={crest.alt}
                      loading="lazy"
                      className={`${crest.h} w-auto shrink-0 object-contain`}
                    />
                  )}
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
