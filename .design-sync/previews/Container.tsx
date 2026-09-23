import { Container } from '@semiconlabs/web';

export const Default = () => (
  <Container>
    <div className="rounded-2xl border border-dashed border-line-strong bg-panel p-8 text-center">
      <p className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">container</p>
      <p className="mt-2 text-sm text-ink-dim">
        Caps page width and applies the gutters every section shares.
      </p>
    </div>
  </Container>
);
