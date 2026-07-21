import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { blogPosts } from '@/data/blog';
import { breadcrumbSchema } from '@/lib/seo';

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const categoryTone = {
  'Physical Design': 'blue',
  'Design Verification': 'sky',
  Careers: 'navy',
  Platform: 'neutral',
} as const;

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <Seo
        title="Blog"
        description="Field notes on Physical Design, Design Verification, and building engineering judgment in the AI era — from the Semicon Labs team."
        path="/blog"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])]}
      />
      <PageHero
        eyebrow="field notes"
        title="Engineering judgment, written down."
        lede="Practical thinking on timing closure, verification, careers, and the platform — the way an engineer would explain it to a teammate."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Blog' }]}
      />
      <Section>
        {/* Featured post */}
        <article className="gradient-border mb-10 grid gap-6 rounded-2xl border border-transparent bg-panel/70 p-7 sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Badge tone={categoryTone[featured.category]}>{featured.category}</Badge>
              <span className="font-mono text-xs text-ink-faint">
                {dateFmt.format(new Date(featured.publishedAt))} · {featured.readingMinutes} min read
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-ink sm:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-pretty text-ink-dim">{featured.excerpt}</p>
            <p className="mt-5 font-mono text-sm text-blue-400">Read the article →</p>
          </div>
          <div className="hidden h-full min-h-[180px] rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(46,30,224,0.20),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(67,97,255,0.16),transparent_55%)] lg:block" />
        </article>

        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
          {rest.map((post) => (
            <RevealItem key={post.slug}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-panel/60 p-6 transition-all hover:-translate-y-1 hover:border-blue/40">
                <Badge tone={categoryTone[post.category]}>{post.category}</Badge>
                <h3 className="mt-4 text-lg font-semibold text-ink">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-dim">{post.excerpt}</p>
                <p className="mt-5 font-mono text-xs text-ink-faint">
                  {dateFmt.format(new Date(post.publishedAt))} · {post.readingMinutes} min read
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-12 text-center text-sm text-ink-faint">
          Full articles and a subscribe option arrive with the CMS in the next release.
        </p>
      </Section>
    </>
  );
}
