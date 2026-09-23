import { Modal, Button } from '@semiconlabs/web';

// Rendered open so the card shows the dialog itself rather than a trigger.
export const Open = () => (
  <Modal open onClose={() => {}} label="Buy the VLSI Launch pad">
    <div className="rounded-3xl bg-panel p-7">
      <h3 className="font-display text-xl font-bold text-ink">Reserve your seat</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-dim">
        10 lab hours, premium VLSI content and industry EDA tools for ₹499.
      </p>
      <Button className="mt-5 w-full" arrow>Continue to payment</Button>
    </div>
  </Modal>
);
