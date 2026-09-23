import { Reveal } from '@semiconlabs/web';

export const Default = () => (
  <Reveal>
    <div className="rounded-2xl border border-line bg-panel p-7 shadow-card">
      <h3 className="text-lg font-bold text-ink">Scroll-revealed block</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">
        Wraps any block so it fades and lifts in when it first enters the viewport.
      </p>
    </div>
  </Reveal>
);
