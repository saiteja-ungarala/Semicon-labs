import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { pricingPlans } from '@/data/marketing';

/** Three-tier pricing grid, reused on Home and the Pricing page. */
export function PricingCards() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {pricingPlans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            'relative flex flex-col rounded-2xl border bg-panel/70 p-8',
            plan.featured
              ? 'border-blue/60 shadow-glow lg:-my-2 lg:scale-[1.02]'
              : 'border-line',
          )}
        >
          {plan.badge && (
            <span className="absolute -top-3 left-8 rounded-full bg-blue px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-wider text-white">
              {plan.badge}
            </span>
          )}
          <p className="font-mono text-sm uppercase tracking-wider text-ink-dim">{plan.name}</p>
          <p className="mt-1 text-sm text-ink-faint">{plan.tagline}</p>

          <div className="mt-6 flex items-end gap-2">
            {plan.priceStrikeMonthly && (
              <span className="mb-2 font-mono text-sm text-ink-faint line-through">
                ${plan.priceStrikeMonthly}
              </span>
            )}
            <span className="font-mono text-4xl font-bold text-ink">
              {plan.priceMonthly === 0 ? '$0' : `$${plan.priceMonthly}`}
            </span>
            <span className="mb-1.5 font-mono text-sm text-ink-faint">/{plan.cadence}</span>
          </div>

          <ul className="mt-7 flex-1 space-y-3">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-dim">
                <span aria-hidden className="mt-0.5 font-mono text-pass">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <Button
            to={plan.cta.to}
            variant={plan.featured ? 'primary' : 'ghost'}
            arrow={plan.featured}
            className="mt-8 w-full"
          >
            {plan.cta.label}
          </Button>
        </div>
      ))}
    </div>
  );
}
