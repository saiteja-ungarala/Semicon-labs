import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { PricingTabs } from '@/components/marketing/PricingTabs';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { Reveal } from '@/components/motion/Reveal';
import { faqs } from '@/data/marketing';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';

const billingFaqs = faqs.filter((f) => f.category === 'billing' || f.category === 'getting-started');

export default function PricingPage() {
  return (
    <>
      <Seo
        title="Pricing"
        description="Simple, founding-learner pricing for Semicon Labs. Start free, upgrade to Specialist or Career when you're ready. 7-day money-back guarantee on every paid plan."
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
            Same labs. <span className="text-gradient">More power on Pro.</span>
          </>
        }
        lede="Basic and Pro run identical labs, tools, and problem sets. Pro just hands you a bigger engine underneath — for the labs that need it."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Pricing' }]}
      />
      <Section>
        <Reveal>
          <PricingTabs />
        </Reveal>
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
