import { Seo } from '@/components/seo/Seo';
import { pageSeo } from '@/data/pageSeo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { PricingTabs } from '@/components/marketing/PricingTabs';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { Reveal } from '@/components/motion/Reveal';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { faqs } from '@/data/marketing';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';

const billingFaqs = faqs.filter((f) => f.category === 'billing' || f.category === 'getting-started');

export default function PricingPage() {
  return (
    <>
      <Seo
        {...pageSeo["/pricing"]}
        path="/pricing"
        schemas={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]),
          faqSchema(billingFaqs),
        ]}
      />
      <PageHero
        eyebrow="pricing, made simple"
        title={
          <>
            Pricing That Fits <span className="text-gradient">Every VLSI Journey</span>
          </>
        }

        crumbs={[{ name: 'Home', to: '/' }, { name: 'Pricing' }]}
      />
      {/* No reveal here: the plans are the reason for the page, and
          animating them in left the section blank on arrival. */}
      <Section id="plans">
        <PricingTabs />
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="why it's worth it"
          title="What your subscription actually buys."
          lede="Not hours of video. The ability to solve problems you'll face on a real project."
        />
        <ComparisonTable />
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHead eyebrow="billing questions" title="Good to know before you subscribe." align="center" />
          <Reveal>
            <FaqAccordion items={billingFaqs} />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
