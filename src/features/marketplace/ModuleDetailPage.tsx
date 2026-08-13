import { useNavigate, useParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { RouteFallback } from '@/components/feedback/RouteFallback';
import { formatMoney, netPriceMinor } from '@/lib/money';
import { breadcrumbSchema, courseSchema } from '@/lib/seo';
import { DifficultyDots, LabTypeBadge, ToolBadge } from '@/components/curriculum/CurriculumBits';
import { useModuleTestcases, type Testcase } from '@/features/curriculum/api';
import { useModule } from './api';

/** How many testcases stay fully readable before the locked treatment. */
const FREE_PREVIEW = 3;

function TestcaseRow({
  tc,
  index,
  locked,
}: {
  tc: Testcase;
  index: number;
  locked: boolean;
}) {
  return (
    <li
      className={
        locked
          ? 'relative select-none border-b border-line px-5 py-4 last:border-b-0'
          : 'border-b border-line px-5 py-4 last:border-b-0'
      }
      aria-hidden={locked || undefined}
    >
      <div className={locked ? 'blur-[3px] opacity-60' : undefined}>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="font-mono text-[11px] text-ink-faint">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-sm font-semibold text-ink">{tc.title}</span>
          <LabTypeBadge type={tc.labType} />
          {tc.verifiable && (
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-blue" title="Objectively validated">
              ✓ verifiable
            </span>
          )}
        </div>
        <p className="mt-1.5 line-clamp-2 pl-7 text-[13px] leading-relaxed text-ink-dim">{tc.scenario}</p>
        {/* Difficulty only — per-scenario durations are deliberately not shown;
            hours are quoted at skill and module level instead. */}
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 pl-7">
          <DifficultyDots level={tc.difficulty} />
        </div>
      </div>
      {locked && (
        <span aria-hidden className="absolute right-5 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-faint">
          🔒
        </span>
      )}
    </li>
  );
}

export default function ModuleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: module, isLoading, isError } = useModule(slug);
  const { data: tcData } = useModuleTestcases(slug);

  if (isLoading) return <RouteFallback />;
  if (isError || !module) {
    return (
      <Section>
        <div className="rounded-2xl border border-dashed border-line py-24 text-center">
          <p className="text-ink-dim">This module could not be found.</p>
          <Button to="/modules" variant="ghost" className="mt-6">
            Back to modules
          </Button>
        </div>
      </Section>
    );
  }

  const net = netPriceMinor(module.priceMinor, module.discountMinor);
  const path = `/modules/${module.slug}`;

  return (
    <>
      <Seo
        title={module.title}
        description={module.subtitle ?? module.description.slice(0, 155)}
        path={path}
        type="product"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Modules', path: '/modules' },
            { name: module.title, path },
          ]),
          courseSchema({ name: module.title, description: module.description, path }),
        ]}
      />
      <PageHero
        eyebrow={`${module.domain.name}${module.skill ? ` · ${module.skill.name}` : ''} · ${module.level}`}
        title={module.title}
        lede={module.subtitle ?? undefined}
        crumbs={
          module.skill
            ? [
                { name: 'Home', to: '/' },
                { name: 'Domains', to: '/domains' },
                { name: module.domain.name, to: `/domains/${module.domain.slug}` },
                { name: module.skill.name, to: `/domains/${module.domain.slug}/skills/${module.skill.slug}` },
                { name: module.title },
              ]
            : [{ name: 'Home', to: '/' }, { name: 'Modules', to: '/modules' }, { name: module.title }]
        }
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Main */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">{module.difficulty}</Badge>
              <Badge tone="neutral">{Math.round(module.durationMin / 60)} hours</Badge>
              {module._count && <Badge tone="sky">{module._count.challenges} real world scenarios</Badge>}
              <ToolBadge tool={module.toolVendor ?? null} />
            </div>

            <h2 className="mt-7 text-2xl font-bold">What you'll work on</h2>
            <p className="mt-3 text-pretty text-ink-dim">{module.description}</p>

            {/* ---- The real world scenarios: full inventory, locked until owned ---- */}
            {tcData && tcData.testcases.length > 0 && (
              <div className="mt-10">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="text-2xl font-bold">
                    Inside this module — {tcData.testcases.length} real world scenarios
                  </h2>
                  {!module.owned && (
                    <span className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                      Previewing {Math.min(FREE_PREVIEW, tcData.testcases.length)} of {tcData.testcases.length}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-ink-dim">
                  Every real world scenario is a real failure from a live flow — not a textbook exercise. You solve it in the
                  actual tool, and the platform verifies your fix objectively.
                </p>
                <div className="relative mt-5 overflow-hidden rounded-2xl border border-line bg-panel">
                  <ul>
                    {tcData.testcases.map((tc, i) => (
                      <TestcaseRow key={tc.slug} tc={tc} index={i} locked={!module.owned && i >= FREE_PREVIEW} />
                    ))}
                  </ul>
                  {!module.owned && tcData.testcases.length > FREE_PREVIEW && (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-44 items-end justify-center bg-gradient-to-t from-panel via-panel/90 to-transparent pb-6">
                      <div className="pointer-events-auto text-center">
                        <p className="text-sm font-bold text-ink">
                          {tcData.testcases.length - FREE_PREVIEW} more real world scenarios are waiting inside.
                        </p>
                        <Button
                          onClick={() => navigate(`/checkout?module=${module.slug}`)}
                          className="mt-3"
                          arrow
                        >
                          Unlock all {tcData.testcases.length} real world scenarios — {formatMoney(net, module.currency)}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {module.competencies.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold">Modules you'll build</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {module.competencies.map((c) => (
                    <div key={c.slug} className="rounded-xl border border-line bg-panel/60 p-5">
                      <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                        <span aria-hidden className="font-mono text-sky">
                          ›
                        </span>
                        {c.name}
                      </div>
                      {c.summary && <p className="mt-2 text-[13.5px] text-ink-dim">{c.summary}</p>}
                    </div>
                  ))}
                </div>
              </>
            )}

            {module.reviews.length > 0 && (
              <>
                <h2 className="mt-10 text-2xl font-bold">What learners say</h2>
                <div className="mt-4 space-y-4">
                  {module.reviews.map((r) => (
                    <figure key={r.id} className="rounded-xl border border-line bg-panel/60 p-5">
                      <div className="text-sm text-blue" aria-label={`${r.rating} of 5`}>
                        {'★'.repeat(r.rating)}
                      </div>
                      {r.title && <figcaption className="mt-2 font-semibold text-ink">{r.title}</figcaption>}
                      {r.body && <blockquote className="mt-1 text-sm text-ink-dim">{r.body}</blockquote>}
                      <p className="mt-2 font-mono text-xs text-ink-faint">
                        {[r.user.firstName, r.user.lastName].filter(Boolean).join(' ') || 'Verified learner'}
                      </p>
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Purchase card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="gradient-border rounded-2xl border border-transparent bg-panel p-7 shadow-card">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-ink">{formatMoney(net, module.currency)}</span>
                {module.discountMinor > 0 && (
                  <span className="font-mono text-sm text-ink-faint line-through">
                    {formatMoney(module.priceMinor, module.currency)}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-ink-dim">One-time purchase · lifetime access</p>

              {module.owned ? (
                <Button to="/dashboard" className="mt-6 w-full" arrow>
                  Go to your dashboard
                </Button>
              ) : (
                <Button
                  onClick={() => navigate(`/checkout?module=${module.slug}`)}
                  className="mt-6 w-full"
                  arrow
                >
                  Buy this module
                </Button>
              )}

              <ul className="mt-6 space-y-2.5 border-t border-line pt-6 text-sm text-ink-dim">
                {[
                  'Objective validation on every submission',
                  'Same reports & logs as a real project',
                  'Lifetime access — yours forever',
                  '7-day money-back guarantee',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span aria-hidden className="mt-0.5 font-mono text-blue">
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {module.instructor && (
                <div className="mt-6 border-t border-line pt-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">Instructor</p>
                  <p className="mt-2 text-sm font-semibold text-ink">
                    {[module.instructor.firstName, module.instructor.lastName].filter(Boolean).join(' ')}
                  </p>
                  {module.instructor.headline && (
                    <p className="text-xs text-ink-dim">{module.instructor.headline}</p>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
