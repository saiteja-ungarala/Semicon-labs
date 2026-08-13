import { Link, Navigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { CorporateEnquiryForm } from '@/components/marketing/CorporateEnquiryForm';
import { Section, SectionHead } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { LaunchOfferCard } from '@/components/marketing/LaunchOfferCard';
import { FinalCta } from '@/features/home/sections/FinalCta';
import { audiencePages } from '@/data/audiencePages';
import { cn } from '@/lib/cn';
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

        {/* Full-bleed so the row can exceed the 1200px page container: a 512px
            offer card alongside the content needs more room than that. */}
      <Section bleed>
        <div className="mx-auto w-full max-w-content px-5 sm:px-6 lg:px-8 xl:max-w-[1400px]">
        <SectionHead eyebrow={page.sectionEyebrow} title={page.sectionTitle} lede={page.sectionLede} />
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_512px] xl:gap-14">
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
              <div className="mx-auto w-full max-w-lg">
                <LaunchOfferCard variant="full" />
              </div>
            ) : (
            <div className="gradient-border relative overflow-hidden rounded-2xl border border-transparent bg-panel p-7 shadow-card">
              {page.pricing.popular && (
                <span className="absolute right-4 top-4">
                  <Badge tone="blue">Most popular</Badge>
                </span>
              )}
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">{page.pricing.name}</p>

              {page.pricing.tiers ? (
                <>
                  {/* Two tiers side by side: the column is too narrow for the
                      pricing page's full cards, but the numbers must match it. */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {page.pricing.tiers.map((t) => (
                      <div
                        key={t.name}
                        className={cn(
                          'rounded-xl border p-4',
                          t.highlight ? 'border-blue/40 bg-blue-soft/40' : 'border-line bg-void-2/60',
                        )}
                      >
                        <p
                          className={cn(
                            'font-mono text-[10.5px] font-bold uppercase tracking-[0.14em]',
                            t.highlight ? 'text-blue' : 'text-ink-faint',
                          )}
                        >
                          {t.name}
                        </p>
                        <p className="mt-1.5 font-mono text-[26px] font-bold leading-none text-ink">{t.price}</p>
                        <p className="mt-1 text-[11px] leading-snug text-ink-faint">per session</p>
                        <p className="mt-1 text-[11px] leading-snug text-ink-dim">{t.note}</p>
                      </div>
                    ))}
                  </div>
                  {page.pricing.fineprint && (
                    <p className="mt-3 text-[11.5px] leading-snug text-ink-faint">{page.pricing.fineprint}</p>
                  )}
                </>
              ) : (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="font-mono text-5xl font-bold text-ink">{page.pricing.price}</span>
                  </div>
                  <p className="mt-1.5 text-[13px] text-ink-dim">{page.pricing.priceNote}</p>
                </>
              )}
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
        {page.slug === 'corporates' && <CorporateEnquiryForm />}
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
