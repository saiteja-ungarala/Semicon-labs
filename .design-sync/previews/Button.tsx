import { Button } from '@semiconlabs/web';

export const Variants = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button variant="primary">Get Started</Button>
    <Button variant="secondary">View Pricing</Button>
    <Button variant="ghost">Learn more</Button>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="sm">Small</Button>
    <Button size="md">Medium</Button>
    <Button size="lg">Large</Button>
  </div>
);

export const WithArrow = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button size="lg" arrow>Explore now</Button>
    <Button size="lg" variant="secondary" arrow>Start with VLSI Launch Pad</Button>
  </div>
);

export const Disabled = () => (
  <div className="flex flex-wrap items-center gap-3">
    <Button disabled>Unavailable</Button>
    <Button variant="secondary" disabled>Coming soon</Button>
  </div>
);
