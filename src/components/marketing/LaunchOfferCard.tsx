import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { PreBookDialog } from './PreBookDialog';
import { cn } from '@/lib/cn';

/**
 * The ₹99 pre-book launch offer as a site-native card — a split
 * "Pre-book Basic / Pre-book Pro" panel over a pill-based benefits list.
 *
 * Two variants:
 *  - `full` — the wide standalone card on the home, audience and domain pages.
 *  - `rail` — a compact 460px column for the Exclusive offers tab, where it
 *    stands beside the Basic/Pro plan cards. Every step of the type scale drops
 *    one size and the card stretches to the grid row with its CTA pinned to the
 *    bottom, so all three cards share a top and a bottom edge instead of the
 *    offer towering over the plans it applies to.
 */

export function LaunchOfferCard({ variant = 'full' }: { variant?: 'full' | 'rail' }) {
  const isRail = variant === 'rail';
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div
      className={cn(
        'relative w-full mx-auto rounded-2xl bg-panel shadow-card border border-line overflow-hidden flex flex-col',
        isRail ? 'h-full max-w-[460px]' : 'max-w-[800px]',
      )}
    >
      {/* Top Banner */}
      <div className="bg-blue-600 py-2 text-center px-4">
        <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
          🔥 Limited Launch Offer - Only 1,000 Seats
        </span>
      </div>

      {/* flex-1 lets the body fill a stretched card; it is inert at `full`,
          where nothing constrains the height. */}
      <div className={cn('p-5 flex flex-1 flex-col items-center', isRail ? 'sm:p-5 sm:pb-7' : 'sm:p-7')}>
        {/* Header Titles */}
        <div className={cn('text-center flex flex-col items-center', isRail ? 'mb-4' : 'mb-5')}>
          {/* Dropped in the rail: it would be the third "launch offer" label in
              a row, under the column heading and the banner right above it. */}
          {!isRail && (
            <div className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1.5">
              The Launch Offer
            </div>
          )}
          <h2
            className={cn(
              'font-display font-bold text-ink leading-tight mb-2',
              isRail ? 'text-xl' : 'text-2xl sm:text-3xl',
            )}
          >
            Everything you need to
            <br />
            break into VLSI.
          </h2>
          {/* The ₹99 is a reservation fee, not hours — the client rewrote this
              because buyers were reading it as "₹99 buys 200 lab hours". */}
          <div className={cn('flex flex-col items-center', isRail ? 'mt-2 gap-1.5' : 'mt-3 gap-2')}>
            <span
              className={cn(
                'font-mono font-bold text-ink leading-none',
                isRail ? 'text-3xl' : 'text-4xl',
              )}
            >
              ₹99
            </span>
            <p
              className={cn(
                'text-pretty text-center leading-relaxed text-ink-dim',
                // The rail column is narrow enough on its own — a ch-based cap
                // on top of it squeezed this copy into nine lines.
                isRail ? 'text-[11.5px]' : 'max-w-[46ch] text-[12px] sm:text-[13px]',
              )}
            >
              <b className="text-blue-600">₹99</b> is only a pre-booking fee to reserve your spot for
              the Launch Offer—it does not include any Lab Hours. By{' '}
              <b className="text-ink">15th September</b>, pay <b className="text-ink">₹9,000 + GST</b>{' '}
              for 100 Lab Hours and get <b className="text-blue-600">100 additional Lab Hours FREE</b>.
              Your ₹99 pre-booking fee will be fully redeemable against this first purchase.
            </p>
          </div>
        </div>

        {/* The Split Card */}
        <div className="w-full relative rounded-xl border border-line-strong overflow-hidden flex flex-col shadow-sm sm:flex-row">

          {/* Pre-book Basic */}
          <div className={cn('bg-blue-600 text-white flex-1 flex flex-col items-center justify-center text-center relative z-10', isRail ? 'p-4' : 'p-5')}>
            <div className={cn('text-white/80 text-[10px] font-bold tracking-widest uppercase', isRail ? 'mb-1.5' : 'mb-2')}>Pre-book Basic with ₹99</div>
            <div className={cn('font-bold font-display mb-0.5', isRail ? 'text-base' : 'text-xl')}>200 lab hours</div>
            <div className={cn('text-white/80 text-[11px] font-medium', isRail ? 'mb-2' : 'mb-3')}>100 hrs + 100 free</div>

            <div className={cn('flex items-center justify-center gap-2', isRail ? 'mb-2' : 'mb-3')}>
              <span className={cn('text-white/60 line-through font-mono', isRail ? 'text-[12px]' : 'text-sm')}>₹18,000</span>
              <span className={cn('font-mono font-bold', isRail ? 'text-2xl' : 'text-3xl')}>₹9,000</span>
            </div>

            <div className="bg-white text-blue-600 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              You Save ₹9,000
            </div>
          </div>

          {/* Pre-book Pro. The old "vs" badge is gone with the after-launch
              panel — these are two offers to choose between, not a comparison. */}
          <div className={cn('bg-void flex-1 flex flex-col items-center justify-center text-center relative z-10', isRail ? 'p-4' : 'p-5')}>
            <div className={cn('text-blue-600 text-[10px] font-bold tracking-widest uppercase', isRail ? 'mb-1.5' : 'mb-2')}>Pre-book Pro with ₹99</div>
            <div className={cn('font-bold font-display text-ink mb-0.5', isRail ? 'text-base' : 'text-xl')}>200 lab hours</div>
            <div className={cn('text-ink-dim text-[11px] font-medium', isRail ? 'mb-2' : 'mb-3')}>100 hrs + 100 free</div>

            <div className={cn('flex items-center justify-center gap-2', isRail ? 'mb-2' : 'mb-3')}>
              <span className={cn('text-ink-faint line-through font-mono', isRail ? 'text-[12px]' : 'text-sm')}>₹20,000</span>
              <span className={cn('font-mono font-bold text-ink', isRail ? 'text-2xl' : 'text-3xl')}>₹10,000</span>
            </div>

            <div className="bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              You Save ₹10,000
            </div>
          </div>
        </div>

        {/* Benefits Pills. One per row in the rail — at ~420px of content two
            columns broke every pill onto four or five lines. */}
        <div className={cn('w-full grid', isRail ? 'mt-4 gap-1.5' : 'mt-5 gap-2 grid-cols-1 sm:grid-cols-2 sm:gap-3')}>
          <BenefitPill compact={isRail} text={<>Pre-book <b>₹99</b> unlocks <b>100 + 100 hours free</b></>} badge="Save ₹9k" />
          <BenefitPill compact={isRail} text={<>Access to <b>Recruiter Placement Community</b></>} badge="Network" />
          <BenefitPill compact={isRail} text={<>Lifetime access to premium <b>VLSI learning library</b></>} badge="Worth ₹1L" />
          <BenefitPill compact={isRail} text={<>Unlock <b>AI-powered learning</b>, on us</>} badge="Free" />
        </div>

        {/* CTA. mt-auto in the rail pins it to the bottom edge of the stretched
            card, level with the "Start with Basic/Pro" buttons beside it. */}
        <div className={cn('w-full', isRail ? 'mt-auto pt-5' : 'mt-6')}>
          <Button
            onClick={() => setPayOpen(true)}
            arrow
            variant="primary"
            className={cn('w-full', isRail ? 'h-11 text-[15px]' : 'h-12 text-base')}
          >
            Grab it for ₹99
          </Button>
          <PreBookDialog open={payOpen} onClose={() => setPayOpen(false)} />

        </div>
      </div>
    </div>
  );
}

function BenefitPill({ text, badge, compact }: { text: ReactNode; badge: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex flex-row items-center justify-between gap-2 sm:gap-3 bg-blue-50/50 border border-blue-100/50 rounded-lg',
        compact ? 'px-2.5 py-1.5' : 'p-2 sm:p-2.5',
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white shadow-sm">
          ✓
        </div>
        <span
          className={cn(
            'text-ink [&_b]:text-blue-600 [&_b]:font-semibold',
            compact ? 'text-[11px]' : 'text-[11px] sm:text-[12px]',
            // Last: twMerge strips an earlier leading-* when a later argument
            // sets a font size, since Tailwind sizes normally carry one.
            'leading-snug',
          )}
        >
          {text}
        </span>
      </div>
      <div className="shrink-0 inline-flex items-center justify-center px-2 py-1 rounded-full bg-blue-600 text-white text-[8.5px] font-bold tracking-wider uppercase">
        {badge}
      </div>
    </div>
  );
}
