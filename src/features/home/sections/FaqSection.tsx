import { Link } from 'react-router-dom';
import { Section, SectionHead } from '@/components/ui/Section';
import { Reveal } from '@/components/motion/Reveal';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { faqs } from '@/data/marketing';

export function FaqSection() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl">
        <SectionHead eyebrow="questions" title="Before you start." align="center" />
        <Reveal>
          <FaqAccordion items={faqs.slice(0, 5)} />
        </Reveal>
        <p className="mt-8 text-center text-sm text-ink-dim">
          Still have a question?{' '}
          <Link to="/faq" className="text-blue-400 underline-offset-4 hover:underline">
            See all FAQs
          </Link>{' '}
          or{' '}
          <Link to="/contact" className="text-blue-400 underline-offset-4 hover:underline">
            talk to us
          </Link>
          .
        </p>
      </div>
    </Section>
  );
}
