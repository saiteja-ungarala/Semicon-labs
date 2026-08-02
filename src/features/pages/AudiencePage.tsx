import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { LaunchOfferCard } from '@/components/marketing/LaunchOfferCard';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { audiencePages } from '@/data/audiencePages';
import { breadcrumbSchema } from '@/lib/seo';

/**
 * Dedicated audience page (Individuals / Teams / Corporates): numbered
 * value-props on the left, an attention-holding sticky pricing card on the
 * right — same pattern as the domain pages so the site reads as one system.
 */
export default function AudiencePage() {
  const { audience } = useParams();
  const page = audiencePages.find((p) => p.slug === audience);
  if (!page) return <Navigate to="/who-we-serve" replace />;

  const path = `/who-we-serve/${page.slug}`;

  return (
    <>
      <Seo
        title={`${page.name} — Who We Serve`}
        description={page.lede}
        path={path}
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Who We Serve', path: '/who-we-serve' },
            { name: page.name, path },
          ]),
        ]}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lede={page.lede}
        art={page.heroArt}
        artAlt={`${page.name} illustration`}
        crumbs={[
          { name: 'Home', to: '/' },
          { name: 'Who We Serve', to: '/who-we-serve' },
          { name: page.name },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Button to={page.pricing.cta.to} arrow>
            {page.pricing.cta.label}
          </Button>
          <Button to="/domains" variant="secondary">
            Explore the curriculum
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHead eyebrow={page.sectionEyebrow} title={page.sectionTitle} lede={page.sectionLede} />
        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          {/* Numbered value props */}
          <div className="min-w-0">
            <RevealGroup stagger={0.06}>
              {page.features.map((f, i) => (
                <RevealItem key={f.title}>
                  <div className="grid gap-2 border-t border-line py-7 sm:grid-cols-[64px_1fr] sm:gap-6">
                    <span className="font-mono text-2xl font-bold text-blue">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-lg font-bold text-ink">{f.title}</h3>
                      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-ink-dim">{f.copy}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <div className="border-t border-line" />
          </div>

          {/* Sticky pricing — stays put while they scroll the reasons.
              Individuals get the ₹99 pre-book offer card; other audiences keep
              their plan card. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            {page.slug === 'individuals' ? (
              <LaunchOfferCard variant="rail" />
            ) : (
            <div className="gradient-border relative overflow-hidden rounded-2xl border border-transparent bg-panel p-7 shadow-card">
              {page.pricing.popular && (
                <span className="absolute right-4 top-4">
                  <Badge tone="blue">Most popular</Badge>
                </span>
              )}
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">{page.pricing.name}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-mono text-5xl font-bold text-ink">{page.pricing.price}</span>
              </div>
              <p className="mt-1.5 text-[13px] text-ink-dim">{page.pricing.priceNote}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-ink-dim">
                {page.pricing.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-0.5 font-mono text-blue">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Button to={page.pricing.cta.to} arrow className="mt-6 w-full">
                {page.pricing.cta.label}
              </Button>
              <p className="mt-3 text-center text-[11.5px] text-ink-faint">
                Questions first?{' '}
                <Link to="/contact" className="text-blue hover:underline">
                  Talk to us →
                </Link>
              </p>
            </div>
            )}
          </aside>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
