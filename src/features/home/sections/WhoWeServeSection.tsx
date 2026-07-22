import { Section, SectionHead } from '@/components/ui/Section';
import { WhoWeServe } from '@/components/marketing/WhoWeServe';

export function WhoWeServeSection() {
  return (
    <Section id="who-we-serve" alt>
      <SectionHead
        eyebrow="who we serve"
        title="One platform, built for every stage of a silicon career."
        lede="From your first internship to an enterprise training programme — there's a plan that fits."
      />
      <WhoWeServe />
    </Section>
  );
}
