import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/motion/Reveal';
import { audiences, type AudienceIcon } from '@/data/audiences';

function AudienceGlyph({ icon }: { icon: AudienceIcon }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (icon) {
    case 'individual':
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        </svg>
      );
    case 'team':
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}>
          <circle cx="9" cy="9" r="3.2" />
          <path d="M3 19c0-2.8 2.7-5 6-5s6 2.2 6 5" />
          <path d="M16 5.5a3 3 0 0 1 0 6M17 14c2.4.4 4 2.4 4 5" />
        </svg>
      );
    case 'enterprise':
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" {...common}>
          <path d="M4 21V5l8-2v18M12 21V9l8 2v10M4 21h16" />
          <path d="M8 8v.01M8 12v.01M16 13v.01M16 16v.01" />
        </svg>
      );
  }
}

interface WhoWeServeProps {
  /** Show the fuller layout (used on the dedicated page). */
  detailed?: boolean;
}

/** Audience-to-plan grid — the client reference's "Who We Serve" pattern. */
export function WhoWeServe({ detailed = false }: WhoWeServeProps) {
  return (
    <RevealGroup className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3" stagger={0.08}>
      {audiences.map((a) => (
        <RevealItem key={a.slug}>
          <div
            id={a.slug}
            className="flex h-full scroll-mt-28 flex-col rounded-2xl border border-line bg-panel p-7 shadow-card transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-soft text-blue">
              <AudienceGlyph icon={a.icon} />
            </span>
            <div className="mt-5 flex items-center gap-2">
              <h3 className="text-lg font-bold text-ink">{a.title}</h3>
            </div>
            <Badge tone="blue" className="mt-2 self-start">
              {a.planLabel}
            </Badge>
            <p className="mt-3 text-sm text-ink-dim">{a.summary}</p>

            {detailed && (
              <ul className="mt-4 space-y-2">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-[13.5px] text-ink-dim">
                    <span aria-hidden className="mt-0.5 font-mono text-blue">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            )}

            <Link
              to={a.cta.to}
              className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-blue transition hover:gap-2.5"
            >
              {a.cta.label} <span aria-hidden className="transition-transform">→</span>
            </Link>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
