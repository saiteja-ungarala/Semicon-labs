import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The launch offer, as the single card on the Exclusive offers tab.
 *
 * It states what the offer *contains* and nothing else — the ₹99 pre-booking
 * fee, the plan prices and the pay-by date are all deliberately absent here.
 * The ₹99 flow still runs on the home page, the individuals page and the
 * domain pages via `LaunchOfferCard`; this tab is the offer itself.
 *
 * The CTA is a styled button with no destination — the integration point for
 * whoever wires up claiming a seat.
 */

export function ExclusiveOfferCard() {
  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-blue/60 bg-panel shadow-glow">
      {/* Scarcity ribbon. The seat count is the only urgency the card carries
          now that the pre-booking fee is gone from this tab. */}
      <div className="bg-blue-600 px-4 py-2.5 text-center">
        <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-white">
          🔥 Limited launch offer · only 1,000 seats
        </span>
      </div>

      <div className="relative p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(110% 70% at 50% -10%, rgba(46,30,224,0.12), transparent 60%)' }}
        />

        <div className="relative text-center">
          <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-blue-600">
            The launch offer
          </div>
          <h3 className="mx-auto mt-3 max-w-[16ch] text-balance font-display text-[30px] font-extrabold leading-[1.08] text-ink sm:text-[40px]">
            Everything you need to break into VLSI.
          </h3>
          <p className="mx-auto mt-4 max-w-[58ch] text-pretty text-[14px] leading-relaxed text-ink-dim sm:text-[15.5px]">
            Take one of the first 1,000 seats and the whole launch package comes with it —
            double the lab time, a library that stays yours for good, an AI tutor sitting in
            every lab, and recruiters watching what you build.
          </p>
        </div>

        <div className="relative mt-8 grid gap-4 sm:mt-9 sm:grid-cols-2">
          <Pillar
            loud
            tag="100 hrs free"
            title={<>200 lab hours</>}
            body="Double the lab time. Your first 100 hours come with another 100 on us — on the same industry-grade tools, not a simulator."
          />
          <Pillar
            tag="Network"
            title={<>Seen by recruiters</>}
            body="A place in the Recruiter Placement Community, where hiring teams come looking at the work you have actually shipped."
          />
          <Pillar
            tag="Worth ₹1L"
            title={<>Yours for life</>}
            body="Lifetime access to the premium VLSI learning library — every module, every update, long after your hours run out."
          />
          <Pillar
            tag="Included"
            title={<>An AI tutor in every lab</>}
            body="AI-powered learning unlocked from your first session, at no extra cost. Ask it why a design failed, not just whether it did."
          />
        </div>

        {/* Styled but going nowhere yet — the integration point for claiming a
            seat, for whoever wires up the backend. */}
        <div className="relative mx-auto mt-8 max-w-sm sm:mt-9">
          <Button variant="primary" arrow className="h-12 w-full text-base">
            Claim this offer
          </Button>
        </div>
      </div>
    </div>
  );
}

function Pillar({
  loud,
  tag,
  title,
  body,
}: {
  /** The headline benefit gets the filled treatment so the eye lands there first. */
  loud?: boolean;
  tag: string;
  title: ReactNode;
  body: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-5 transition-colors',
        loud ? 'bg-blue-600 text-white shadow-glow' : 'border border-blue/20 bg-blue-50 hover:border-blue/40',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            'font-display text-[19px] font-bold leading-tight sm:text-[21px]',
            loud ? 'text-white' : 'text-blue-600',
          )}
        >
          {title}
        </span>
        <span
          className={cn(
            'shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-wider shadow-sm',
            loud ? 'bg-white text-blue-600' : 'bg-blue text-white',
          )}
        >
          {tag}
        </span>
      </div>
      <p
        className={cn(
          'mt-2 text-[13px] leading-relaxed',
          loud ? 'text-white/85' : 'text-ink-dim',
        )}
      >
        {body}
      </p>
    </div>
  );
}
