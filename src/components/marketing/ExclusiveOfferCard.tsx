import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { PreBookDialog } from './PreBookDialog';
import { cn } from '@/lib/cn';

/**
 * The ₹99 launch offer rebuilt as a peer of the Basic/Pro plan cards on the
 * Exclusive offers tab.
 *
 * It deliberately borrows TierCard's rhythm — name + badge, a tag line, a
 * graphic/label pair, the price, a rule, a ✓ list, then a full-width CTA at the
 * bottom — so the three cards read as one row. What marks it as the offer
 * rather than a plan is the scarcity ribbon, the heavier brand border and the
 * glow, not a different layout.
 *
 * `LaunchOfferCard` still owns the wide standalone version used on the home
 * modal, the audience pages and the domain pages; that one is untouched.
 */

export function ExclusiveOfferCard() {
  const [payOpen, setPayOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full max-w-[460px] flex-col overflow-hidden rounded-3xl border border-blue/60 bg-panel shadow-glow transition-all duration-300 hover:-translate-y-1 hover:border-blue">
      {/* Scarcity ribbon — the one piece of chrome the plan cards do not have. */}
      <div className="bg-blue-600 px-4 py-2 text-center">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-white">
          🔥 Limited launch offer · only 1,000 seats
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(120% 60% at 50% -12%, rgba(46,30,224,0.10), transparent 55%)' }}
        />

        {/* Name + badge — same row shape as a plan card. */}
        <div className="relative flex items-center justify-between gap-3">
          <span className="font-display text-[21px] font-bold text-blue-600">Launch offer</span>
          <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Save up to ₹10,000
          </span>
        </div>
        <p className="relative mt-0.5 text-[13px] text-ink-dim">
          Everything you need to break into VLSI.
        </p>

        {/* Sits where the plan cards put their power dial, and does the same
            job: a graphic with a label pair. Both pre-book options unlock the
            same 200 hours, so it states that once instead of twice. */}
        <div className="relative my-4 flex items-center gap-3.5">
          <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-blue text-white shadow-glow">
            <span className="font-mono text-[16px] font-bold leading-none">200</span>
            <span className="mt-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-white/75">
              hours
            </span>
          </span>
          <div className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
            Lab hours unlocked
            <b className="mt-0.5 block font-display text-[13.5px] normal-case tracking-normal text-blue-600">
              100 paid + 100 free
            </b>
          </div>
        </div>

        {/* Price block — same slot the plans use for ₹9,000 / ₹10,000. */}
        <div className="relative flex items-baseline gap-2.5">
          <span className="font-mono text-[32px] font-bold text-blue-600">₹99</span>
          <span className="font-mono text-sm text-ink-faint">to reserve</span>
        </div>
        <p className="relative mb-3 text-[12.5px] text-ink-dim">
          pre-booking fee · fully redeemable
        </p>

        {/* The client's wording, kept verbatim — buyers were reading the ₹99 as
            "₹99 buys 200 lab hours", so this has to stay in full. */}
        <p className="relative rounded-xl border border-blue/15 bg-blue-50 p-3 text-[11px] leading-relaxed text-ink-dim">
          <b className="text-blue-600">₹99</b> is only a pre-booking fee to reserve your spot for the
          Launch Offer—it does not include any Lab Hours. By{' '}
          <b className="text-ink">15th September</b>, pay <b className="text-ink">₹9,000 + GST</b> for
          100 Lab Hours and get <b className="text-blue-600">100 additional Lab Hours FREE</b>. Your
          ₹99 pre-booking fee will be fully redeemable against this first purchase.
        </p>

        {/* Which plan the ₹99 holds — the two prices, side by side. */}
        <div className="relative mt-2.5 grid grid-cols-2 gap-2.5">
          <PreBookOption solid tier="Basic" was="₹18,000" now="₹9,000" save="Save ₹9,000" />
          <PreBookOption tier="Pro" was="₹20,000" now="₹10,000" save="Save ₹10,000" />
        </div>

        {/* Benefits, in the plan cards' ✓ list style so the row scans as one. */}
        <ul className="relative mb-6 mt-4 flex-1 space-y-2 border-t border-blue/20 pt-4">
          <OfferFeat badge="Save ₹9k">
            Pre-book <b>₹99</b> unlocks <b>100 + 100 hours free</b>
          </OfferFeat>
          <OfferFeat badge="Network">
            Access to <b>Recruiter Placement Community</b>
          </OfferFeat>
          <OfferFeat badge="Worth ₹1L">
            Lifetime access to premium <b>VLSI learning library</b>
          </OfferFeat>
          <OfferFeat badge="Free">
            Unlock <b>AI-powered learning</b>, on us
          </OfferFeat>
        </ul>

        <Button onClick={() => setPayOpen(true)} arrow variant="primary" className="relative w-full">
          Grab it for ₹99
        </Button>
        <PreBookDialog open={payOpen} onClose={() => setPayOpen(false)} />
      </div>
    </div>
  );
}

function PreBookOption({
  solid,
  tier,
  was,
  now,
  save,
}: {
  solid?: boolean;
  tier: string;
  was: string;
  now: string;
  save: string;
}) {
  return (
    <div
      className={cn(
        'rounded-xl p-2.5 text-center',
        solid ? 'bg-blue-600 text-white' : 'border border-blue/25 bg-void',
      )}
    >
      <div
        className={cn(
          'font-mono text-[9px] font-bold uppercase tracking-[0.12em]',
          solid ? 'text-white/75' : 'text-blue-600',
        )}
      >
        Pre-book {tier}
      </div>
      <div className="mt-1.5 flex items-baseline justify-center gap-1.5">
        <span
          className={cn('font-mono line-through', solid ? 'text-white/55' : 'text-ink-faint', 'text-[11px]')}
        >
          {was}
        </span>
        <span className={cn('font-mono font-bold', solid ? 'text-white' : 'text-ink', 'text-lg')}>
          {now}
        </span>
      </div>
      <div
        className={cn(
          'mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-wider',
          solid ? 'bg-white text-blue-600' : 'bg-blue-600 text-white',
        )}
      >
        {save}
      </div>
    </div>
  );
}

function OfferFeat({ children, badge }: { children: ReactNode; badge: string }) {
  return (
    <li className="flex items-start gap-2.5 text-ink">
      <span
        aria-hidden
        className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-blue font-bold text-white text-[10.5px]"
      >
        ✓
      </span>
      {/* Size before leading: twMerge drops an earlier leading-* once a
          font size follows it. */}
      <span className="flex-1 text-[13px] leading-snug [&_b]:font-semibold [&_b]:text-blue-600">
        {children}
      </span>
      <span className="mt-px shrink-0 rounded-full bg-blue-50 px-2 py-0.5 font-mono font-bold uppercase tracking-wider text-blue text-[8.5px]">
        {badge}
      </span>
    </li>
  );
}
