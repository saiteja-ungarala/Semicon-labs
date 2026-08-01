import { useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Plan popups, opened from the pricing cards:
 *  - Individual → the ₹99 launch-offer card (pre-book vs pay-per-use).
 *  - Team       → Basic vs Pro feature matrix (client's 4.3 table; ✓-rows
 *                 first, upgrade-only rows after).
 */

export type ComparePlanId = 'individual' | 'team';

/* ------------------------------------------------ Team: Basic vs Pro table */

type Cell = boolean;

// Ordered ticks-first per client direction.
const TEAM_ROWS: { feature: string; basic: Cell; pro: Cell }[] = [
  { feature: 'Standard VM compute', basic: true, pro: true },
  { feature: 'Standard labs', basic: true, pro: true },
  { feature: 'Automated practical evaluation', basic: true, pro: true },
  { feature: 'Domain-specific certifications', basic: true, pro: true },
  { feature: 'Higher VM compute (bigger labs)', basic: false, pro: true },
  { feature: 'Complex / high-end designs', basic: false, pro: true },
  { feature: 'Tool switching (change EDA vendor)', basic: false, pro: true },
  { feature: 'Advanced / complex labs', basic: false, pro: true },
];

function Mark({ v }: { v: Cell }) {
  return v ? (
    <span
      aria-label="Included"
      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue text-[12px] font-bold text-white shadow-sm"
    >
      ✓
    </span>
  ) : (
    <span aria-label="Not included" className="font-mono text-base text-ink-faint">
      —
    </span>
  );
}

function TeamCompare() {
  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-line">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="bg-void px-5 py-4 font-semibold text-ink">Feature</th>
              <th className="w-[120px] bg-void px-3 py-4 text-center">
                <span className="block font-semibold text-ink">Basic</span>
                <span className="block font-mono text-[11px] font-bold text-ink-dim">90 / hr</span>
              </th>
              <th className="relative w-[120px] bg-blue-soft px-3 py-4 text-center">
                <span className="block font-semibold text-blue-600">Pro</span>
                <span className="block font-mono text-[11px] font-bold text-blue">100 / hr</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70">
            {TEAM_ROWS.map((row) => (
              <tr key={row.feature} className="transition-colors hover:bg-void/60">
                <td className="px-5 py-3.5 text-[13.5px] leading-snug text-ink">{row.feature}</td>
                <td className="px-3 py-3.5 text-center">
                  <Mark v={row.basic} />
                </td>
                <td className="bg-blue-soft/40 px-3 py-3.5 text-center">
                  <Mark v={row.pro} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 rounded-xl bg-void px-4 py-3 text-[13px] leading-relaxed text-ink-dim">
        Pro is about <b className="text-ink">more compute for bigger labs</b>, not different content
        tiers. Teams working on complex physical design, signoff flows, or large-block SoC work need Pro.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Button to="/register?plan=team-basic" variant="secondary" className="w-full">
          Choose Basic
        </Button>
        <Button to="/register?plan=team-pro" arrow className="w-full">
          Choose Pro
        </Button>
      </div>
    </>
  );
}

/* ------------------------------------------- Individual: ₹99 launch offer */

const OFFER_POINTS: { text: ReactNode; pill: string }[] = [
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

function IndividualOffer() {
  return (
    <>
      {/* Price line */}
      <div className="mt-1 flex items-baseline justify-center gap-3">
        <span className="font-mono text-6xl font-bold text-ink">₹99</span>
        <span className="max-w-[150px] text-left font-mono text-[10px] font-bold uppercase leading-snug tracking-wide text-blue">
          Fully redeemable on your first purchase
        </span>
      </div>

      {/* Pre-book vs after-launch */}
      <div className="mt-6 flex items-stretch overflow-hidden rounded-2xl border-[1.5px] border-blue">
        <div className="flex flex-1 flex-col items-center justify-center gap-0.5 bg-blue px-4 py-5 text-center text-white">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-white/85">Pre-book · ₹99</span>
          <span className="text-lg font-extrabold leading-tight">200 lab hours</span>
          <span className="text-[11px] text-white/80">100 hrs + 100 free</span>
          <span className="mt-1.5 font-mono text-sm font-bold text-white/70 line-through">₹18,000</span>
          <span className="font-mono text-[26px] font-extrabold leading-none">₹9,000</span>
          <span className="mt-1.5 rounded-full bg-white px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-wide text-blue">
            You save ₹9,000
          </span>
        </div>
        <div className="z-10 -mx-4 flex h-8 w-8 shrink-0 items-center justify-center self-center rounded-full border-[1.5px] border-blue bg-white font-mono text-[11px] font-extrabold text-blue">
          vs
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-blue-soft px-4 py-5 text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wide text-ink-dim">After launch</span>
          <span className="text-lg font-extrabold leading-tight text-ink">Pay-per-use rate</span>
          <ul className="mt-1.5 w-full max-w-[170px]">
            <li className="flex items-center justify-between gap-3 border-t border-blue/15 py-1.5 text-[12.5px]">
              <span className="text-ink-dim">100 hours</span>
              <b className="font-mono text-ink">₹9,000</b>
            </li>
            <li className="flex items-center justify-between gap-3 border-t border-blue/15 py-1.5 text-[12.5px]">
              <span className="text-ink-dim">200 hours</span>
              <b className="font-mono text-ink">₹18,000</b>
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-3 text-center text-[12px] leading-relaxed text-ink-dim">
        Reserve today and lock the launch rate — <b className="text-blue-600">200 hours for the price of 100</b>.
        Once the 1,000 seats are gone, 100 hours cost ₹9,000 and 200 hours cost ₹18,000.
      </p>

      {/* Benefits */}
      <ul className="mt-5 space-y-2.5">
        {OFFER_POINTS.map((p, i) => (
          <li
            key={i}
            className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-blue/15 bg-blue-soft/50 px-4 py-3"
          >
            <span aria-hidden className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue text-[10.5px] font-bold text-white">
              ✓
            </span>
            <span className="min-w-0 flex-1 text-[13px] leading-snug text-ink [&_b]:text-blue-600">{p.text}</span>
            <span className="shrink-0 rounded-full bg-blue px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-wide text-white">
              {p.pill}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button to="/register?plan=individual-launch" arrow size="lg" className="w-full">
          Grab it for ₹99
        </Button>
        <p className="mt-3 text-center text-[11.5px] text-ink-faint">
          Don't just take our word for it — for ₹99, log in, try the real platform, and experience it yourself.
        </p>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ shell */

export function PlanCompareModal({ plan, onClose }: { plan: ComparePlanId | null; onClose: () => void }) {
  useEffect(() => {
    if (!plan) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [plan, onClose]);

  const isTeam = plan === 'team';

  return (
    <AnimatePresence>
      {plan && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={isTeam ? 'Team plans — compare Basic and Pro' : 'Individual launch offer'}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'relative max-h-[92vh] w-full overflow-y-auto rounded-3xl bg-white shadow-card-hover',
              isTeam ? 'max-w-2xl' : 'max-w-lg',
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ribbon header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue to-sky px-6 py-2.5 text-center font-mono text-[10.5px] font-bold uppercase tracking-[0.08em] text-white">
              {isTeam ? 'Team plans · pick your tier' : '🔥 Limited launch offer · only 1,000 seats'}
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-12 z-10 grid h-9 w-9 place-items-center rounded-full bg-void-2 text-ink-dim transition hover:bg-line hover:text-ink"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            <div className="p-6 sm:p-8">
              <div className="text-center">
                <p className="eyebrow justify-center">{isTeam ? 'basic vs pro' : 'the launch offer'}</p>
                <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-ink">
                  {isTeam ? 'Compare Basic and Pro.' : 'Everything you need to break into VLSI.'}
                </h3>
              </div>

              <div className="mt-5">{isTeam ? <TeamCompare /> : <IndividualOffer />}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
