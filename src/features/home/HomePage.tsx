import { Seo } from '@/components/seo/Seo';
import {
  organizationSchema,
  websiteSchema,
  faqSchema,
  courseSchema,
} from '@/lib/seo';
import { faqs } from '@/data/marketing';
import { Hero } from './sections/Hero';
import { HeroVideo } from './sections/HeroVideo';
import { SkillsMarquee } from './sections/SkillsMarquee';
import { TrustStrip } from './sections/TrustStrip';
import { WhySemicon } from './sections/WhySemicon';
import { AiEra } from './sections/AiEra';
import { Domains } from './sections/Domains';
import { HowItWorks } from './sections/HowItWorks';
import { SampleChallenges } from './sections/SampleChallenges';
import { ProficiencyLevels } from './sections/ProficiencyLevels';
import { JourneyToChips } from './sections/JourneyToChips';
import { PricingSection } from './sections/PricingSection';
import { Testimonials } from './sections/Testimonials';
import { FaqSection } from './sections/FaqSection';
import { FinalCta } from './sections/FinalCta';

export function HomePage() {
  return (
    <>
      <Seo
        path="/"
        schemas={[
          organizationSchema(),
          websiteSchema(),
          courseSchema({
            name: 'Semicon Labs — Semiconductor Engineering Challenges',
            description:
              'Learn Physical Design and Design Verification by solving real engineering challenges through a Problem → Investigation → Solution → Validation workflow.',
            path: '/',
          }),
          faqSchema(faqs.slice(0, 5)),
        ]}
      />
      <Hero />
      <HeroVideo />
      <SkillsMarquee />
      <WhySemicon />
      <AiEra />
      <Domains />
      <HowItWorks />
      <SampleChallenges />
      <ProficiencyLevels />
      <JourneyToChips />
      <TrustStrip />
      <PricingSection />
      <Testimonials />
      <FaqSection />
      <FinalCta />
    </>
  );
}
