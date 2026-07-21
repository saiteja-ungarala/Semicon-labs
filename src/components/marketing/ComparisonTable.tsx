import { comparison } from '@/data/curriculum';
import { Reveal } from '@/components/motion/Reveal';

/** Traditional Learning vs. Semicon Labs — the core positioning table. */
export function ComparisonTable() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-2xl border border-line">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr]">
          {/* Header row (hidden on mobile; each cell labels itself instead) */}
          <div className="hidden bg-panel-raised p-5 md:block" />
          <div className="hidden bg-panel-raised p-5 font-mono text-[13px] font-bold uppercase tracking-wider text-ink-faint md:block">
            Traditional Learning
          </div>
          <div className="hidden bg-panel-raised p-5 font-mono text-[13px] font-bold uppercase tracking-wider text-blue-400 md:block">
            Semicon Labs
          </div>

          {comparison.map((row, i) => (
            <div key={row.aspect} className="contents">
              <div
                className={`border-t border-line bg-panel p-5 font-mono text-[13px] text-ink-dim ${i === 0 ? 'md:border-t' : ''}`}
              >
                {row.aspect}
              </div>
              <div className="flex items-start gap-2 border-t border-line p-5 text-sm text-ink-dim">
                <span aria-hidden className="mt-0.5 text-fail">
                  ✕
                </span>
                <span>
                  <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-ink-faint md:hidden">
                    Traditional
                  </span>
                  {row.traditional}
                </span>
              </div>
              <div className="flex items-start gap-2 border-t border-line bg-blue-soft/30 p-5 text-sm text-ink">
                <span aria-hidden className="mt-0.5 text-pass">
                  ✓
                </span>
                <span>
                  <span className="mb-0.5 block font-mono text-[10px] uppercase tracking-wider text-blue-400 md:hidden">
                    Semicon Labs
                  </span>
                  {row.semicon}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
