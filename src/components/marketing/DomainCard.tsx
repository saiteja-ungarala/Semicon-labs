import { Link } from 'react-router-dom';
import { type Domain } from '@/data/curriculum';

/** Domain → Skills → Competencies tree card, reused on Home and Domains. */
export function DomainCard({ domain }: { domain: Domain }) {
  return (
    <div className="gradient-border h-full rounded-2xl border border-transparent bg-panel/70 p-7 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-blue-400">{domain.name}</h3>
          <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
            {domain.pipeline}
          </p>
        </div>
        <Link
          to={`/domains/${domain.slug}`}
          className="shrink-0 rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-ink-dim transition hover:border-blue/50 hover:text-ink"
        >
          Explore →
        </Link>
      </div>

      <div className="mt-6 space-y-0">
        {domain.skills.map((skill) => (
          <div key={skill.slug} className="border-t border-line py-4 first:border-t-0 first:pt-0">
            <div className="flex items-center gap-2 text-[15px] font-semibold text-ink">
              <span aria-hidden className="font-mono text-sky">
                ›
              </span>
              {skill.name}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5 pl-4">
              {skill.competencies.map((c) => (
                <span
                  key={c.slug}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-dim"
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
