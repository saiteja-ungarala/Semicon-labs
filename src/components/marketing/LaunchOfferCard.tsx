import { type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { usePlanHref } from '@/lib/checkoutPath';
import { cn } from '@/lib/cn';

/**
 * The ₹99 pre-book launch offer as a site-native card — same clean anatomy as
 * the Basic/Pro tier cards (white panel, gradient ring, tick list), so the two
 * columns read as a matched pair rather than a pasted-in promo.
 */

const BENEFITS: ReactNode[] = [
  <>
    <b>100 + 100 hours free</b> — 200 lab hours for ₹9,000
  </>,
  <>
    <b>Recruiter Placement Community</b> · 290+ network
  </>,
  <>
    Lifetime <b>VLSI learning library</b> · worth ₹1,00,000
  </>,
  <>
    <b>AI-powered learning</b>, on us
  </>,
];

export function LaunchOfferCard({ variant = 'full' }: { variant?: 'full' | 'rail' }) {
  const rail = variant === 'rail';
  const planHref = usePlanHref();
  return (
    <div
      className={cn(
        'gradient-border relative flex flex-col overflow-hidden rounded-3xl border border-transparent bg-panel shadow-glow transition-all duration-300',
        rail ? 'p-6' : 'p-7 hover:-translate-y-1 hover:shadow-card-hover',
      )}
    >
      {/* Soft radial crown — the site's "featured" treatment */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 60% at 50% -12%, rgba(46,30,224,0.10), transparent 55%)' }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <span className="font-display text-[21px] font-bold text-blue-600">Pre-book</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          First 1000 seats
        </span>
      </div>
      <p className="relative mt-0.5 text-[13px] text-ink-dim">Lock the launch rate today</p>

      {/* Price — matches the tier cards' price block rhythm */}
      <div className="relative mt-8 flex items-baseline gap-2.5">
        <span className="font-mono text-[32px] font-bold text-blue-600">₹99</span>
        <span className="text-[13px] font-semibold text-ink-dim">today</span>
      </div>
      <p className="relative mb-6 text-[12.5px] text-ink-dim">fully redeemable on your first purchase</p>

      {/* What it locks in */}
      <div className="relative flex items-baseline justify-between gap-3 rounded-xl border border-blue/20 bg-blue/5 px-4 py-3">
        <span className="text-[12.5px] font-semibold text-ink">200 lab hours at launch</span>
        <span className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="font-mono text-[12px] text-ink-faint line-through">₹18,000</span>
          <span className="font-mono text-[17px] font-bold text-blue-600">₹9,000</span>
        </span>
      </div>

      <ul className="relative mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
        {BENEFITS.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[13.5px] leading-snug text-ink">
            <span
              aria-hidden
              className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-blue-soft text-[10.5px] font-bold text-blue"
            >
              ✓
            </span>
            <span className="[&_b]:font-semibold [&_b]:text-blue-600">{b}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-7">
        <Button to={planHref('/register?plan=individual-launch')} arrow className="w-full">
          Grab it for ₹99
        </Button>
      </div>
    </div>
  );
}
