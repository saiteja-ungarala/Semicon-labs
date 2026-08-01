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
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient">as knowing how to solve a problem.</span>
          </>
        }
        lede="Most platforms teach you to run a tool. Projects need you to fix what the tool can't. Here's the difference."
      />

      <InteractiveComparison />

      <SectionHead
        className="mt-24"
        eyebrow="the skills every semiconductor engineer needs"
        title={
          <>
            Learn the Skills That Matter
            <br className="hidden sm:block" /> <span className="text-gradient">in Real Projects.</span>
          </>
        }
      />

      {/* Company "products" icon grid, repurposed for the four learning pillars */}
      <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {whyPillars.map((pillar) => (
          <RevealItem key={pillar.title} className="h-full">
            <div className="group relative flex h-full flex-col overflow-hidden bg-panel p-7 transition-all duration-300 hover:z-10 hover:-translate-y-1.5 hover:bg-panel hover:shadow-card-hover">
              {/* Soft brand glow that blooms on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle at 20% 0%, rgba(46,30,224,0.07), transparent 60%)' }}
              />
              {/* Icon flash-fills blue (two quick blinks) the moment the card is hovered */}
              <span className="relative inline-flex h-16 w-16 items-center justify-center self-start rounded-2xl text-blue transition-all duration-300 group-hover:scale-110 group-hover:text-white">
                <span aria-hidden className="absolute inset-0 rounded-2xl bg-blue opacity-0 group-hover:animate-icon-flash" />
                <span className="relative">
                  <PillarGlyph icon={pillar.icon} />
                </span>
              </span>
              <h3 className="relative mt-6 text-base font-semibold text-ink transition-colors duration-300 group-hover:text-blue-600">
                {pillar.title}
              </h3>
              <p className="relative mt-3 flex-1 text-sm text-ink-dim">{pillar.description}</p>
              <p className="relative mt-6 flex items-center gap-1.5 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wider text-blue">
                {pillar.spec}
                <span aria-hidden className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  →
                </span>
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
