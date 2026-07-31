import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PricingCards } from '@/components/marketing/PricingCards';

export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHead
        eyebrow="founding learner pricing"
        title="Pricing for Everyone Building In VLSI."
        lede="Big skills. Small price tags. Get access to professional EDA tools, hands-on VLSI labs, industry test cases and industry-recognized certifications at the lowest prices — designed for every learner, at every stage."
      />
      <Reveal>
        <PricingCards />
      </Reveal>
      <p className="mt-8 text-center text-xs text-ink-faint">
        7-day money-back guarantee on every paid plan · Cancel anytime, no questions asked
      </p>
    </Section>
  );
}
