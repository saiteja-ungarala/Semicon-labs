import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PricingTabs } from '@/components/marketing/PricingTabs';

/**
 * The full pricing set on the homepage — the same Individual / Teams /
 * Corporate tabs the pricing page shows, so nothing is hidden behind a second
 * click (client direction, Aug 2026). The ₹99 launch offer still leads, since
 * it is the Individual tab's own content.
 */
export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHead
        align="center"
        eyebrow="pricing, made simple"
        title={
          <>
            Everything you need to <span className="text-gradient">break into VLSI.</span>
          </>
        }
        lede="Individual, team and corporate plans — the same labs and tools throughout, priced for how you learn."
      />
      <Reveal>
        <div className="mt-8">
          <PricingTabs />
        </div>
      </Reveal>
    </Section>
  );
}
