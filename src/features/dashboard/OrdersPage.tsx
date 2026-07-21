import { Badge } from '@/components/ui/Badge';
import { useOrders } from './api';
import { formatMoney } from '@/lib/money';

const statusTone: Record<string, 'blue' | 'pass' | 'fail' | 'neutral'> = {
  PAID: 'pass',
  PENDING: 'neutral',
  CREATED: 'neutral',
  FAILED: 'fail',
  REFUNDED: 'blue',
  CANCELLED: 'fail',
};

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders();

  return (
    <div>
      <h2 className="mb-6 text-xl font-bold">Orders &amp; invoices</h2>

      {isLoading ? (
        <div className="h-40 animate-pulse rounded-2xl border border-line bg-panel-raised" />
      ) : isError ? (
        <p className="text-ink-dim">Couldn't load your orders. Please refresh.</p>
      ) : !orders || orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-ink-dim">No orders yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-line bg-panel shadow-card">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-line text-left font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line/60 last:border-0">
                  <td className="px-5 py-4 font-mono text-xs text-ink">{o.orderNumber}</td>
                  <td className="px-5 py-4 text-ink-dim">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-ink-dim">{o.items.length}</td>
                  <td className="px-5 py-4 font-mono text-ink">{formatMoney(o.totalMinor, o.currency)}</td>
                  <td className="px-5 py-4">
                    <Badge tone={statusTone[o.status] ?? 'neutral'}>{o.status}</Badge>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-ink-dim">
                    {o.invoice?.invoiceNumber ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
