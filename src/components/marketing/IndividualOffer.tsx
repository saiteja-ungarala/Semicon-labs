import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { PreBookDialog } from './PreBookDialog';
import { cn } from '@/lib/cn';

/**
 * The Individual pricing block, built to the client's layout: the ₹499 Launch
 * pad on the left, and on the right a launch-offer panel wrapping the Pro
 * and Elite plans.
 *
 * The offer ribbon straddles the top edge of the panel so the two plans read as
 * one offer rather than two separate cards, and the starter pack stretches to
 * the same height so both columns finish level.
 */

/** Shared by both plans — the offer applies whichever one is bought. */
const OFFER_BENEFITS = [
  <>
    <b>200 lab hours</b> for the price of 100
  </>,
  <>
    Access to <b>Recruiter Placement Community</b>
  </>,
  <>
    Lifetime access to premium <b>VLSI learning library</b>
  </>,
  <>
    Unlock <b>AI-powered learning</b>, on us
  </>,
];

const BASIC_FEATURES = [
  'Standard VM compute',
  'Domain-specific certifications',
  'Standard labs',
  'Automated practical evaluation',
  'Ticketing support',
  'Certification upon completing skills',
];

// Elite is written as a delta on Pro rather than a second full list — that is
// how the client specced it, and it keeps the two cards the same height.
const ELITE_FEATURES = [
  'Everything in Pro, plus:',
  'Higher VM compute (bigger labs)',
  'Complex / high-end designs',
  'Tool switching (change EDA vendor)',
  'Access to exclusive Pro content',
];

export function IndividualOffer() {
  return (
    <div className="mx-auto mt-12 grid max-w-6xl items-stretch gap-6 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] lg:gap-8">
      <StarterPackCard />

      <div className="relative rounded-3xl border border-blue/20 bg-blue-50 px-4 pb-6 pt-11 sm:px-6 sm:pt-12">
        {/* Straddles the panel edge so it reads as a band over both plans. */}
        <div className="absolute left-1/2 top-0 w-[min(94%,560px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-r from-[#241C7A] via-blue to-[#4436F0] px-5 py-3 text-center shadow-glow">
          <span className="block font-display text-[13.5px] font-bold leading-tight text-white sm:text-[15.5px]">
            You asked, we extended! Our 100 hours +100 Free Lab Hours Offer is now extended till September 30.
          </span>
        </div>

        <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
          {OFFER_BENEFITS.map((b, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <Tick />
              <span className="text-[12.5px] leading-snug text-ink [&_b]:font-semibold [&_b]:text-blue-600 sm:text-[13px]">
                {b}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {/* Renamed at the client's direction: the ₹90 tier is "Pro" and the
              ₹100 tier "Elite". Prices, rates and features are unchanged. */}
          <PlanCard name="Pro" rate="₹90" features={BASIC_FEATURES} was="₹18,000" now="₹9,000" />
          <PlanCard elite name="Elite" rate="₹100" features={ELITE_FEATURES} was="₹20,000" now="₹10,000" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ pieces */

function Tick({ onDark }: { onDark?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
        onDark ? 'bg-white/20 text-white' : 'bg-blue text-white',
      )}
    >
      ✓
    </span>
  );
}

/**
 * The ₹499 VLSI Launch pad. This is the offer card for the whole site now — the
 * home pricing popup, the individuals page and the domain pages all show it
 * where the ₹99 pre-book card used to be.
 *
 * Buy Now opens the capture form rather than jumping straight to register,
 * so the lead is caught before the handoff.
 */
export function StarterPackCard() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[440px] flex-col overflow-hidden rounded-3xl border border-blue/40 bg-gradient-to-b from-[#241C7A] via-[#161046] to-[#0B0E24] text-white shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 60% at 50% -12%, rgba(255,255,255,0.16), transparent 58%)' }}
      />
      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
          Start here
        </span>
        <h4 className="mt-1.5 text-balance font-display text-[22px] font-bold leading-tight sm:text-[24px]">
          VLSI Launch pad
        </h4>

        <ul className="mt-5 space-y-3">
          <StarterLine
            title="10 VLSI Lab Hours — 1 Month Validity"
            detail="Practice, explore & gain hands-on experience"
          />
          <StarterLine
            title="Free Premium VLSI Content — Lifetime Validity"
            detail="Covered from Basics to Advanced Core Topics, with Self-Assessment"
          />
          <StarterLine
            title="Industry EDA Tools"
            detail="Access Cadence / Synopsys / Siemens tools"
          />
          <StarterLine
            title="Free 1-Week Lab Data Backup"
            detail="Your work stays backed up for 7 days after lab expiry"
          />
        </ul>

        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-[38px] font-bold leading-none">₹499</span>
            <span className="font-mono text-[12px] text-white/60">excl. GST</span>
          </div>
          <Button
            onClick={() => setFormOpen(true)}
            variant="primary"
            arrow
            className="mt-5 h-12 w-full bg-white text-base text-blue-600 hover:bg-white/90"
          >
            Buy Now
          </Button>
          <PreBookDialog open={formOpen} onClose={() => setFormOpen(false)} variant="starter" />
        </div>
      </div>
    </div>
  );
}

/** A claim over a lighter detail line, matching the plan cards beside it. */
function StarterLine({ title, detail }: { title: string; detail?: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <Tick onDark />
      <span className="text-[13px] leading-snug">
        <b className="block font-semibold text-white">{title}</b>
        {detail && <span className="mt-0.5 block text-white/60">{detail}</span>}
      </span>
    </li>
  );
}

function PlanCard({
  elite,
  name,
  rate,
  features,
  was,
  now,
}: {
  elite?: boolean;
  name: string;
  rate: string;
  features: string[];
  was: string;
  now: string;
}) {
  // Buy Now opens the capture form headed with this plan's own name, rate
  // and offer price; the ₹99 redemption note rides inside it.
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-blue/40 bg-gradient-to-b from-[#241C7A] via-[#161046] to-[#0B0E24] text-white shadow-glow transition-all duration-300 hover:-translate-y-1">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(120% 60% at 50% -12%, rgba(255,255,255,0.16), transparent 58%)' }}
      />
      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[13px] font-semibold text-white/70">
            {rate}
            <span className="text-white/45">/hour</span>
          </span>
          <span className="font-display text-[22px] font-bold italic sm:text-[24px]">{name}</span>
        </div>

        <ul className="mt-5 flex-1 space-y-2.5">
          {features.map((f, i) => (
            <li
              key={f}
              className={cn(
                'flex items-start gap-2.5 text-[12.5px] leading-snug',
                // The "everything in Pro" lead-in is a heading for the rest,
                // not a feature of its own.
                elite && i === 0 ? 'font-semibold text-white' : 'text-white/80',
              )}
            >
              <Tick onDark />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wider text-white">
              50% off
            </span>
            <span className="font-mono text-[13px] text-white/45 line-through">{was}</span>
          </div>
          <div className="mt-1 font-mono text-[34px] font-bold leading-none">{now}</div>
          <div className="mt-1.5 text-[11.5px] text-white/60">100 hours + 100 free hours · excl. GST</div>
          <Button
            onClick={() => setFormOpen(true)}
            variant="primary"
            arrow
            className="mt-4 h-11 w-full bg-white text-[15px] text-blue-600 hover:bg-white/90"
          >
            Buy Now
          </Button>
          <PreBookDialog open={formOpen} onClose={() => setFormOpen(false)} variant={elite ? 'elite' : 'pro'} />
        </div>
      </div>
    </div>
  );
}
