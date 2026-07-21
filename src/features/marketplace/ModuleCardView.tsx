import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/Badge';
import { formatMoney, netPriceMinor } from '@/lib/money';
import type { ModuleCard } from './api';

const levelTone = { BEGINNER: 'neutral', SPECIALIST: 'blue', EXPERT: 'sky' } as const;

export function ModuleCardView({ module }: { module: ModuleCard }) {
  const net = netPriceMinor(module.priceMinor, module.discountMinor);
  const hasDiscount = module.discountMinor > 0;

  return (
    <Link
      to={`/modules/${module.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-card transition-all hover:-translate-y-1 hover:border-blue/40 hover:shadow-card-hover"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(46,30,224,0.18),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(67,97,255,0.14),transparent_55%)]">
        {module.thumbnailUrl ? (
          <img
            src={module.thumbnailUrl}
            alt={module.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-blue/70">
              {module.domain.code}
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <Badge tone="neutral">{module.domain.name}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <Badge tone={levelTone[module.level]}>{module.level}</Badge>
          <span className="font-mono text-[11px] text-ink-faint">
            {Math.round(module.durationMin / 60)}h · {module.difficulty.toLowerCase()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-ink group-hover:text-blue">{module.title}</h3>
        {module.subtitle && <p className="mt-1.5 text-sm text-ink-dim">{module.subtitle}</p>}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {module.competencies.slice(0, 3).map((c) => (
            <span key={c.slug} className="rounded-full border border-line px-2 py-0.5 font-mono text-[10.5px] text-ink-dim">
              {c.name}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between pt-5">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xl font-bold text-ink">{formatMoney(net, module.currency)}</span>
            {hasDiscount && (
              <span className="font-mono text-xs text-ink-faint line-through">
                {formatMoney(module.priceMinor, module.currency)}
              </span>
            )}
          </div>
          {module.ratingCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-ink-dim">
              <span className="text-blue" aria-hidden>
                ★
              </span>
              {module.ratingAvg.toFixed(1)}
              <span className="text-ink-faint">({module.ratingCount})</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
