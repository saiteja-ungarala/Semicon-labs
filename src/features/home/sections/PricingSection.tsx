import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { PricingCards } from '@/components/marketing/PricingCards';

/**
 * Pricing — the heading stays pinned on the left while the plan cards (and
 * their long feature lists) scroll past on the right.
 */
export function PricingSection() {
  return (
    <Section id="pricing">
      <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-14">
        {/* Pinned heading rail */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">founding learner pricing</p>
            <h2 className="mt-4 text-display-md">
              Pricing for Everyone <span className="text-gradient">Building In VLSI.</span>
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-dim">
              Big skills. Small price tags. Professional EDA tools, hands-on VLSI labs, industry test
              cases and recognized certifications — priced for every learner, at every stage.
            </p>
            <p className="mt-6 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              7-day money-back guarantee
              <br />
              Cancel anytime, no questions asked
            </p>
          </Reveal>
        </div>

        {/* Plan cards */}
        <Reveal className="min-w-0">
          <PricingCards />
        </Reveal>
      </div>
    </Section>
  );
}
