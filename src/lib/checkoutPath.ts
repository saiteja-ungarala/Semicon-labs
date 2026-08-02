import { useLocation } from 'react-router-dom';

/**
 * Funnel order is fixed: any pricing / plan CTA sends people to the Pricing
 * page first, and only from there on to registration.
 *
 *   anywhere else  →  /pricing
 *   on /pricing    →  /register?plan=…
 *
 * Components call this instead of hard-coding a register link so a plan button
 * can live on the homepage, a domain page or Who-We-Serve without ever
 * skipping the pricing step.
 */
export function usePlanHref() {
  const { pathname } = useLocation();
  const onPricingPage = pathname === '/pricing';
  return (registerTarget: string) => (onPricingPage ? registerTarget : '/pricing');
}
