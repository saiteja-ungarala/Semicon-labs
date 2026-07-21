import { Section, SectionHead } from '@/components/ui/Section';
import { InteractiveComparison } from '@/components/marketing/InteractiveComparison';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { whyPillars, type PillarIcon } from '@/data/marketing';

function PillarGlyph({ icon }: { icon: PillarIcon }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (icon) {
    case 'challenge':
      return (
        <svg viewBox="0 0 40 40" className="h-10 w-10" {...common}>
          <rect x="7" y="9" width="26" height="18" rx="2" />
          <path d="M12 15h10M12 20h7" />
          <path d="M15 27v4h10v-4M18 31h4" />
        </svg>
      );
    case 'analyze':
      return (
        <svg viewBox="0 0 40 40" className="h-10 w-10" {...common}>
          <path d="M8 30V10M8 30h24" />
          <path d="M12 26l6-8 5 4 8-11" />
          <circle cx="31" cy="11" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'debug':
      return (
        <svg viewBox="0 0 40 40" className="h-10 w-10" {...common}>
          <rect x="13" y="14" width="14" height="16" rx="6" />
          <path d="M20 10v4M13 18l-4-2M27 18l4-2M13 24H8M27 24h5M15 30l-3 3M25 30l3 3" />
        </svg>
      );
    case 'confidence':
      return (
        <svg viewBox="0 0 40 40" className="h-10 w-10" {...common}>
          <path d="M20 6l3.8 7.7 8.5 1.2-6.2 6 1.5 8.5L20 26.4 12.4 29.4l1.5-8.5-6.2-6 8.5-1.2z" />
        </svg>
      );
  }
}

export function WhySemicon() {
  return (
    <Section id="why">
      <SectionHead
        eyebrow="the gap in semiconductor learning"
        title={
          <>
            Knowing a flow is not the same
            <br className="hidden sm:block" /> as knowing how to solve a problem.
          </>
        }
        lede="Most platforms teach you to run a tool. Projects need you to fix what the tool can't. Here's the difference."
      />

      <InteractiveComparison />

      {/* Company "products" icon grid, repurposed for the four learning pillars */}
      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {whyPillars.map((pillar) => (
          <RevealItem key={pillar.title}>
            <div className="group flex h-full flex-col bg-panel p-7 transition-colors hover:bg-panel-raised">
              <span className="text-blue">
                <PillarGlyph icon={pillar.icon} />
              </span>
              <h3 className="mt-6 text-base font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-3 flex-1 text-sm text-ink-dim">{pillar.description}</p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wider text-blue">
                {pillar.spec}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
