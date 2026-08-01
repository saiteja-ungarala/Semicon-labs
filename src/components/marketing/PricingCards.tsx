import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { pricingPlans } from '@/data/marketing';
import { PlanCompareModal, type ComparePlanId } from './PlanCompareModal';

/**
 * Three-tier pricing grid, reused on Home and the Pricing page.
 * Individual & Team open the Basic/Pro comparison popup; Corporate goes to sales.
 */
export function PricingCards() {
  const [compare, setCompare] = useState<ComparePlanId | null>(null);

  return (
    <>
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              'group relative flex flex-col rounded-2xl border bg-panel/70 p-6 transition-all duration-500 hover:-translate-y-1.5',
              plan.featured
                ? 'border-blue/60 shadow-glow hover:shadow-blue/20'
                : 'border-line hover:border-blue/40 hover:shadow-xl',
            )}
          >
            {plan.featured && (
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue/[0.08] to-transparent" />
            )}
            {plan.badge && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue px-3.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                {plan.badge}
              </span>
            )}
            <div className="relative z-10 mt-1 text-center">
              <p className="text-lg font-bold tracking-tight text-blue">{plan.name}</p>

              <div className="mt-3 flex items-end justify-center gap-2">
                {plan.priceStrikeMonthly && (
                  <span className="mb-1.5 font-mono text-sm text-ink-faint line-through">
                    ₹{plan.priceStrikeMonthly.toLocaleString('en-IN')}
                  </span>
                )}
                <span
                  className={cn(
                    'font-bold text-ink transition-colors group-hover:text-blue-600',
                    plan.id === 'corporate' ? 'text-2xl' : 'font-mono text-4xl',
                  )}
                >
                  {plan.id === 'corporate' ? 'Custom Pricing' : `₹${plan.priceMonthly.toLocaleString('en-IN')}`}
                </span>
              </div>

              <p className="mt-2 flex min-h-[32px] items-center justify-center text-[12.5px] font-medium text-ink-dim">
                {plan.tagline}
              </p>
            </div>

            <ul className="relative z-10 mt-5 flex-1 space-y-2.5 border-t border-line pt-5">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="group/item relative flex items-start gap-2.5 text-[13.5px] text-ink-dim transition-colors hover:text-ink"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-soft text-[9.5px] font-bold text-blue transition-transform duration-300 group-hover/item:scale-125 group-hover/item:bg-blue group-hover/item:text-white"
                  >
                    ✓
                  </span>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="relative z-10 mt-7">
              {plan.id === 'corporate' ? (
                <Button to="/contact" variant="secondary" className="w-full transition-all duration-300 hover:bg-blue hover:text-white">
                  Contact Sales
                </Button>
              ) : (
                <Button
                  onClick={() => setCompare(plan.id as ComparePlanId)}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  arrow={plan.featured}
                  className={cn(
                    'w-full transition-all duration-300',
                    plan.featured ? 'shadow-md hover:shadow-lg hover:shadow-blue/30' : 'hover:bg-blue hover:text-white',
                  )}
                >
                  Get Started
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <PlanCompareModal plan={compare} onClose={() => setCompare(null)} />
    </>
  );
}
