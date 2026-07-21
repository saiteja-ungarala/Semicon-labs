import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PricingCards } from '@/components/marketing/PricingCards';

export function PricingSection() {
  return (
    <Section id="pricing">
      <SectionHead
        eyebrow="founding learner pricing"
        title="Start free. Upgrade the moment you're ready."
        lede="Founding pricing is locked for as long as you stay subscribed — it only goes up from here."
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
