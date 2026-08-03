import { useState } from 'react';
import { Section, SectionHead } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { sampleChallenges, type ChallengeDomain } from '@/data/challenges';
import { cn } from '@/lib/cn';

type Filter = 'all' | ChallengeDomain;

const filters: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All Challenges' },
  { key: 'PD', label: 'Physical Design' },
  { key: 'DV', label: 'Design Verification' },
];

const levelTone = { Guided: 'neutral', Independent: 'blue', Assessment: 'sky' } as const;

/**
 * Filterable sample challenges — the company site's "Projects" pattern
 * (Challenge → Solution → Result) repurposed as Problem → Investigation →
 * Outcome, using the brief's real-project examples.
 */
export function SampleChallenges() {
  const [filter, setFilter] = useState<Filter>('all');
  const visible = sampleChallenges.filter((c) => filter === 'all' || c.domain === filter);

  return (
    <Section id="challenges" alt>
      <SectionHead
        eyebrow="what you'll actually solve"
        title="Real challenges, straight from industry."
        lede="Every challenge starts with a failure you have to investigate — not a tutorial to follow. Here's a sample."
      />

      <Reveal>
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition',
                filter === f.key
                  ? 'border-blue bg-blue text-white'
                  : 'border-line text-ink-dim hover:border-ink-dim hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <article
            key={c.id}
            className="flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-card transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-blue">
                {c.domainName} · {c.skill}
              </span>
              <Badge tone={levelTone[c.level]}>{c.level}</Badge>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-ink">{c.title}</h3>

            <dl className="mt-4 space-y-3 text-sm">
              <Step label="Problem" text={c.problem} />
              <Step label="Investigation" text={c.investigation} />
            </dl>

            <div className="mt-auto border-t border-line pt-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">Outcome</p>
              <p className="mt-1 text-sm text-ink">{c.outcome}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button to="/modules" arrow>
          Browse all modules
        </Button>
      </div>
    </Section>
  );
}

function Step({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{label}</dt>
      <dd className="mt-1 text-ink-dim">{text}</dd>
    </div>
  );
}
