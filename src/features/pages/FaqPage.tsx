import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { Reveal } from '@/components/motion/Reveal';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { faqs, type Faq } from '@/data/marketing';
import { breadcrumbSchema, faqSchema } from '@/lib/seo';

const groups: { title: string; category: Faq['category'] }[] = [
  { title: 'Getting started', category: 'getting-started' },
  { title: 'How learning works', category: 'learning' },
  { title: 'The platform', category: 'platform' },
  { title: 'Billing & plans', category: 'billing' },
];

export default function FaqPage() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers about how Semicon Labs works — challenges, validation, domains, modules, billing, and the roadmap toward a full learning platform."
        path="/faq"
        schemas={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }]),
          faqSchema(faqs),
        ]}
      />
      <PageHero
        eyebrow="questions, answered"
        title="Everything you might be wondering."
        lede="If your question isn't here, reach out — we answer fast."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'FAQ' }]}
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-14">
          {groups.map((group) => {
            const items = faqs.filter((f) => f.category === group.category);
            if (items.length === 0) return null;
            return (
              <div key={group.category}>
                <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-navy">
                  {group.title}
                </h2>
                <Reveal>
                  <FaqAccordion items={items} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
