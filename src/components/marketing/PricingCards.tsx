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
            'group relative flex flex-col rounded-3xl border bg-panel/70 p-8 transition-all duration-500 hover:-translate-y-2',
            plan.featured
              ? 'border-blue/60 shadow-glow lg:-my-2 lg:scale-[1.02] hover:shadow-blue/20'
              : 'border-line hover:border-blue/40 hover:shadow-xl',
          )}
        >
          {plan.featured && (
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue/[0.08] to-transparent pointer-events-none" />
          )}
          {plan.badge && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-white shadow-md">
              {plan.badge}
            </span>
          )}
          <div className="relative z-10 text-center mt-2">
            <p className="text-xl font-bold tracking-tight text-blue">{plan.name}</p>
            
            <div className="mt-5 flex items-end justify-center gap-2">
              {plan.priceStrikeMonthly && (
                <span className="mb-2 font-mono text-sm text-ink-faint line-through">
                  ₹{plan.priceStrikeMonthly.toLocaleString('en-IN')}
                </span>
              )}
              <span className={cn(
                "font-bold text-ink transition-colors group-hover:text-blue-600",
                plan.id === 'corporate' ? "text-3xl" : "font-mono text-5xl"
              )}>
                {plan.id === 'corporate' ? 'Custom Pricing' : `₹${plan.priceMonthly.toLocaleString('en-IN')}`}
              </span>
            </div>
            
            <p className="mt-3 text-[13px] font-medium text-ink-dim min-h-[40px] flex items-center justify-center">
              {plan.tagline}
            </p>
          </div>

          <ul className="mt-8 flex-1 space-y-4 relative z-10">
            {plan.features.map((feature) => (
              <li key={feature} className="group/item relative flex items-start gap-3 text-[14.5px] text-ink-dim transition-colors hover:text-ink">
                <span aria-hidden className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-soft text-[10px] font-bold text-blue transition-transform duration-300 group-hover/item:scale-125 group-hover/item:bg-blue group-hover/item:text-white">
                  ✓
                </span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="relative z-10 mt-10">
            <Button
              to={plan.cta.to}
              variant={plan.featured ? 'primary' : 'secondary'}
              arrow={plan.featured}
              className={cn(
                "w-full transition-all duration-300",
                plan.featured ? "shadow-md hover:shadow-lg hover:shadow-blue/30" : "hover:bg-blue hover:text-white"
              )}
            >
              {plan.cta.label}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
