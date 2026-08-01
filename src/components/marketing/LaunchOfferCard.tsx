import { type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The ₹99 pre-book launch offer as a site-native card (white panel, gradient
 * ring, blue accents — NOT the landing page's solid-indigo styling).
 *
 *  - variant "full": the featured card on the Pricing page's Individual tab.
 *  - variant "rail": compact version for the who-we-serve sticky rail,
 *    carrying the full offer content including after-launch rates.
 */

const BENEFITS: { text: ReactNode; pill: string }[] = [
  {
    text: (
      <>
        Pre-book <b>₹99</b> unlocks <b>100 + 100 hours free</b> — 200 lab hours for just ₹9,000
      </>
    ),
    pill: 'Save ₹9,000',
  },
  {
    text: (
      <>
        Access to our <b>Recruiter Placement Community</b>, after completing the required skills
      </>
    ),
    pill: '290+ network',
  },
  {
    text: (
      <>
        Lifetime access to our premium <b>VLSI learning library</b>
      </>
    ),
    pill: 'Worth ₹1,00,000',
  },
  {
    text: (
      <>
        Unlock <b>AI-powered learning</b>, on us
      </>
    ),
    pill: 'Free',
  },
];

export function LaunchOfferCard({ variant = 'full' }: { variant?: 'full' | 'rail' }) {
  const rail = variant === 'rail';
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
        <span className={cn('font-display font-bold text-blue-600', rail ? 'text-lg' : 'text-[21px]')}>
          Pre-book Offer
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
          <span className="relative flex h-1.5 w-1.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          Only 1,000 seats
        </span>
      </div>
      <p className="relative mt-0.5 text-[13px] text-ink-dim">Everything you need to break into VLSI.</p>

      {/* Price */}
      <div className="relative mt-4 flex items-baseline gap-3">
        <span className={cn('font-mono font-bold text-blue-600', rail ? 'text-[40px]' : 'text-[46px]')}>₹99</span>
        <span className="max-w-[160px] font-mono text-[9.5px] font-bold uppercase leading-snug tracking-wide text-ink-faint">
          Fully redeemable on your first purchase
        </span>
      </div>

      {/* What the ₹99 locks in */}
      <div className="relative mt-4 rounded-2xl border border-blue/20 bg-blue/5 px-4 py-3.5 text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink-dim">Locks the launch rate</p>
        <p className="mt-1 text-[15px] font-extrabold text-ink">
          200 lab hours <span className="font-semibold text-ink-dim">(100 + 100 free)</span>
        </p>
        <p className="mt-0.5 flex items-baseline justify-center gap-2">
          <span className="font-mono text-[13px] text-ink-faint line-through">₹18,000</span>
          <span className="font-mono text-[22px] font-bold text-blue-600">₹9,000</span>
          <span className="rounded-full bg-blue px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
            Save ₹9,000
          </span>
        </p>
      </div>

      {/* Rail variant carries the after-launch rates inline */}
      {rail && (
        <ul className="relative mt-3 rounded-xl border border-line bg-void px-4 py-1">
          {[
            ['After launch · 100 hours', '₹9,000'],
            ['After launch · 200 hours', '₹18,000'],
          ].map(([l, v]) => (
            <li key={l} className="flex items-center justify-between gap-3 border-t border-line/70 py-2 text-[12px] first:border-t-0">
              <span className="text-ink-dim">{l}</span>
              <b className="font-mono text-ink">{v}</b>
            </li>
          ))}
        </ul>
      )}

      {/* Benefits */}
      <ul className={cn('relative flex-1 space-y-2', rail ? 'mt-4' : 'mt-5')}>
        {BENEFITS.map((b, i) => (
          <li key={i} className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] leading-snug text-ink">
            <span aria-hidden className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-blue-soft text-[10px] font-bold text-blue">
              ✓
            </span>
            <span className="min-w-0 flex-1 [&_b]:text-blue-600">{b.text}</span>
            <span className="shrink-0 rounded-full bg-blue px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wide text-white">
              {b.pill}
            </span>
          </li>
        ))}
      </ul>

      <div className={cn('relative', rail ? 'mt-5' : 'mt-6')}>
        <Button to="/register?plan=individual-launch" arrow className="w-full">
          Grab it for ₹99
        </Button>
        <p className="mt-2.5 text-center text-[11px] leading-snug text-ink-faint">
          For ₹99, log in, try the real platform, and experience it yourself.
        </p>
      </div>
    </div>
  );
}
