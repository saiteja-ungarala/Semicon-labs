import { useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { LaunchOfferCard } from './LaunchOfferCard';
import { usePlanHref } from '@/lib/checkoutPath';
import { cn } from '@/lib/cn';

/**
 * The client's pricing model (semiconlabs-pricing-white.html), rebuilt in the
 * site's design system.
 *
 * WARNING: that reference file predates the Aug-2026 copy pass. It still holds
 * the 92-95%-vs-in-house claim, the performance-loyalty-rewards bullet and the
 * per-license/contract-terms/loyalty-pool sentence — all three of which the
 * client had removed. Do not copy them back when syncing with it.
 *
 * Layout: Individual / Teams / Corporate tabs, Basic vs Pro tiers ("same labs,
 * more power on Pro"), top-up packs and volume discounts.
 */

type TabId = 'individual' | 'teams' | 'corporate';

const TABS: { id: TabId; label: string }[] = [
  { id: 'individual', label: 'Individual' },
  { id: 'teams', label: 'Teams' },
  { id: 'corporate', label: 'Corporate' },
];

/* ---------------------------------------------------------------- pieces */

function Banner({ left, right }: { left: ReactNode; right?: string }) {
  return (
    <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border-[1.5px] border-dashed border-blue/40 px-6 py-4">
      <div className="text-[14px] text-ink">{left}</div>
      {right && (
        <div className="rounded-full bg-void-2 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-dim">
          {right}
        </div>
      )}
    </div>
  );
}

/** The little "power level" dial from the client's design. */
function PowerDial({ boosted }: { boosted?: boolean }) {
  return (
    <div className="flex items-center gap-3.5">
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
        <path d="M4 36 A28 28 0 0 1 60 36" fill="none" stroke="#E6E7F4" strokeWidth="7" strokeLinecap="round" />
        <path
          d="M4 36 A28 28 0 0 1 60 36"
          fill="none"
          stroke={boosted ? '#2E1EE0' : '#8A90B0'}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="88"
          strokeDashoffset={boosted ? 9 : 53}
        />
      </svg>
      <div className="font-mono text-[10.5px] uppercase tracking-wide text-ink-faint">
        Power level
        <b className={cn('mt-0.5 block font-display text-[13.5px] normal-case tracking-normal', boosted ? 'text-blue-600' : 'text-ink')}>
          {boosted ? 'Boosted' : 'Standard'}
        </b>
      </div>
    </div>
  );
}

function Feat({ yes, children }: { yes: boolean; children: ReactNode }) {
  return (
    <li className={cn('flex items-start gap-2.5 text-[13.5px] leading-snug', yes ? 'text-ink' : 'text-ink-faint')}>
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold',
          yes ? 'bg-blue-soft text-blue' : 'bg-line text-ink-faint',
        )}
      >
        {yes ? '✓' : '–'}
      </span>
      {children}
    </li>
  );
}

interface TierCardProps {
  pro?: boolean;
  name: string;
  tag: string;
  badge?: string;
  priceWas?: string;
  price: string;
  priceSub: string;
  feats: { yes: boolean; text: ReactNode }[];
  /** Omit `to` for a button that is styled and visible but goes nowhere yet. */
  cta: { label: string; to?: string };
}

function TierCard({ pro, name, tag, badge, priceWas, price, priceSub, feats, cta }: TierCardProps) {
  const planHref = usePlanHref();
  const href = cta.to ? (cta.to.startsWith('/register') ? planHref(cta.to) : cta.to) : undefined;
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl bg-panel p-7 transition-all duration-300 hover:-translate-y-1',
        pro
          ? 'gradient-border border border-transparent shadow-glow hover:shadow-card-hover'
          : 'border border-line shadow-card hover:border-blue/40 hover:shadow-card-hover',
      )}
    >
      {/* Featured tier gets the same soft radial crown as the offer cards */}
      {pro && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(120% 60% at 50% -12%, rgba(46,30,224,0.10), transparent 55%)' }}
        />
      )}
      <div className="relative flex items-center justify-between">
        <span className={cn('font-display text-[21px] font-bold', pro ? 'text-blue-600' : 'text-ink')}>{name}</span>
        {badge && (
          <span className="rounded-full bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            {badge}
          </span>
        )}
      </div>
      <p className="relative mt-0.5 text-[13px] text-ink-dim">{tag}</p>

      <div className="relative my-5">
        <PowerDial boosted={pro} />
      </div>

      <div className="relative flex items-baseline gap-2.5">
        {priceWas && <span className="font-mono text-sm text-ink-faint line-through">{priceWas}</span>}
        <span className={cn('font-mono text-[32px] font-bold', pro ? 'text-blue-600' : 'text-ink')}>{price}</span>
      </div>
      <p className="relative mb-6 text-[12.5px] text-ink-dim">{priceSub}</p>

      <ul className="relative mb-7 flex-1 space-y-2.5 border-t border-line pt-5">
        {feats.map((f, i) => (
          <Feat key={i} yes={f.yes}>
            {f.text}
          </Feat>
        ))}
      </ul>

      {/* With no destination this is a plain <button> that does nothing — the
          integration point for whoever wires up purchasing. */}
      {href ? (
        <Button to={href} variant={pro ? 'primary' : 'secondary'} arrow={pro} className="relative w-full">
          {cta.label}
        </Button>
      ) : (
        <Button variant={pro ? 'primary' : 'secondary'} arrow={pro} className="relative w-full">
          {cta.label}
        </Button>
      )}
    </div>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-14 mb-4 flex max-w-3xl items-center gap-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-faint">
      {children}
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

function SpecTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mx-auto max-w-3xl overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2 text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="px-4 pb-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-faint">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} className="group">
              {cells.map((c, j) => (
                <td
                  key={j}
                  className={cn(
                    'border-y border-line bg-void px-4 py-3.5 text-[13.5px] text-ink transition-colors group-hover:bg-blue-soft/40',
                    j === 0 && 'rounded-l-xl border-l',
                    j === cells.length - 1 && 'rounded-r-xl border-r',
                  )}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Basic vs Pro capabilities from the client's sheet. Shared rows first so the
 *  ticks read as a block and the three Pro-only rows land together at the end. */
const TEAM_CAPABILITIES: { cap: string; basic: boolean; pro: boolean }[] = [
  { cap: 'Standard VM compute', basic: true, pro: true },
  { cap: 'Domain-specific certifications', basic: true, pro: true },
  { cap: 'Standard labs', basic: true, pro: true },
  { cap: 'Dedicated Admin and Manager accounts', basic: true, pro: true },
  { cap: 'Automated practical evaluation', basic: true, pro: true },
  { cap: 'Ticketing support', basic: true, pro: true },
  { cap: 'Team users tracking', basic: true, pro: true },
  { cap: 'Certification upon completing skills', basic: true, pro: true },
  { cap: 'Higher VM compute (bigger labs)', basic: false, pro: true },
  { cap: 'Complex / high-end designs', basic: false, pro: true },
  { cap: 'Tool switching (change EDA vendor)', basic: false, pro: true },
];

const Hl = ({ children }: { children: ReactNode }) => (
  <span className="font-mono font-bold text-blue">{children}</span>
);
const Num = ({ children }: { children: ReactNode }) => <span className="font-mono">{children}</span>;

function Note({ children }: { children: ReactNode }) {
  return <p className="mx-auto mt-4 max-w-3xl text-center text-[12px] text-ink-faint">{children}</p>;
}

/* ---------------------------------------------------------------- panels */

function IndividualPanel() {
  return (
    <>
      <Banner
        left={<><b className="text-blue-600">🔥 Limited launch offer</b> — pre-book today, pay the launch rate later.</>}
        right="Only for First 1000 seats"
      />
      {/* Individuals: a single pre-book card — no separate Basic/Pro split. */}
      <div className="mx-auto mt-8 max-w-lg">
        <LaunchOfferCard variant="full" />
      </div>
    </>
  );
}

function TeamsPanel() {
  return (
    <>
      <Banner
        left={<><b className="text-blue-600">1 session</b> = 1 user seat × 1 month × 240 lab hours. Minimum 2 sessions.</>}
        right="Max 30% discount"
      />
      <div className="mx-auto mt-8 grid max-w-3xl items-start gap-5 md:grid-cols-2">
        <TierCard
          name="Basic"
          tag="Standard compute · per session"
          price="₹12,000"
          priceSub="per session · excl. GST · ₹14,160 incl."
          feats={TEAM_CAPABILITIES.map((c) => ({ yes: c.basic, text: <>{c.cap}</> }))}
          cta={{ label: 'Start a Basic team' }}
        />
        <TierCard
          pro
          name="Pro"
          tag="Bigger computing · bigger design"
          badge="Most Popular"
          price="₹13,500"
          priceSub="per session · excl. GST · ₹15,930 incl."
          feats={TEAM_CAPABILITIES.map((c) => ({ yes: c.pro, text: <>{c.cap}</> }))}
          cta={{ label: 'Start a Pro team' }}
        />
      </div>

      <SubHead>Basic · ₹12,000 per session</SubHead>
      <SpecTable
        head={['Sessions (240 hrs)', 'Discount', 'Price excl. GST', 'Price incl. 18% GST']}
        rows={[
          [<Num>1 · base rate</Num>, <Num>0%</Num>, <Hl>₹12,000</Hl>],
          [<Num>2</Num>, <Num>0%</Num>, <Hl>₹24,000</Hl>, <Num>₹28,320</Num>],
          [<Num>3</Num>, <Num>10%</Num>, <Hl>₹32,400</Hl>, <Num>₹38,232</Num>],
          [<Num>4</Num>, <Num>20%</Num>, <Hl>₹38,400</Hl>, <Num>₹45,312</Num>],
          [<Num>5</Num>, <Num>30%</Num>, <Hl>₹42,000</Hl>, <Num>₹49,560</Num>],
        ]}
      />

      <SubHead>Pro · ₹13,500 per session</SubHead>
      <SpecTable
        head={['Sessions (240 hrs)', 'Discount', 'Price excl. GST', 'Price incl. 18% GST']}
        rows={[
          [<Num>1 · base rate</Num>, <Num>0%</Num>, <Hl>₹13,500</Hl>, ],
          [<Num>2</Num>, <Num>0%</Num>, <Hl>₹27,500</Hl>, <Num>₹32,450</Num>],
          [<Num>3</Num>, <Num>10%</Num>, <Hl>₹36,450</Hl>, <Num>₹43,011</Num>],
          [<Num>4</Num>, <Num>20%</Num>, <Hl>₹43,200</Hl>, <Num>₹50,976</Num>],
          [<Num>5</Num>, <Num>30%</Num>, <Hl>₹47,250</Hl>, <Num>₹55,755</Num>],
        ]}
      />

      <Note>
        Prices shown are the total for the number of sessions. Maximum discount 30%. GST charged at
        18%.
      </Note>
    </>
  );
}

function CorporatePanel() {
  return (
    <>
      <div className="relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl border border-line bg-panel px-8 py-11 text-center shadow-card">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(120% 70% at 50% -15%, rgba(46,30,224,0.08), transparent 55%)' }}
        />
        <h3 className="font-display text-[26px] font-bold text-ink">Priced for your headcount, not a price list.</h3>
        <p className="mx-auto mt-3 max-w-md text-[14.5px] text-ink-dim">
          Corporate plans run on license volume and contract length — a quick chat with sales gets you a
          sharper number than any page can.
        </p>
        {/* /contact is now the same enquiry form, so send them straight there. */}
        <Button to="/contact" arrow className="mt-6">
          Talk to Sales
        </Button>
        <div className="mt-8 flex flex-wrap justify-center gap-x-11 gap-y-5">
          {[
            ['10', 'min. licenses'],
            ['40%', 'max. volume discount'],
          ].map(([v, l]) => (
            <div key={l}>
              <b className="block font-display text-[25px] font-bold text-blue">{v}</b>
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">{l}</span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

/* ------------------------------------------------------------------ main */

export function PricingTabs() {
  // ?plan=teams / ?plan=corporate opens that tab directly, so links from the
  // audience pages land on the prices they were promised rather than
  // Individual. Unknown or missing values fall back to Individual.
  const [params] = useSearchParams();
  const requested = params.get('plan');
  const initial = TABS.some((t) => t.id === requested) ? (requested as TabId) : 'individual';
  const [tab, setTab] = useState<TabId>(initial);

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Pricing audience">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full border-[1.5px] px-6 py-2.5 font-display text-[14.5px] font-semibold transition-all duration-200',
              tab === t.id
                ? 'border-blue bg-blue text-white shadow-glow'
                : 'border-line text-ink-dim hover:border-blue/50 hover:text-ink',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {tab === 'individual' && <IndividualPanel />}
          {tab === 'teams' && <TeamsPanel />}
          {tab === 'corporate' && <CorporatePanel />}
        </motion.div>
      </AnimatePresence>

      {/* Sits below the tabs because it applies to the self-serve plans, but not
          to Corporate — those run on a contract, so the ₹500/month backup
          add-on does not apply and the client asked for it to be hidden there. */}
      {tab !== 'corporate' && (
        <p className="mx-auto mt-10 max-w-3xl border-t border-line pt-6 text-center text-[13px] leading-relaxed text-ink-dim">
          After the subscription validity, your project data will be available for 2 weeks. To keep
          it beyond the retention period, subscribe to{' '}
          <b className="font-semibold text-ink">Data Backup for ₹500/month</b>.
        </p>
      )}
    </div>
  );
}
