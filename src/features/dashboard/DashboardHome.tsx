import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { usePurchases } from './api';
import { formatMoney } from '@/lib/money';

export default function DashboardHome() {
  const { data: purchases, isLoading } = usePurchases();
  const count = purchases?.length ?? 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Modules owned" value={isLoading ? '—' : String(count)} />
        <Stat label="Active track" value="PD · DV" />
        <Stat label="Plan" value="Founding" />
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your modules</h2>
          <Link to="/dashboard/purchases" className="text-sm text-blue hover:underline">
            View all →
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-line bg-panel-raised" />
            ))}
          </div>
        ) : count === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center">
            <p className="text-ink-dim">You haven't purchased any modules yet.</p>
            <Button to="/modules" className="mt-5" arrow>
              Browse the marketplace
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {purchases!.slice(0, 4).map((p) => (
              <div key={p.id} className="rounded-2xl border border-line bg-panel p-5 shadow-card">
                <p className="font-mono text-[11px] uppercase tracking-wider text-blue">
                  {p.module.domain.name}
                </p>
                <h3 className="mt-2 font-semibold text-ink">{p.module.title}</h3>
                <p className="mt-1 text-sm text-ink-dim">
                  {Math.round(p.module.durationMin / 60)}h · {p.module.level}
                </p>
                <p className="mt-3 font-mono text-xs text-ink-faint">
                  Purchased for {formatMoney(p.pricePaidMinor, p.currency)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-panel p-6 shadow-card">
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">{label}</p>
      <p className="mt-2 font-mono text-2xl font-bold text-gradient">{value}</p>
    </div>
  );
}
