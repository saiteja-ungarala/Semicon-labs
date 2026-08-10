import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * ₹99 pre-book capture, asked for in place rather than by sending the buyer to
 * a login page. We collect the four details, stash them for the checkout step
 * the client's team owns, then hand off to payment.
 */

interface Fields {
  name: string;
  contact: string;
  email: string;
  source: string;
}

const SOURCES = [
  'LinkedIn',
  'Instagram',
  'YouTube',
  'Facebook',
  'WhatsApp',
  'Friend or colleague',
  'College / institute',
  'Google search',
  'Other',
];

const field = (bad: boolean) =>
  cn(
    'w-full rounded-xl border bg-void-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition focus:outline-none',
    bad ? 'border-danger/60 focus:border-danger' : 'border-line focus:border-blue/60 focus:bg-panel',
  );

export function PreBookDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>({ defaultValues: { source: SOURCES[0] } });

  const onSubmit = handleSubmit((data) => {
    setSending(true);
    sessionStorage.setItem('sl-prebook', JSON.stringify({ ...data, plan: 'individual-launch' }));
    window.location.assign('/checkout?plan=individual-launch');
  });

  return (
    <Modal open={open} onClose={onClose} label="Pre-book your seat for ₹99">
      <div className="overflow-hidden rounded-3xl bg-panel shadow-card">
        {/* Offer header carries the price so the dialog stands on its own */}
        <div className="relative overflow-hidden bg-blue-600 px-7 py-6 text-white sm:px-9">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{ background: 'radial-gradient(120% 90% at 90% -20%, rgba(255,255,255,0.5), transparent 60%)' }}
          />
          <p className="relative font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/75">
            Limited launch offer · only 1,000 seats
          </p>
          <div className="relative mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-mono text-[40px] font-bold leading-none">₹99</span>
            <span className="pb-1 text-[14px] font-semibold text-white/90">
              unlocks <b>200 lab hours</b> at the price of 100
            </span>
          </div>
          <p className="relative mt-2 text-[12.5px] text-white/70">
            Fully redeemable on your first purchase.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-4 px-7 py-7 sm:grid-cols-2 sm:px-9">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Name</span>
            <input
              {...register('name', { required: 'Please tell us your name' })}
              className={field(!!errors.name)}
              placeholder="Ananya Sharma"
              autoComplete="name"
              autoFocus
            />
            {errors.name && <span className="mt-1.5 block text-xs text-danger">{errors.name.message}</span>}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Contact number</span>
            <input
              type="tel"
              inputMode="numeric"
              {...register('contact', {
                required: 'We need a contact number',
                pattern: { value: /^[+\d][\d\s-]{7,15}$/, message: 'Enter a valid phone number' },
              })}
              className={field(!!errors.contact)}
              placeholder="98765 43210"
              autoComplete="tel"
            />
            {errors.contact && <span className="mt-1.5 block text-xs text-danger">{errors.contact.message}</span>}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink">Email</span>
            <input
              type="email"
              {...register('email', {
                required: 'We need an email for your receipt',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className={field(!!errors.email)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="mt-1.5 block text-xs text-danger">{errors.email.message}</span>}
          </label>

          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium text-ink">How did you get to know about us?</span>
            <select {...register('source')} className={field(false)}>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <div className="sm:col-span-2">
            <Button type="submit" arrow={!sending} disabled={sending} className="h-12 w-full text-[15px]">
              {sending ? 'Taking you to payment…' : 'Pay now — ₹99'}
            </Button>
            <p className="mt-3 text-center text-[12px] text-ink-faint">
              Secure checkout · your seat is held as soon as payment clears.
            </p>
          </div>
        </form>
      </div>
    </Modal>
  );
}
