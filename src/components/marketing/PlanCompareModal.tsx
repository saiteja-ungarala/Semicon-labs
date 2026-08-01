import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

/**
 * "Compare Basic and Pro" popup — opened from the Individual / Team pricing
 * cards. Feature matrix + a choice of tier, in the site's design system.
 */

export type ComparePlanId = 'individual' | 'team';

interface TierInfo {
  price: string;
  note: string;
  to: string;
}

const PLANS: Record<ComparePlanId, { title: string; basic: TierInfo; pro: TierInfo }> = {
  individual: {
    title: 'Individual Plans',
    basic: { price: '₹11,000', note: '+ 18% GST', to: '/register?plan=individual-basic' },
    pro: { price: '₹12,500', note: '+ 18% GST', to: '/register?plan=individual-pro' },
  },
  team: {
    title: 'Team Plans',
    // NOTE: Team Basic mirrors the listed ₹9,000/session price; Pro is a
    // placeholder until business confirms team-tier pricing.
    basic: { price: '₹9,000', note: '+ 18% GST · per session', to: '/register?plan=team-basic' },
    pro: { price: '₹10,500', note: '+ 18% GST · per session', to: '/register?plan=team-pro' },
  },
};

type Cell = boolean | 'soon';

const ROWS: { feature: string; basic: Cell; pro: Cell }[] = [
  { feature: 'Duration (per month / pile up / prorated)', basic: true, pro: true },
  { feature: 'Multi-domain access', basic: true, pro: true },
  { feature: 'Tool switch within a domain (Basic: one active tool; Pro: can switch)', basic: false, pro: true },
  { feature: 'Loyalty programs', basic: false, pro: 'soon' },
  { feature: 'Data backup add-on (optional, from ₹500/month)', basic: true, pro: true },
  { feature: 'Advanced designs', basic: false, pro: 'soon' },
];

function CellMark({ v }: { v: Cell }) {
  if (v === 'soon') {
    return (
      <span className="inline-flex flex-col items-center leading-tight">
        <span aria-hidden className="text-ink-faint">—</span>
        <span className="font-mono text-[9.5px] uppercase tracking-wide text-ink-faint">Coming soon</span>
      </span>
    );
  }
  return v ? (
    <span
      aria-label="Included"
      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue text-[11px] font-bold text-white"
    >
      ✓
    </span>
  ) : (
    <span
      aria-label="Not included"
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-line-strong text-[10px] font-bold text-ink-faint"
    >
      ✕
    </span>
  );
}

export function PlanCompareModal({ plan, onClose }: { plan: ComparePlanId | null; onClose: () => void }) {
  // ESC to close + lock body scroll while open.
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

  const info = plan ? PLANS[plan] : null;

  return (
    <AnimatePresence>
      {plan && info && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${info.title} — compare Basic and Pro`}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-line bg-white p-6 shadow-card-hover sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">{info.title}</h3>
                <p className="mt-1 text-sm text-ink-dim">Compare Basic and Pro features</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-void-2 text-ink-dim transition hover:bg-line hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Feature matrix */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-line">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-void">
                    <th className="px-4 py-3 font-semibold text-ink">Feature</th>
                    <th className="w-[130px] px-3 py-3">
                      <span className="block font-semibold text-ink">Basic</span>
                      <span className="block font-mono text-[11px] font-bold text-blue">{info.basic.price}</span>
                      <span className="block font-mono text-[9.5px] uppercase text-ink-faint">{info.basic.note}</span>
                    </th>
                    <th className="w-[130px] px-3 py-3">
                      <span className="block font-semibold text-ink">Pro</span>
                      <span className="block font-mono text-[11px] font-bold text-blue">{info.pro.price}</span>
                      <span className="block font-mono text-[9.5px] uppercase text-ink-faint">{info.pro.note}</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/70">
                  {ROWS.map((row) => (
                    <tr key={row.feature} className="transition-colors hover:bg-blue-soft/30">
                      <td className="px-4 py-3 text-[13.5px] leading-snug text-ink-dim">{row.feature}</td>
                      <td className="px-3 py-3 text-center">
                        <CellMark v={row.basic} />
                      </td>
                      <td className="px-3 py-3 text-center">
                        <CellMark v={row.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button to={info.basic.to} variant="secondary" className="w-full">
                Choose Basic
              </Button>
              <Button to={info.pro.to} arrow className="w-full">
                Choose Pro
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
