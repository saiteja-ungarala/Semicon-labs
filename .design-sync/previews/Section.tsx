import { Section } from '@semiconlabs/web';

export const Default = () => (
  <Section>
    <h2 className="text-display-md font-extrabold text-ink">Everything in one place</h2>
    <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-dim">
      Section owns the vertical rhythm and the container width every page block sits in.
    </p>
  </Section>
);

export const AltBackground = () => (
  <Section alt>
    <h2 className="text-display-md font-extrabold text-ink">Alternate wash</h2>
    <p className="mt-4 max-w-[60ch] leading-relaxed text-ink-dim">
      The <code className="font-mono text-blue">alt</code> background alternates between
      consecutive sections so the page reads as bands.
    </p>
  </Section>
);
