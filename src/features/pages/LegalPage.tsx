import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { legalDocs, type LegalKind } from '@/data/legal';
import { breadcrumbSchema } from '@/lib/seo';

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = legalDocs[kind];
  const path = `/${kind}`;

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
          <div className="mt-10 space-y-10">
            {doc.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-semibold text-ink">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((para, i) => (
                    <p key={i} className="text-pretty text-[15px] leading-relaxed text-ink-dim">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
