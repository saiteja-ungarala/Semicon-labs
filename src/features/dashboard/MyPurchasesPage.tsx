import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { usePurchases } from './api';
import { formatMoney } from '@/lib/money';

export default function MyPurchasesPage() {
  const { data: purchases, isLoading, isError } = usePurchases();

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">My purchases</h2>

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-panel-raised" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-ink-dim">Couldn't load your purchases. Please refresh.</p>
      ) : !purchases || purchases.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-ink-dim">No modules yet — your purchases will appear here.</p>
          <Button to="/modules" className="mt-5" arrow>
            Browse modules
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-6 shadow-card sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-ink">{p.module.title}</h3>
                  <Badge tone="blue">{p.module.domain.code}</Badge>
                </div>
                {p.module.subtitle && <p className="mt-1 text-sm text-ink-dim">{p.module.subtitle}</p>}
                <p className="mt-2 font-mono text-xs text-ink-faint">
                  {Math.round(p.module.durationMin / 60)}h · {p.module.level} · purchased{' '}
                  {new Date(p.grantedAt).toLocaleDateString()} · {formatMoney(p.pricePaidMinor, p.currency)}
                </p>
              </div>
              <div className="flex shrink-0 gap-3">
                <Link
                  to={`/modules/${p.module.slug}`}
                  className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink-dim transition hover:border-blue/50 hover:text-ink"
                >
                  View details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-8 rounded-xl border border-line bg-panel-raised p-4 text-sm text-ink-dim">
        The interactive challenge workspace arrives with the learning platform (Phase 2). Your owned
        modules and progress carry over automatically.
      </p>
    </div>
  );
}
