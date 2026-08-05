import { motion, useReducedMotion } from 'framer-motion';
import type { DomainSummary, SkillSummary } from '@/features/curriculum/api';
import { cn } from '@/lib/cn';

/**
 * The domain's skills drawn as the silicon flow they actually are: a rank of
 * stages from RTL to GDSII, with a real two-lane fork wherever the catalog
 * carries the same stage in both Cadence and Synopsys. Clicking a stage jumps
 * to it in the list below — the list itself is unchanged.
 */

interface Lane {
  slug: string;
  vendor: string | null;
}
interface Stage {
  key: string;
  label: string;
  token: string;
  lanes: Lane[];
}

const ACCENT: Record<string, { line: string; lift: string }> = {
  PD: { line: '#2E1EE0', lift: '#8E85FF' },
  DV: { line: '#6D28D9', lift: '#A78BFA' },
  AL: { line: '#B45309', lift: '#FBBF24' },
};

const TERMINALS: Record<string, [string, string]> = {
  PD: ['RTL', 'GDSII'],
  DV: ['SPEC', 'SIGNOFF'],
  AL: ['SCHEMATIC', 'TAPEOUT'],
};

const FOOTNOTE: Record<string, string> = {
  PD: 'two tool lanes — learn it in Cadence, in Synopsys, or both.',
  DV: 'each layer builds on the one before it.',
  AL: 'three steps, one tapeout-clean layout.',
};

/** "Synthesis – Cadence" → stage "Synthesis", lane "Cadence". */
function splitName(name: string): [string, string | null] {
  const parts = name.split(/\s+[–—-]\s+/);
  return [parts[0].trim(), parts[1]?.trim() ?? null];
}

/** Vendor lane codes, the way engineers actually write them. */
const VENDOR_CODE: Record<string, string> = {
  cadence: 'CDN',
  synopsys: 'SNPS',
  siemens: 'CAL',
  calibre: 'CAL',
};
const vendorCode = (v: string) => VENDOR_CODE[v.toLowerCase()] ?? v.slice(0, 4).toUpperCase();

/** Short code for the node face: acronyms keep their letters, phrases get initials. */
function tokenFor(label: string): string {
  // Drop "&" and other joiners so "Scripting & Automation" reads SA, not "S&A".
  const words = label.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w));
  if (words.length > 1) return words.map((w) => w[0]).join('').slice(0, 3).toUpperCase();
  return label.replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase();
}

function buildStages(skills: SkillSummary[]): Stage[] {
  const out: Stage[] = [];
  const index = new Map<string, Stage>();
  for (const s of skills) {
    const [label, vendor] = splitName(s.name);
    const key = label.toLowerCase();
    let stage = index.get(key);
    if (!stage) {
      stage = { key, label, token: tokenFor(label), lanes: [] };
      index.set(key, stage);
      out.push(stage);
    }
    stage.lanes.push({ slug: s.slug, vendor });
  }
  return out;
}

function Terminal({ children }: { children: string }) {
  return (
    <span className="shrink-0 rounded-md border border-white/25 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
      {children}
    </span>
  );
}

export function FlowMap({ domain }: { domain: DomainSummary }) {
  const reduce = useReducedMotion() ?? false;
  const stages = buildStages(domain.skills);
  const accent = ACCENT[domain.code] ?? ACCENT.PD;
  const [from, to] = TERMINALS[domain.code] ?? ['START', 'DONE'];

  const jump = (slug: string) => {
    document
      .getElementById(`skill-${slug}`)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  const nodeFace = (stage: Stage, lane: Lane | null, compact: boolean) => (
    <button
      key={lane ? lane.slug : stage.key}
      type="button"
      onClick={() => jump((lane ?? stage.lanes[0]).slug)}
      aria-label={`Jump to ${stage.label}${lane?.vendor ? ` — ${lane.vendor}` : ''}`}
      className={cn(
        'group/node relative flex items-center justify-center rounded-xl border bg-white/[0.04] font-mono font-bold uppercase text-white/80 transition-all duration-200',
        'border-white/15 hover:border-[color:var(--lift)] hover:bg-white/[0.09] hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lift)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060F]',
        compact ? 'h-7 w-[62px] text-[9.5px] tracking-[0.12em]' : 'h-[52px] w-[62px] text-[11px] tracking-[0.14em]',
      )}
    >
      {compact && lane?.vendor ? vendorCode(lane.vendor) : stage.token}
    </button>
  );

  return (
    <div
      className="relative mb-10 overflow-hidden rounded-3xl bg-[#05060F] px-5 py-6 sm:px-7 sm:py-7"
      style={{ ['--lift' as string]: accent.lift }}
    >
      {/* faint fab grid */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-40 w-72 rounded-full blur-3xl"
        style={{ background: `${accent.line}55` }}
      />

      <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent.lift }}>
          {domain.code} flow map
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
          {domain.stats.skills} skills · {domain.stats.modules} competencies · {domain.stats.testcases} testcases
        </p>
      </div>

      {/* Horizontal rank — desktop */}
      <div className="relative mt-5 hidden items-center gap-2 lg:flex xl:gap-3">
        <Terminal>{from}</Terminal>
        {stages.map((stage, i) => (
          <div key={stage.key} className="flex min-w-0 flex-1 items-center gap-2 xl:gap-3">
            <span aria-hidden className="h-px flex-1" style={{ background: `${accent.lift}55` }} />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : i * 0.06 }}
              className="flex shrink-0 flex-col items-center gap-1.5"
            >
              {stage.lanes.length > 1 ? (
                <span className="flex flex-col gap-1">{stage.lanes.map((l) => nodeFace(stage, l, true))}</span>
              ) : (
                nodeFace(stage, stage.lanes[0], false)
              )}
              <span className="max-w-[94px] text-center font-mono text-[9px] uppercase leading-tight tracking-[0.1em] text-white/45">
                {stage.label}
                {stage.lanes.length === 1 && stage.lanes[0].vendor && (
                  <span className="text-white/30"> · {vendorCode(stage.lanes[0].vendor)}</span>
                )}
              </span>
            </motion.div>
          </div>
        ))}
        <span aria-hidden className="h-px w-6 shrink-0" style={{ background: `${accent.lift}55` }} />
        <Terminal>{to}</Terminal>
      </div>

      {/* Vertical spine — below lg, so nothing ever scrolls sideways */}
      <ol className="relative mt-5 space-y-1.5 lg:hidden">
        {stages.map((stage) => (
          <li key={stage.key} className="flex items-center gap-3">
            <span aria-hidden className="h-8 w-px shrink-0" style={{ background: `${accent.lift}55` }} />
            <button
              type="button"
              onClick={() => jump(stage.lanes[0].slug)}
              className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition-colors hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--lift)]"
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: accent.lift }}>
                {stage.token}
              </span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-white/80">{stage.label}</span>
              {stage.lanes.length > 1 && (
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">
                  {stage.lanes.length} tools
                </span>
              )}
            </button>
          </li>
        ))}
      </ol>

      <p className="relative mt-4 font-hand text-[15px] text-white/55">
        {FOOTNOTE[domain.code] ?? 'every stage, opened up below.'}
      </p>
    </div>
  );
}
