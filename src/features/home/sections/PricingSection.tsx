import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { LaunchOfferCard } from '@/components/marketing/LaunchOfferCard';

/** Pricing — simplified to only show the Launch Offer Card */
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
        lede="Reserve today and lock the launch rate — 200 hours for the price of 100. Once the 1,000 seats are gone, regular pricing applies."
      />
      <Reveal>
        <div className="mx-auto mt-8 max-w-lg">
          <LaunchOfferCard variant="full" />
        </div>
      </Reveal>
    </Section>
  );
}
