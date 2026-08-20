import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The launch offer, as the single card on the Exclusive offers tab.
 *
 * Same shape as the original launch card — scarcity ribbon, eyebrow, headline,
 * a split two-panel price block, the benefit pills, one full-width CTA — with
 * the ₹99 pre-booking fee and the "pre-book vs after launch" comparison taken
 * out. In their place the two panels carry the Individual plan prices at the
 * offer rate, so the card states the offer itself: pay for 100 lab hours on
 * either plan and get 200.
 *
 * The ₹99 flow still runs on the home page, the individuals page and the
 * domain pages via `LaunchOfferCard`; it is only absent from this tab.
 *
 * The CTA is styled but has no destination — the integration point for
 * whoever wires up claiming a seat.
 */

export function ExclusiveOfferCard() {
  return (
    <div className="relative mx-auto flex w-full max-w-[820px] flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-card">
      {/* Top banner */}
      <div className="bg-blue-600 px-4 py-2.5 text-center">
        <span className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white sm:text-xs">
          🔥 Limited Launch Offer – Only 1,000 Seats
        </span>
      </div>

      <div className="relative flex flex-col items-center p-6 sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(110% 70% at 50% -10%, rgba(46,30,224,0.10), transparent 60%)' }}
        />

        <div className="relative mb-1 text-[10px] font-bold uppercase tracking-widest text-blue-500">
          The Launch Offer
        </div>

        {/* The offer itself is the headline now that the fee is gone. */}
        <h3 className="relative mx-auto max-w-[20ch] text-balance text-center font-display text-[28px] font-extrabold leading-[1.08] text-ink sm:text-[38px]">
          Buy 100 Lab Hours &amp; Get 100 Hours <span className="text-blue-600">FREE.</span>
        </h3>
        <p className="relative mt-3 text-center text-[14px] text-ink-dim sm:text-[15.5px]">
          Everything you need to break into VLSI.
        </p>

        {/* The split panel from the original card, with the two Individual
            plans in it instead of a pre-book / after-launch comparison. */}
        <div className="relative mt-6 flex w-full flex-col overflow-hidden rounded-xl border border-line-strong shadow-sm sm:flex-row">
          <OfferPlan solid name="Basic" was="₹18,000" now="₹9,000" save="You Save ₹9,000" />
          <OfferPlan name="Pro" was="₹20,000" now="₹10,000" save="You Save ₹10,000" />
        </div>
        <p className="relative mt-2.5 text-center text-[11.5px] text-ink-faint">
          Prices exclude GST · Basic ₹90/hr · Pro ₹100/hr · same 200 lab hours on either plan
        </p>

        {/* Benefits */}
        <div className="relative mt-5 grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <BenefitPill text={<><b>200 lab hours</b> for the price of 100</>} badge="100 hrs free" />
          <BenefitPill text={<>Access to <b>Recruiter Placement Community</b></>} badge="Network" />
          <BenefitPill text={<>Lifetime access to premium <b>VLSI learning library</b></>} badge="Worth ₹1L" />
          <BenefitPill text={<>Unlock <b>AI-powered learning</b>, on us</>} badge="Free" />
        </div>

        {/* CTA */}
        <div className="relative mt-6 w-full">
          <Button variant="primary" arrow className="h-12 w-full text-base">
            Claim this offer
          </Button>
        </div>
      </div>
    </div>
  );
}

function OfferPlan({
  solid,
  name,
  was,
  now,
  save,
}: {
  /** Basic takes the filled panel, mirroring the original split card. */
  solid?: boolean;
  name: string;
  was: string;
  now: string;
  save: string;
}) {
  return (
    <div
      className={cn(
        'relative z-10 flex flex-1 flex-col items-center justify-center p-5 text-center',
        solid ? 'bg-blue-600 text-white' : 'bg-void',
      )}
    >
      <div
        className={cn(
          'mb-2 text-[10px] font-bold uppercase tracking-widest',
          solid ? 'text-white/80' : 'text-blue-600',
        )}
      >
        {name}
      </div>
      <div className={cn('mb-0.5 font-display text-xl font-bold', solid ? 'text-white' : 'text-ink')}>
        200 lab hours
      </div>
      <div className={cn('mb-3 text-[11px] font-medium', solid ? 'text-white/80' : 'text-ink-dim')}>
        100 hrs + 100 free
      </div>

      <div className="mb-3 flex items-center justify-center gap-2">
        <span className={cn('font-mono text-sm line-through', solid ? 'text-white/60' : 'text-ink-faint')}>
          {was}
        </span>
        <span className={cn('font-mono text-3xl font-bold', solid ? 'text-white' : 'text-ink')}>
          {now}
        </span>
      </div>

      <div
        className={cn(
          'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider shadow-sm',
          solid ? 'bg-white text-blue-600' : 'bg-blue-600 text-white',
        )}
      >
        {save}
      </div>
    </div>
  );
}

function BenefitPill({ text, badge }: { text: ReactNode; badge: string }) {
  return (
    <div className="flex flex-row items-center justify-between gap-2 rounded-lg border border-blue-100/50 bg-blue-50/50 p-2 sm:gap-3 sm:p-2.5">
      <div className="flex items-center gap-2">
        <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[8px] font-bold text-white shadow-sm">
          ✓
        </div>
        <span className="text-[11px] leading-snug text-ink [&_b]:font-semibold [&_b]:text-blue-600 sm:text-[12px]">
          {text}
        </span>
      </div>
      <div className="inline-flex shrink-0 items-center justify-center rounded-full bg-blue-600 px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider text-white">
        {badge}
      </div>
    </div>
  );
}
