import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
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
function PowerDial({ boosted, onDark }: { boosted?: boolean; onDark?: boolean }) {
  const track = onDark ? 'rgba(255,255,255,0.22)' : '#E6E7F4';
  const fill = onDark ? '#FFFFFF' : '#2E1EE0';
  return (
    <div className="flex items-center gap-3.5">
      <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden>
        <path d="M4 36 A28 28 0 0 1 60 36" fill="none" stroke={track} strokeWidth="7" strokeLinecap="round" />
        <path
          d="M4 36 A28 28 0 0 1 60 36"
          fill="none"
          stroke={fill}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="88"
          strokeDashoffset={boosted ? 9 : 53}
        />
      </svg>
      <div className={cn('font-mono text-[10.5px] uppercase tracking-wide', onDark ? 'text-white/70' : 'text-ink-faint')}>
        Power level
        <b className={cn('mt-0.5 block font-display text-[13.5px] normal-case tracking-normal', onDark ? 'text-white' : 'text-ink')}>
          {boosted ? 'Boosted' : 'Standard'}
        </b>
      </div>
    </div>
  );
}

function Feat({ yes, children, onDark }: { yes: boolean; children: ReactNode; onDark?: boolean }) {
  return (
    <li className={cn('flex items-start gap-2.5 text-[13.5px] leading-snug', yes ? (onDark ? 'text-white' : 'text-ink') : onDark ? 'text-white/50' : 'text-ink-faint')}>
      <span
        aria-hidden
        className={cn(
          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10.5px] font-bold',
          yes ? (onDark ? 'bg-white text-blue' : 'bg-blue text-white') : onDark ? 'bg-white/15 text-white/60' : 'bg-line text-ink-faint',
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
        'relative flex flex-col rounded-3xl border-[1.5px] p-7 transition-all duration-300 hover:-translate-y-1',
        pro
          ? 'border-blue bg-gradient-to-b from-blue to-blue-600 text-white shadow-glow'
          : 'border-blue/15 bg-blue-soft/40 hover:border-blue/35',
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn('font-display text-[21px] font-bold', pro ? 'text-white' : 'text-ink')}>{name}</span>
        {badge && (
          <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide', pro ? 'bg-white text-blue' : 'bg-ink text-white')}>
            {badge}
          </span>
        )}
      </div>
      <p className={cn('mt-0.5 text-[13px]', pro ? 'text-white/75' : 'text-ink-dim')}>{tag}</p>

      <div className="my-5">
        <PowerDial boosted={pro} onDark={pro} />
      </div>

      <div className="flex items-baseline gap-2.5">
        {priceWas && (
          <span className={cn('font-mono text-sm line-through', pro ? 'text-white/55' : 'text-ink-faint')}>{priceWas}</span>
        )}
        <span className="font-mono text-[32px] font-bold">{price}</span>
      </div>
      <p className={cn('mb-6 text-[12.5px]', pro ? 'text-white/70' : 'text-ink-dim')}>{priceSub}</p>

      <ul className="mb-7 flex-1 space-y-2.5">
        {feats.map((f, i) => (
          <Feat key={i} yes={f.yes} onDark={pro}>
            {f.text}
          </Feat>
        ))}
      </ul>

      <Button
        to={cta.to}
        variant={pro ? 'secondary' : 'primary'}
        className={cn('w-full', pro && 'border-0 bg-white text-blue-600 hover:bg-blue-50')}
        arrow={pro}
      >
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
        left={<><b className="text-blue-600">🎉 First 100 hours, 50% off</b> — one-time welcome offer on either tier.</>}
        right="Valid 2 months"
      />
      <div className="mx-auto mt-8 grid max-w-3xl gap-5 md:grid-cols-2">
        <TierCard
          name="Basic"
          tag="For standard-complexity labs"
          priceWas="₹9,000"
          price="₹4,500"
          priceSub="/ 100 hrs · first purchase · excl. GST"
          feats={[
            { yes: true, text: 'Full problem library, all domains' },
            { yes: true, text: 'Standard-complexity labs' },
            { yes: true, text: 'Automated practical evaluation' },
            { yes: true, text: 'Domain-specific certifications' },
            { yes: true, text: '2 hrs/month mentoring' },
            { yes: false, text: 'Advanced / complex labs' },
            { yes: false, text: 'Tool switching across EDA vendors' },
          ]}
          cta={{ label: 'Start on Basic', to: '/register?plan=individual-basic' }}
        />
        <TierCard
          pro
          name="Pro"
          tag="For advanced, large-block labs"
          badge="+20%"
          priceWas="₹10,800"
          price="₹5,400"
          priceSub="/ 100 hrs · first purchase · excl. GST"
          feats={[
            { yes: true, text: 'Everything in Basic' },
            { yes: true, text: 'Higher VM compute for large-block work' },
            { yes: true, text: 'Advanced / complex / signoff-flow labs' },
            { yes: true, text: 'Switch between EDA vendors mid-course' },
            { yes: true, text: 'Built for physical design & large SoC work' },
          ]}
          cta={{ label: 'Go Pro', to: '/register?plan=individual-pro' }}
        />
      </div>

      <SubHead>Top-up packs · after your first subscription</SubHead>
      <SpecTable
        head={['Pack', 'Hours', 'Discount', 'Basic', 'Pro (+20%)', 'Validity']}
        rows={[
          ['Top-Up 50', <Num>50 hrs</Num>, <Num>—</Num>, <Num>₹4,500</Num>, <Num>₹5,400</Num>, '1 month'],
          ['Top-Up 100', <Num>100 hrs</Num>, <Hl>25% off</Hl>, <Num>₹6,750</Num>, <Num>₹8,100</Num>, '2 months'],
          ['Top-Up 200', <Num>200 hrs</Num>, <Hl>50% off</Hl>, <Num>₹9,000</Num>, <Num>₹10,800</Num>, '5 months'],
        ]}
      />
      <Note>
        All prices exclude 18% GST. Hold both Basic and Pro hours at once — buy Pro only for the labs that
        actually need it.
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
      <div className="mx-auto mt-8 max-w-3xl rounded-3xl border-[1.5px] border-blue/15 bg-blue-soft/40 px-8 py-11 text-center">
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
