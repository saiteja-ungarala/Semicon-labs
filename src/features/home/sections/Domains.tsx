import { Section, SectionHead } from '@/components/ui/Section';
import { DomainCard } from '@/components/marketing/DomainCard';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { domains } from '@/data/curriculum';

export function Domains() {
  return (
    <Section id="domains">
      <SectionHead
        eyebrow="domains, skills & competencies"
        title="Structured the way real engineering teams are."
        lede="Two domains today. Every skill breaks down into the exact competencies you'll be measured on in a project review."
      />
      <RevealGroup className="grid gap-6 lg:grid-cols-2" stagger={0.1}>
        {domains.map((domain) => (
          <RevealItem key={domain.slug}>
            <DomainCard domain={domain} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
