import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { WhoWeServe } from '@/components/marketing/WhoWeServe';
import { PricingCards } from '@/components/marketing/PricingCards';
import { Reveal } from '@/components/motion/Reveal';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { breadcrumbSchema } from '@/lib/seo';

export default function WhoWeServePage() {
  return (
    <>
      <Seo
        title="Who We Serve"
        description="Semicon Labs serves students and freshers, working engineers, training teams, and enterprises — with a plan for every stage of a semiconductor career."
        path="/who-we-serve"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Who We Serve', path: '/who-we-serve' }])]}
      />
      <PageHero
        eyebrow="who we serve"
        title="Built for every stage of a silicon career."
        lede="Whether you're preparing for your first role, deepening expertise, training a team, or rolling out across an organisation — there's a Semicon Labs plan that fits."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Who We Serve' }]}
      />

      <Section>
        <WhoWeServe detailed />
      </Section>

      <Section alt>
        <SectionHead
          eyebrow="pricing"
          title="Find the plan for you."
          lede="Start free, then pick the plan that matches how you learn — individual, team, or enterprise."
        />
        <Reveal>
          <PricingCards />
        </Reveal>
        <p className="mt-8 text-center text-sm text-ink-faint">
          Need team or enterprise seats?{' '}
          <a href="/contact" className="text-blue hover:underline">
            Talk to us
          </a>{' '}
          for volume and custom rollout pricing.
        </p>
      </Section>

      <FinalCta />
    </>
  );
}
