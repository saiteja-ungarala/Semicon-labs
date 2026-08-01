import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PricingTabs } from '@/components/marketing/PricingTabs';

/** Pricing — the client's tiered model: Individual / Teams / Corporate tabs. */
export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHead
        align="center"
        eyebrow="pricing, made simple"
        title={
          <>
            Same labs. <span className="text-gradient">More power on Pro.</span>
          </>
        }
        lede="Basic and Pro run identical labs, tools, and problem sets. Pro just hands you a bigger engine underneath — for the labs that need it."
      />
      <Reveal>
        <PricingTabs />
      </Reveal>
    </Section>
  );
}
