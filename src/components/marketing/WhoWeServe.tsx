import { Link } from 'react-router-dom';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { SeatMap } from '@/components/marketing/SeatMap';
import { audiences } from '@/data/audiences';
import { cn } from '@/lib/cn';

/**
 * Audience selector as a magnification ladder through silicon: one bonded die,
 * a five-die cluster, a full wafer. Scale — one person, a cohort, an
 * organisation — is readable from the picture and from the stepped panel
 * heights before a word is read, which is the question this surface exists to
 * answer. Three identical white cards could never say it that fast.
 */

const ART: Record<string, { photo: string; position: string; kind: 'die' | 'cluster' | 'wafer'; seats: string }> = {
  individuals: { photo: '/images/chips/chip-macro.jpg', position: '50% 45%', kind: 'die', seats: '1 engineer' },
  teams: { photo: '/images/chips/chip-neon.jpg', position: '50% 50%', kind: 'cluster', seats: 'min 2' },
  corporates: { photo: '/images/chips/chip-violet.jpg', position: '50% 72%', kind: 'wafer', seats: 'min 10 licenses' },
};

// Stepped heights: the composition itself is the data.
const HEIGHT = ['lg:min-h-[430px]', 'lg:min-h-[480px]', 'lg:min-h-[530px]'];
const HEIGHT_DETAILED = ['lg:min-h-[540px]', 'lg:min-h-[590px]', 'lg:min-h-[640px]'];

interface WhoWeServeProps {
  /** Show the fuller layout (used on the dedicated page). */
  detailed?: boolean;
}

export function WhoWeServe({ detailed = false }: WhoWeServeProps) {
  return (
    <>
      <RevealGroup className="grid gap-5 lg:grid-cols-3 lg:items-end lg:gap-6" stagger={0.12}>
        {audiences.map((a, i) => {
          const art = ART[a.slug] ?? ART.individuals;
          return (
            <RevealItem key={a.slug} className="h-full">
              <article
                id={a.slug}
                className={cn(
                  'group relative isolate flex h-full min-h-[320px] scroll-mt-28 flex-col justify-end overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1',
                  detailed ? HEIGHT_DETAILED[i] : HEIGHT[i],
                )}
              >
                {/* Duotone silicon ground — one photograph, pushed to brand blue */}
                <img
                  src={art.photo}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover brightness-[0.85] contrast-[1.15] grayscale transition-transform duration-[1200ms] group-hover:scale-[1.04]"
                  style={{ objectPosition: art.position }}
                />
                <span aria-hidden className="absolute inset-0 -z-10 bg-blue opacity-90 mix-blend-color" />
                <span aria-hidden className="absolute inset-0 -z-10 bg-navy/45 mix-blend-multiply" />
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-[#070A1E] via-[#070A1E]/75 to-[#070A1E]/20"
                />

                <SeatMap
                  kind={art.kind}
                  slug={a.slug}
                  className="absolute right-6 top-6 h-[92px] w-[92px] lg:left-7 lg:right-auto lg:top-7 lg:h-[116px] lg:w-[116px]"
                />
                <span
                  aria-hidden
                  className="absolute left-6 top-4 font-mono text-[56px] font-bold leading-none text-white/10 lg:left-auto lg:right-7 lg:top-5 lg:text-[68px]"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative p-6 lg:p-8">
                  <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[#A9A2FF]">
                    {art.seats}
                  </p>
                  <h3 className="mt-2 font-display text-[26px] font-bold leading-tight text-white lg:text-[30px]">
                    {a.title}
                  </h3>
                  <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-white/65">{a.summary}</p>

                  {detailed && (
                    <ul className="mt-5 space-y-2 border-t border-white/15 pt-4">
                      {a.points.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-[13px] leading-snug text-white/75">
                          <span aria-hidden className="mt-[3px] font-mono text-[#A9A2FF]">
                            ✓
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <Link
                      to={a.cta.to}
                      className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13.5px] font-bold text-[#0B0E24] transition-all hover:gap-3 hover:bg-[#EFEDFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0E24]"
                    >
                      {a.cta.label} <span aria-hidden>→</span>
                    </Link>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">
                      {a.planLabel}
                    </span>
                  </div>
                </div>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Drafting-style dimension rule: the headcount ladder, stated once in the open */}
      <div aria-hidden className="mt-5 hidden lg:grid lg:grid-cols-3 lg:gap-6">
        {audiences.map((a) => (
          <div key={a.slug} className="flex items-center gap-2">
            <span className="h-3 w-px bg-line-strong" />
            <span className="h-px flex-1 bg-line-strong" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              {(ART[a.slug] ?? ART.individuals).seats}
            </span>
            <span className="h-px flex-1 bg-line-strong" />
            <span className="h-3 w-px bg-line-strong" />
          </div>
        ))}
      </div>
    </>
  );
}
