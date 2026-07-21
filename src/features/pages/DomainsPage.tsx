import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { DomainCard } from '@/components/marketing/DomainCard';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { domains } from '@/data/curriculum';
import { breadcrumbSchema } from '@/lib/seo';

export default function DomainsPage() {
  return (
    <>
      <Seo
        title="Engineering Domains"
        description="Explore the Semicon Labs engineering domains — Physical Design and Design Verification — and the skills and competencies within each."
        path="/domains"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Domains', path: '/domains' }])]}
      />
      <PageHero
        eyebrow="engineering domains"
        title="Two domains. Built the way real teams work."
        lede="Physical Design and Design Verification — each broken down into the skills and competencies you'll be measured on in a project review."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Domains' }]}
      />
      <Section>
        <RevealGroup className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
          {domains.map((domain) => (
            <RevealItem key={domain.slug}>
              <DomainCard domain={domain} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
      <FinalCta />
    </>
  );
}
