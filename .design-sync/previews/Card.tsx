import { Card, Badge, Button } from '@semiconlabs/web';

export const Default = () => (
  <Card className="max-w-sm p-7">
    <Badge tone="blue">Enrolling</Badge>
    <h3 className="mt-3 text-xl font-bold text-ink">Physical Design</h3>
    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
      Floorplan, place &amp; route and timing closure on industry EDA tools.
    </p>
  </Card>
);

export const Gradient = () => (
  <Card gradient className="max-w-sm p-7">
    <h3 className="text-xl font-bold text-ink">VLSI Launch Pad</h3>
    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
      10 lab hours, premium content and industry EDA tools for ₹499.
    </p>
    <Button className="mt-5" arrow>Start now</Button>
  </Card>
);

export const Interactive = () => (
  <Card interactive className="max-w-sm p-7">
    <h3 className="text-xl font-bold text-ink">Design Verification</h3>
    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
      Testbenches, coverage closure and debug — hover to see the lift.
    </p>
  </Card>
);
