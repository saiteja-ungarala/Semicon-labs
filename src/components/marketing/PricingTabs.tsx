import { useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ExclusiveOfferCard } from './ExclusiveOfferCard';
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

type TabId = 'exclusive' | 'individual' | 'teams' | 'corporate';

const TABS: { id: TabId; label: string }[] = [
  { id: 'exclusive', label: 'Exclusive offers' },
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
function PowerDial({ boosted, onDark }: { boosted?: boolean; onDark?: boolean }) {
  return (
    <div className="flex items-center gap-3.5">
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
        <path
          d="M4 36 A28 28 0 0 1 60 36"
          fill="none"
          stroke={onDark ? 'rgba(255,255,255,0.18)' : '#E6E7F4'}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M4 36 A28 28 0 0 1 60 36"
          fill="none"
          stroke={onDark ? '#A79BFF' : boosted ? '#2E1EE0' : '#2E1EE0'}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="88"
          strokeDashoffset={boosted ? 9 : 53}
        />
      </svg>
      <div className={cn('font-mono text-[10.5px] uppercase tracking-wide', onDark ? 'text-white/55' : 'text-ink-faint')}>
        Power level
        <b
          className={cn(
            'mt-0.5 block font-display text-[13.5px] normal-case tracking-normal',
            onDark ? 'text-white' : 'text-blue-600',
          )}
        >
          {boosted ? 'Boosted' : 'Standard'}
        </b>
      </div>
    </div>
  );
}

function Feat({ yes, children, onDark }: { yes: boolean; children: ReactNode; onDark?: boolean }) {
  return (
    <li
      className={cn(
        'flex items-start gap-2.5 text-[13.5px] leading-snug',
        onDark ? (yes ? 'text-white' : 'text-white/40') : yes ? 'text-ink' : 'text-ink-faint',
      )}
    >
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold',
          onDark
            ? yes
              ? 'bg-white/20 text-white'
              : 'bg-white/10 text-white/40'
            : yes
              ? 'bg-blue text-white'
              : 'bg-blue/10 text-blue/40',
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
    // Both tiers are "lit": Basic is a blue-tinted card, Pro a deep gradient.
    // The client's note was that Basic looked greyed out beside Pro — the
    // ✓/– marks inside stay, since they are what says what Basic includes.
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1',
        pro
          ? 'border border-blue/40 bg-gradient-to-b from-[#241C7A] via-[#161046] to-[#0B0E24] text-white shadow-glow hover:shadow-card-hover'
          : 'border border-blue/30 bg-blue-50 shadow-card hover:border-blue/60 hover:shadow-card-hover',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: pro
            ? 'radial-gradient(120% 60% at 50% -12%, rgba(255,255,255,0.16), transparent 58%)'
            : 'radial-gradient(120% 60% at 50% -12%, rgba(46,30,224,0.10), transparent 55%)',
        }}
      />
      <div className="relative flex items-center justify-between">
        <span className={cn('font-display text-[21px] font-bold', pro ? 'text-white' : 'text-blue-600')}>{name}</span>
        {badge && (
          <span
            className={cn(
              'rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide shadow-sm',
              pro ? 'bg-white text-blue-600' : 'bg-blue text-white',
            )}
          >
            {badge}
          </span>
        )}
      </div>
      <p className={cn('relative mt-0.5 text-[13px]', pro ? 'text-white/70' : 'text-ink-dim')}>{tag}</p>

      <div className="relative my-5">
        <PowerDial boosted={pro} onDark={pro} />
      </div>

      <div className="relative flex items-baseline gap-2.5">
        {priceWas && (
          <span className={cn('font-mono text-sm line-through', pro ? 'text-white/45' : 'text-ink-faint')}>
            {priceWas}
          </span>
        )}
        <span className={cn('font-mono text-[32px] font-bold', pro ? 'text-white' : 'text-blue-600')}>{price}</span>
      </div>
      <p className={cn('relative mb-6 text-[12.5px]', pro ? 'text-white/65' : 'text-ink-dim')}>{priceSub}</p>

      <ul className={cn('relative mb-7 flex-1 space-y-2.5 border-t pt-5', pro ? 'border-white/15' : 'border-blue/20')}>
        {feats.map((f, i) => (
          <Feat key={i} yes={f.yes} onDark={pro}>
            {f.text}
          </Feat>
        ))}
      </ul>

      {/* With no destination this is a plain <button> that does nothing — the
          integration point for whoever wires up purchasing. On the dark Pro
          card the brand-blue button all but disappears, so it flips to white. */}
      {href ? (
        <Button
          to={href}
          variant="primary"
          arrow={pro}
          className={cn('relative w-full', pro && 'bg-white text-blue-600 hover:bg-white/90')}
        >
          {cta.label}
        </Button>
      ) : (
        <Button
          variant="primary"
          arrow={pro}
          className={cn('relative w-full', pro && 'bg-white text-blue-600 hover:bg-white/90')}
        >
          {cta.label}
        </Button>
      )}
    </div>
  );
}

function SubHead({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'mt-14 mb-4 flex items-center gap-3 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-faint',
        className ?? 'mx-auto max-w-3xl',
      )}
    >
      {children}
      <span aria-hidden className="h-px flex-1 bg-line" />
    </div>
  );
}

function SpecTable({
  head,
  rows,
  narrow,
  className,
}: {
  head: string[];
  rows: ReactNode[][];
  narrow?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('overflow-x-auto', className ?? (narrow ? 'mx-auto max-w-2xl' : 'mx-auto max-w-3xl'))}>
      <table className="w-full border-separate border-spacing-y-2 text-left">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="px-2.5 pb-1 font-mono text-[10px] font-bold uppercase tracking-wide text-ink-faint sm:px-4">
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
                    'border-y border-line bg-void px-2.5 py-3.5 text-[13.5px] text-ink transition-colors group-hover:bg-blue-soft/40 sm:px-4',
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

/**
 * The launch offer tab: one card, stating what the offer contains.
 *
 * The ₹99 pre-booking fee, the plan cards and the pay-by date are all gone
 * from here — this tab is the offer itself, not a way to buy it. The banner
 * went with them: it read "pre-book today, pay the launch rate later", which
 * is the same ₹99 concept, and the card carries the seat count on its own
 * ribbon. Basic and Pro still live on the Individual tab, and the ₹99 flow
 * still runs on the home page, the individuals page and the domain pages.
 */
function ExclusiveOffersPanel() {
  return (
    <div className="mt-8">
      <ExclusiveOfferCard />
    </div>
  );
}

/**
 * Individual first-subscription packs (client sheet, Aug 2026). Same capability
 * story as Teams minus the two rows that only mean anything to a team —
 * dedicated admin accounts and team-wide user tracking.
 */
const INDIVIDUAL_CAPABILITIES: { cap: string; basic: boolean; pro: boolean }[] = [
  { cap: 'Standard VM compute', basic: true, pro: true },
  { cap: 'Standard labs', basic: true, pro: true },
  { cap: 'Automated practical evaluation', basic: true, pro: true },
  { cap: 'Ticketing support', basic: true, pro: true },
  { cap: 'Certification upon completing skills', basic: true, pro: true },
  { cap: 'Higher VM compute (bigger labs)', basic: false, pro: true },
  { cap: 'Complex / high-end designs', basic: false, pro: true },
  { cap: 'Tool switching (change EDA vendor)', basic: false, pro: true },
];

const PACK_HEAD = ['No of hours', 'Basic price', 'Pro price', 'Validity', 'Data holding grace'];

/** [hours, basic, pro, validity, grace]. Validity and the data-holding grace
 *  are the same on both plans, so one table carries both price columns
 *  instead of two tables repeating the other three. The "First 100" pack
 *  label was dropped; the hour count already identifies the pack. */
const PACKS: string[][] = [
  ['100 hrs', '₹9,000', '₹10,000', '2 months', '2 weeks'],
  ['200 hrs', '₹18,000', '₹20,000', '4 months', '2 weeks'],
  ['300 hrs', '₹27,000', '₹30,000', '6 months', '2 weeks'],
  ['400 hrs', '₹36,000', '₹40,000', '8 months', '2 weeks'],
  ['500 hrs', '₹45,000', '₹50,000', '10 months', '2 weeks'],
];

const packRows = () =>
  PACKS.map(([hours, basic, pro, validity, grace]) => [
    <Num>{hours}</Num>,
    <Hl>{basic}</Hl>,
    <Hl>{pro}</Hl>,
    <Num>{validity}</Num>,
    <Num>{grace}</Num>,
  ]);

const INDIVIDUAL_REGISTER = 'https://vigyan.semiconlabs.com/register?tier=';

function IndividualPanel() {
  return (
    <>
      <div className="mx-auto mt-8 grid max-w-3xl items-start gap-5 md:grid-cols-2">
        <TierCard
          name="Basic"
          tag="Standard compute · ₹90/hr"
          price="₹9,000"
          priceSub="100 hrs · excl. GST"
          feats={INDIVIDUAL_CAPABILITIES.map((c) => ({ yes: c.basic, text: <>{c.cap}</> }))}
          cta={{ label: 'Start with Basic', to: `${INDIVIDUAL_REGISTER}basic` }}
        />
        <TierCard
          pro
          name="Pro"
          tag="Bigger computing · ₹100/hr"
          badge="Most Popular"
          price="₹10,000"
          priceSub="100 hrs · excl. GST"
          feats={INDIVIDUAL_CAPABILITIES.map((c) => ({ yes: c.pro, text: <>{c.cap}</> }))}
          cta={{ label: 'Start with Pro', to: `${INDIVIDUAL_REGISTER}pro` }}
        />
      </div>

      <SubHead className="mx-auto max-w-5xl">Plan packs</SubHead>
      <SpecTable className="mx-auto max-w-5xl" head={PACK_HEAD} rows={packRows()} />

      <Note>
        Base price is calculated at ₹90/hr on Basic and ₹100/hr on Pro. Validity and the data
        holding grace period apply per pack.
      </Note>
    </>
  );
}

const TEAM_PACK_HEAD = ['Sessions (240 hrs)', 'Discount', 'Basic price', 'Pro price'];

/** [sessions, discount, basic, pro], all excluding GST. Sessions and discount
 *  are the same on both plans, so the two ladders fold into one table with a
 *  price column each. Starts at 2 — a team cannot buy a single session, so
 *  the one-session base rate is stated in the heading, not as a buyable row. */
const TEAM_PACKS: string[][] = [
  ['2', '0%', '₹24,000', '₹27,500'],
  ['3', '10%', '₹32,400', '₹36,450'],
  ['4', '20%', '₹38,400', '₹43,200'],
  ['5', '30%', '₹42,000', '₹47,250'],
];

const teamPackRows = () =>
  TEAM_PACKS.map(([sessions, discount, basic, pro]) => [
    <Num>{sessions}</Num>,
    <Num>{discount}</Num>,
    <Hl>{basic}</Hl>,
    <Hl>{pro}</Hl>,
  ]);

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
          priceSub="per session · excl. GST"
          feats={TEAM_CAPABILITIES.map((c) => ({ yes: c.basic, text: <>{c.cap}</> }))}
          cta={{ label: 'Start a Basic team' }}
        />
        <TierCard
          pro
          name="Pro"
          tag="Bigger computing · bigger design"
          badge="Most Popular"
          price="₹13,500"
          priceSub="per session · excl. GST"
          feats={TEAM_CAPABILITIES.map((c) => ({ yes: c.pro, text: <>{c.cap}</> }))}
          cta={{ label: 'Start a Pro team' }}
        />
      </div>

      <SubHead className="mx-auto max-w-4xl">Session packs · Basic ₹12,000 · Pro ₹13,500</SubHead>
      <SpecTable className="mx-auto max-w-4xl" head={TEAM_PACK_HEAD} rows={teamPackRows()} />

      <Note>
        Prices shown are the total for the number of sessions, excluding GST. Maximum discount 30%.
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
  const initial = TABS.some((t) => t.id === requested) ? (requested as TabId) : 'exclusive';
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
          {tab === 'exclusive' && <ExclusiveOffersPanel />}
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
          <b className="font-semibold text-ink">
            {tab === 'teams' ? 'Data Backup for ₹500/month/user' : 'Data Backup for ₹500/month'}
          </b>
          .
        </p>
      )}
    </div>
  );
}
