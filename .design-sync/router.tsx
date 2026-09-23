import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

/** Preview wrapper: Button, Logo, PageHero and DomainCard render react-router
 *  <Link>s, which throw outside a router. Designs built with the DS supply
 *  their own router; previews get this one. */
export function RouterShell({ children }: { children?: ReactNode }) {
  return <MemoryRouter>{children}</MemoryRouter>;
}
