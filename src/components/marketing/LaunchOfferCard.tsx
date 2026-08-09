import { type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { usePlanHref } from '@/lib/checkoutPath';
import { cn } from '@/lib/cn';

/**
 * The ₹99 pre-book launch offer as a site-native card — redesigned to feature
 * a split "Pre-book vs After Launch" view and premium pill-based benefits list.
 */

export function LaunchOfferCard({ variant = 'full' }: { variant?: 'full' | 'rail' }) {
  const planHref = usePlanHref();
  const isRail = variant === 'rail';

  return (
    <div className={cn("relative w-full mx-auto rounded-2xl bg-panel shadow-card border border-line overflow-hidden flex flex-col", isRail ? "max-w-[400px]" : "max-w-[800px]")}>
      {/* Top Banner */}
      <div className="bg-blue-600 py-2 text-center px-4">
        <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
          🔥 Limited Launch Offer - Only 1,000 Seats
        </span>
      </div>

      <div className={cn("p-5 flex flex-col items-center", isRail ? "p-5" : "sm:p-7")}>
        {/* Header Titles */}
        <div className="text-center mb-5 flex flex-col items-center">
          <div className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-1.5">The Launch Offer</div>
          <h2 className={cn("font-display font-bold text-ink leading-tight mb-2", isRail ? "text-xl" : "text-2xl sm:text-3xl")}>Everything you need to<br />break into VLSI.</h2>
          <div className="flex items-center justify-center gap-3 mt-3">
            <span className={cn("font-mono font-bold text-ink leading-none", isRail ? "text-3xl" : "text-4xl")}>₹99</span>
            <span className="text-blue-500 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase max-w-[130px] text-left leading-snug">
              Fully redeemable on your first purchase
            </span>
          </div>
        </div>

        {/* The Split Card */}
        <div className={cn("w-full relative rounded-xl border border-line-strong overflow-hidden flex shadow-sm", isRail ? "flex-col" : "flex-col sm:flex-row")}>
          
          {/* Pre-book Side */}
          <div className="bg-blue-600 text-white p-5 flex-1 flex flex-col items-center justify-center text-center relative z-10">
            <div className="text-white/80 text-[10px] font-bold tracking-widest uppercase mb-2">Pre-book - ₹99</div>
            <div className={cn("font-bold font-display mb-0.5", isRail ? "text-lg" : "text-xl")}>200 lab hours</div>
            <div className="text-white/80 text-[11px] mb-3 font-medium">100 hrs + 100 free</div>
            
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-white/60 text-sm line-through font-mono">₹18,000</span>
              <span className="text-3xl font-mono font-bold">₹9,000</span>
            </div>
            
            <div className="bg-white text-blue-600 text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
              You Save ₹9,000
            </div>
          </div>

          {/* VS Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white border-2 border-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600 shadow-md">
            vs
          </div>

          {/* After Launch Side */}
          <div className="bg-void p-5 flex-1 flex flex-col items-center justify-center text-center relative z-10">
            <div className="text-ink-faint text-[10px] font-bold tracking-widest uppercase mb-2">After Launch</div>
            <div className={cn("font-bold font-display text-ink mb-4", isRail ? "text-base" : "text-lg")}>Pay-per-use rate</div>
            
            <div className="w-full max-w-[180px] flex flex-col gap-2.5 text-xs sm:text-sm font-mono text-ink-dim">
              <div className="flex justify-between border-b border-line pb-1.5">
                <span>100 hours</span>
                <span className="font-bold text-ink">₹9,000</span>
              </div>
              <div className="flex justify-between">
                <span>200 hours</span>
                <span className="font-bold text-ink">₹18,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explainer text */}
        <p className={cn("text-ink-dim text-center mt-4 leading-relaxed", isRail ? "text-[10px] max-w-sm" : "text-[11px] sm:text-xs max-w-2xl")}>
          Reserve today and lock the launch rate — <b>200 hours for the price of 100</b>. Once the 1,000 seats are gone, 100 hours cost ₹9,000 and 200 hours cost ₹18,000.
        </p>

        {/* Benefits Pills (Grid Layout) */}
        <div className={cn("w-full mt-5 grid gap-2", isRail ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 sm:gap-3")}>
          <BenefitPill text={<>Pre-book <b>₹99</b> unlocks <b>100 + 100 hours free</b></>} badge="Save ₹9k" />
          <BenefitPill text={<>Access to <b>Recruiter Placement Community</b></>} badge="Network" />
          <BenefitPill text={<>Lifetime access to premium <b>VLSI learning library</b></>} badge="Worth ₹1L" />
          <BenefitPill text={<>Unlock <b>AI-powered learning</b>, on us</>} badge="Free" />
        </div>

        {/* CTA */}
        <div className="w-full mt-6">
          <Button to={planHref('/register?plan=individual-launch')} arrow variant="primary" className="w-full h-12 text-base">
            Grab it for ₹99
          </Button>
          
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
