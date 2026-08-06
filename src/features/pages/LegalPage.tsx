import { Link } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { legalBlurb, legalDocs, type LegalKind } from '@/data/legal';
import { breadcrumbSchema } from '@/lib/seo';

const ORDER: LegalKind[] = ['terms', 'privacy', 'refund'];

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = legalDocs[kind];
  const path = `/${kind}`;
  const others = ORDER.filter((k) => k !== kind);

  return (
    <>
      <Seo
        title={doc.title}
        description={doc.description}
        path={path}
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: doc.title, path }])]}
      />
      <PageHero
        eyebrow="legal"
        title={doc.title}
        crumbs={[{ name: 'Home', to: '/' }, { name: doc.title }]}
      >
        <p className="font-mono text-xs text-ink-faint">Last updated: {doc.updated}</p>
      </PageHero>

      <Section>
        <div className="mx-auto max-w-prose">
          <p className="text-pretty text-lg text-ink-dim">{doc.intro}</p>

          <div className="mt-10 space-y-8">
            {doc.sections.map((section, s) => (
              <div key={section.heading || `cont-${s}`} className={section.heading ? '' : '-mt-4'}>
                {section.heading && <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>}
                <div className={section.heading ? 'mt-3 space-y-3' : 'space-y-3'}>
                  {section.body.map((para, i) => (
                    <p key={i} className="text-pretty text-[15px] leading-relaxed text-ink-dim">
                      {para}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-dim">
                        <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-blue/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Every policy points at the other two, so no page is a dead end */}
          <div className="mt-14 border-t border-line pt-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              Read next
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {others.map((k) => (
                <Link
                  key={k}
                  to={`/${k}`}
                  className="group rounded-2xl border border-line bg-panel p-5 transition-all hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-card"
                >
                  <span className="flex items-center gap-1.5 text-[15px] font-bold text-ink transition-colors group-hover:text-blue">
                    {legalDocs[k].title}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="mt-1.5 block text-[13.5px] leading-snug text-ink-dim">{legalBlurb[k]}</span>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-[13.5px] text-ink-dim">
              Questions about this policy?{' '}
              <Link to="/contact" className="font-semibold text-blue hover:underline">
                Contact us
              </Link>
              {kind === 'privacy' && (
                <>
                  {' '}
                  or write to our Data Protection Officer at{' '}
                  <a href="mailto:dpo@semiconlabs.com" className="font-semibold text-blue hover:underline">
                    dpo@semiconlabs.com
                  </a>
                </>
              )}
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
