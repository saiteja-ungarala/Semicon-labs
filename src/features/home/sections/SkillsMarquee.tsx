import { marqueeTerms } from '@/data/challenges';

/**
 * Continuous marquee of the skills and flows learners practice.
 * Refined for a premium, sleek aesthetic.
 */
export function SkillsMarquee() {
  // Duplicate the track so the -50% translate loops seamlessly.
  const track = [...marqueeTerms, ...marqueeTerms];

  return (
    <div className="py-12 bg-white overflow-hidden relative border-t border-line/40">
      <div className="mx-auto mb-6 max-w-content px-5 sm:px-6 lg:px-8">
        <p className="text-center font-display text-[13px] font-bold uppercase tracking-[0.12em] text-ink-faint">
          The skills and flows you'll actually practice
        </p>
      </div>
      <div
        className="group relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 15%, #000 85%, transparent)',
        }}
      >
        <div className="flex w-max animate-marquee items-center gap-12 group-hover:[animation-play-state:paused]">
          {track.map((term, i) => (
            <span
              key={`${term}-${i}`}
              className="flex items-center whitespace-nowrap font-display text-xl sm:text-2xl font-extrabold tracking-tight text-ink/20 transition-colors hover:text-blue cursor-default"
            >
              {term}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
