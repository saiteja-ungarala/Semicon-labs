import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { PreBookDialog } from './PreBookDialog';
import { cn } from '@/lib/cn';

/**
 * The ₹99 pre-book launch offer as a site-native card — redesigned to feature
 * a split "Pre-book vs After Launch" view and premium pill-based benefits list.
 */

export function LaunchOfferCard({ variant = 'full' }: { variant?: 'full' | 'rail' }) {
  const isRail = variant === 'rail';
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className={cn("relative w-full mx-auto rounded-2xl bg-panel shadow-card border border-line overflow-hidden flex flex-col", isRail ? "max-w-[520px]" : "max-w-[800px]")}>
      {/* Top Banner */}
      <div className="bg-blue-600 py-2 text-center px-4">
        <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
          🔥 Limited Launch Offer - Only 1,000 Seats
        </span>
      </div>

      <div className={cn("p-5 flex flex-col items-center", isRail ? "sm:p-6" : "sm:p-7")}>
        {/* Header Titles */}
        <div className="text-center mb-5 flex flex-col items-center">
          <div className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1.5">The Launch Offer</div>
          <h2 className={cn("font-display font-bold text-ink leading-tight mb-2", isRail ? "text-xl sm:text-2xl" : "text-2xl sm:text-3xl")}>Everything you need to<br />break into VLSI.</h2>
          {/* The ₹99 is a reservation fee, not hours — the client rewrote this
              because buyers were reading it as "₹99 buys 200 lab hours". */}
          <div className="mt-3 flex flex-col items-center gap-2">
            <span className={cn('font-mono font-bold text-ink leading-none', isRail ? 'text-3xl sm:text-4xl' : 'text-4xl')}>₹99</span>
            <p
              className={cn(
                'text-pretty text-center leading-relaxed text-ink-dim',
                isRail ? 'max-w-[44ch] text-[12px]' : 'max-w-[46ch] text-[12px] sm:text-[13px]',
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
          <div className="bg-blue-600 text-white p-5 flex-1 flex flex-col items-center justify-center text-center relative z-10">
            <div className="text-white/80 text-[10px] font-bold tracking-widest uppercase mb-2">Pre-book Basic with ₹99</div>
            <div className={cn("font-bold font-display mb-0.5", isRail ? "text-lg" : "text-xl")}>200 lab hours</div>
            <div className="text-white/80 text-[11px] mb-3 font-medium">100 hrs + 100 free</div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-white/60 text-sm line-through font-mono">₹18,000</span>
              <span className="text-3xl font-mono font-bold">₹9,000</span>
            </div>

            <div className="bg-white text-blue-600 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              You Save ₹9,000
            </div>
          </div>

          {/* Pre-book Pro. The old "vs" badge is gone with the after-launch
              panel — these are two offers to choose between, not a comparison. */}
          <div className="bg-void p-5 flex-1 flex flex-col items-center justify-center text-center relative z-10">
            <div className="text-blue-600 text-[10px] font-bold tracking-widest uppercase mb-2">Pre-book Pro with ₹99</div>
            <div className={cn('font-bold font-display text-ink mb-0.5', isRail ? 'text-lg' : 'text-xl')}>200 lab hours</div>
            <div className="text-ink-dim text-[11px] mb-3 font-medium">100 hrs + 100 free</div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-ink-faint text-sm line-through font-mono">₹20,000</span>
              <span className="text-3xl font-mono font-bold text-ink">₹10,000</span>
            </div>

            <div className="bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              You Save ₹10,000
            </div>
          </div>
        </div>

        

        {/* Benefits Pills (Grid Layout) */}
        <div className={cn("w-full mt-5 grid gap-2", isRail ? "grid-cols-1 sm:gap-2.5" : "grid-cols-1 sm:grid-cols-2 sm:gap-3")}>
          <BenefitPill text={<>Pre-book <b>₹99</b> unlocks <b>100 + 100 hours free</b></>} badge="Save ₹9k" />
          <BenefitPill text={<>Access to <b>Recruiter Placement Community</b></>} badge="Network" />
          <BenefitPill text={<>Lifetime access to premium <b>VLSI learning library</b></>} badge="Worth ₹1L" />
          <BenefitPill text={<>Unlock <b>AI-powered learning</b>, on us</>} badge="Free" />
        </div>

        {/* CTA */}
        <div className="w-full mt-6">
          <Button onClick={() => setPayOpen(true)} arrow variant="primary" className="w-full h-12 text-base">
            Grab it for ₹99
          </Button>
          <PreBookDialog open={payOpen} onClose={() => setPayOpen(false)} />
          
        </div>
      </div>
    </div>
  );
}

function BenefitPill({ text, badge }: { text: ReactNode; badge: string }) {
  return (
    <div className="flex flex-row items-center justify-between gap-2 sm:gap-3 bg-blue-50/50 border border-blue-100/50 p-2 sm:p-2.5 rounded-lg">
      <div className="flex items-center gap-2">
        <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white shadow-sm">
          ✓
        </div>
        <span className="text-[11px] sm:text-[12px] text-ink leading-snug [&_b]:text-blue-600 [&_b]:font-semibold">
          {text}
        </span>
      </div>
      <div className="shrink-0 inline-flex items-center justify-center px-2 py-1 rounded-full bg-blue-600 text-white text-[8.5px] font-bold tracking-wider uppercase">
        {badge}
      </div>
    </div>
  );
}
