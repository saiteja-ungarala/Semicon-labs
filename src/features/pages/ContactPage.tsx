import { Seo } from '@/components/seo/Seo';
import { PageHero } from '@/components/marketing/PageHero';
import { Section } from '@/components/ui/Section';
import { CorporateEnquiryForm } from '@/components/marketing/CorporateEnquiryForm';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * Contact is the enquiry form and nothing else (client direction, Aug 2026).
 * It reuses the same component as the corporates page — same fields, same
 * design — so there is one enquiry form to wire to an API, not two.
 */
export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the Semicon Labs team — questions about labs, plans, partnerships, or anything else."
        path="/contact"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <PageHero title="Contact" crumbs={[{ name: 'Home', to: '/' }, { name: 'Contact' }]} />
      <Section>
        <CorporateEnquiryForm />
      </Section>
    </>
  );
}
