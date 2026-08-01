import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { LaunchOfferCard } from './LaunchOfferCard';
import { cn } from '@/lib/cn';

/**
 * The client's pricing model (semiconlabs-pricing-white.html), rebuilt in the
 * site's design system: Individual / Teams / Corporate tabs, Basic vs Pro
 * tiers ("same labs, more power on Pro"), top-up packs and volume discounts.
 * All prices exclude 18% GST.
 */

type TabId = 'individual' | 'teams' | 'corporate';

const TABS: { id: TabId; label: string }[] = [
  { id: 'individual', label: 'Individual' },
  { id: 'teams', label: 'Teams' },
  { id: 'corporate', label: 'Corporate' },
];

/* ---------------------------------------------------------------- pieces */

function Banner({ left, right }: { left: ReactNode; right: string }) {
  return (
    <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-between gap-3 rounded-2xl border-[1.5px] border-dashed border-blue/40 px-6 py-4">
      <div className="text-[14px] text-ink">{left}</div>
      <div className="rounded-full bg-void-2 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wide text-ink-dim">
        {right}
      </div>
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
  cta: { label: string; to: string };
}

function TierCard({ pro, name, tag, badge, priceWas, price, priceSub, feats, cta }: TierCardProps) {
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

      <Button to={cta.to} variant={pro ? 'primary' : 'secondary'} arrow={pro} className="relative w-full">
        {cta.label}
      </Button>
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
        right="Only 1,000 seats"
      />
      <div className="mx-auto mt-8 grid max-w-3xl items-stretch gap-5 md:grid-cols-2">
        {/* The attention card: ₹99 pre-book */}
        <LaunchOfferCard variant="full" />

        {/* The quiet contrast: what everyone else pays */}
        <div className="relative flex flex-col rounded-3xl border border-line bg-panel p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover">
          <span className="font-display text-[21px] font-bold text-ink">After Launch</span>
          <p className="mt-0.5 text-[13px] text-ink-dim">Pay-per-use rate · no bonus hours</p>

          <ul className="mt-6 rounded-2xl border border-line bg-void px-5 py-1">
            {[
              ['100 hours', '₹9,000'],
              ['200 hours', '₹18,000'],
            ].map(([l, v]) => (
              <li key={l} className="flex items-center justify-between gap-3 border-t border-line/70 py-3.5 first:border-t-0">
                <span className="text-[13.5px] text-ink-dim">{l}</span>
                <b className="font-mono text-[17px] text-ink">{v}</b>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-5">
            <Feat yes>Same labs, same tools, same testcases</Feat>
            <Feat yes>Basic & Pro compute tiers open at launch</Feat>
            <Feat yes>Top-up packs available anytime</Feat>
            <Feat yes={false}>100 bonus hours — pre-book exclusive</Feat>
            <Feat yes={false}>Launch-rate lock — pre-book exclusive</Feat>
          </ul>

          <div className="mt-7">
            <Button to="/register?plan=notify" variant="secondary" className="w-full">
              Notify me at launch
            </Button>
            <p className="mt-2.5 text-center text-[11px] text-ink-faint">No bonus hours after the 1,000 seats fill.</p>
          </div>
        </div>
      </div>

      <Note>
        Reserve today and lock the launch rate — <b className="text-blue-600">200 hours for the price of 100</b>.
        Once the 1,000 seats are gone, 100 hours cost ₹9,000 and 200 hours cost ₹18,000. All prices exclude 18% GST.
      </Note>
    </>
  );
}

function TeamsPanel() {
  return (
    <>
      <Banner
        left={<><b className="text-blue-600">1 session</b> = 1 seat, 1 month, 240 lab hours. Minimum 2 sessions.</>}
        right="Billed monthly"
      />
      <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
        <TierCard
          name="Basic"
          tag="Standard compute · per session"
          price="₹11,000"
          priceSub="/ session / month · excl. GST"
          feats={[
            { yes: true, text: '240 lab hours per seat, per month' },
            { yes: true, text: 'Admin allocates seats across the team' },
            { yes: true, text: 'Standard-complexity labs, all domains' },
            { yes: true, text: 'AI chatbot + ticketing support' },
            { yes: true, text: 'Up to 40% off at scale' },
            { yes: false, text: 'Mentoring not included' },
          ]}
          cta={{ label: 'Start a Basic team', to: '/contact?plan=team-basic' }}
        />
        <TierCard
          pro
          name="Pro"
          tag="Higher compute · per session"
          badge="+20%"
          price="₹12,500"
          priceSub="/ session / month · excl. GST"
          feats={[
            { yes: true, text: 'Everything in Basic' },
            { yes: true, text: 'Higher VM compute for large-block work' },
            { yes: true, text: 'Advanced / complex / signoff-flow labs' },
            { yes: true, text: 'Tool switching across EDA vendors' },
          ]}
          cta={{ label: 'Start a Pro team', to: '/contact?plan=team-pro' }}
        />
      </div>

      <SubHead>Volume discount · scales with sessions</SubHead>
      <SpecTable
        head={['Sessions', 'Discount', 'Basic /session', 'Pro /session']}
        rows={[
          ['2 (minimum)', <Num>—</Num>, <Num>₹11,000</Num>, <Num>₹12,500</Num>],
          ['3', <Hl>10% off</Hl>, <Num>₹9,900</Num>, <Num>₹11,250</Num>],
          ['4', <Hl>20% off</Hl>, <Num>₹8,800</Num>, <Num>₹10,000</Num>],
          ['5', <Hl>30% off</Hl>, <Num>₹7,700</Num>, <Num>₹8,750</Num>],
          ['6+', <Hl>40% off (max)</Hl>, <Num>₹6,600</Num>, <Num>₹7,500</Num>],
        ]}
      />
      <Note>Data holding after a session lapses: ₹500/month per team-member login. All prices exclude 18% GST.</Note>
    </>
  );
}

const CORP_COMPARE: { cap: string; basic: boolean; pro: boolean }[] = [
  { cap: 'Full problem library, all domains', basic: true, pro: true },
  { cap: 'Standard-complexity labs', basic: true, pro: true },
  { cap: 'Advanced / complex / signoff labs', basic: false, pro: true },
  { cap: 'Higher VM compute for large-block work', basic: false, pro: true },
  { cap: 'Tool switching across EDA vendors', basic: false, pro: true },
  { cap: 'Certifications + progress tracking', basic: true, pro: true },
  { cap: 'AI chatbot + ticketing support', basic: true, pro: true },
  { cap: 'Employee performance loyalty rewards', basic: true, pro: true },
];

const CORP_DISCOUNTS: { label: string; width: number; pct: string }[] = [
  { label: '10 licenses', width: 0, pct: '0%' },
  { label: '15', width: 12.5, pct: '5%' },
  { label: '20', width: 25, pct: '10%' },
  { label: '30', width: 50, pct: '20%' },
  { label: '40', width: 75, pct: '30%' },
  { label: '50+', width: 100, pct: '40%' },
];

function Dot({ yes }: { yes: boolean }) {
  return yes ? (
    <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-blue text-[11.5px] font-bold text-white">✓</span>
  ) : (
    <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full bg-line text-[12px] text-ink-faint">–</span>
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
        <Button to="/contact?plan=corporate" arrow className="mt-6">
          Talk to Sales
        </Button>
        <div className="mt-8 flex flex-wrap justify-center gap-x-11 gap-y-5">
          {[
            ['10', 'min. licenses'],
            ['40%', 'max. volume discount'],
            ['92–95%', 'vs. in-house training'],
          ].map(([v, l]) => (
            <div key={l}>
              <b className="block font-display text-[25px] font-bold text-blue">{v}</b>
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-dim">{l}</span>
            </div>
          ))}
        </div>
      </div>

      <SubHead>Basic vs Pro — what changes</SubHead>
      <SpecTable
        head={['Capability', 'Basic', 'Pro']}
        rows={CORP_COMPARE.map((r) => [
          r.cap,
          <div className="text-center"><Dot yes={r.basic} /></div>,
          <div className="text-center"><Dot yes={r.pro} /></div>,
        ])}
      />

      <SubHead>Volume discount shape</SubHead>
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-void px-7 py-6">
        {CORP_DISCOUNTS.map((d, i) => (
          <div key={d.label} className={cn('flex items-center gap-4', i > 0 && 'mt-3')}>
            <div className="w-[92px] shrink-0 font-mono text-[11.5px] text-ink-dim">{d.label}</div>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-sky"
                initial={{ width: 0 }}
                whileInView={{ width: `${d.width}%` }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="w-9 shrink-0 text-right font-mono text-[11.5px] font-bold text-blue">{d.pct}</div>
          </div>
        ))}
      </div>
      <Note>
        Exact per-license pricing, contract terms, and the performance loyalty pool are shared by sales once
        we know your headcount and domain mix.
      </Note>
    </>
  );
}

/* ------------------------------------------------------------------ main */

export function PricingTabs() {
  const [tab, setTab] = useState<TabId>('individual');

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

      <p className="mt-10 text-center font-mono text-[11px] text-ink-faint">
        All prices exclude 18% GST unless stated · Corporate quotes via sales
      </p>
    </div>
  );
}
