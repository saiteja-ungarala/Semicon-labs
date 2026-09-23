import { Badge } from '@semiconlabs/web';

export const Tones = () => (
  <div className="flex flex-wrap items-center gap-2.5">
    <Badge tone="blue">Enrolling</Badge>
    <Badge tone="sky">New</Badge>
    <Badge tone="navy">Most Popular</Badge>
    <Badge tone="neutral">Coming soon</Badge>
  </div>
);

export const PassFail = () => (
  <div className="flex flex-wrap items-center gap-2.5">
    <Badge tone="pass">Timing met</Badge>
    <Badge tone="fail">Setup violation</Badge>
  </div>
);
