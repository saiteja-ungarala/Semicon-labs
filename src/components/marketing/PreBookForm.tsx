import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * ₹99 pre-book capture. We collect the lead here and hand off to checkout —
 * payment integration itself is handled by the client's team, so this form
 * deliberately stops at the handoff and stashes the details for that step.
 */

interface PreBookFields {
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

const inputCls = (bad: boolean) =>
  cn(
    'w-full rounded-lg border bg-void-2 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none',
    bad ? 'border-danger/60 focus:border-danger' : 'border-line focus:border-blue/60',
  );

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function PreBookForm() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreBookFields>({ defaultValues: { source: SOURCES[0] } });

  const onSubmit = handleSubmit(async (data) => {
    setSending(true);
    // Kept for the checkout step the client's team owns — they read it from
    // here rather than asking the buyer for the same four fields again.
    sessionStorage.setItem('sl-prebook', JSON.stringify({ ...data, plan: 'individual-launch' }));
    navigate('/checkout?plan=individual-launch');
  });

  return (
    <div id="pre-book" className="mx-auto mt-16 max-w-3xl scroll-mt-28">
      <div className="gradient-border rounded-3xl border border-transparent bg-panel p-7 shadow-card sm:p-9">
        <p className="eyebrow text-blue">pre-book your seat</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          Pay just ₹99 to pre-book your spot and unlock 200 lab hours at the price of 100.
        </h3>
        <p className="mt-3 text-[14.5px] text-ink-dim">
          Tell us where to reach you and we'll take you straight to checkout.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}>
            <input
              {...register('name', { required: 'Please tell us your name' })}
              className={inputCls(!!errors.name)}
              placeholder="Your full name"
              autoComplete="name"
            />
          </Field>

          <Field label="Contact number" error={errors.contact?.message}>
            <input
              type="tel"
              inputMode="numeric"
              {...register('contact', {
                required: 'We need a contact number',
                pattern: { value: /^[+\d][\d\s-]{7,15}$/, message: 'Enter a valid phone number' },
              })}
              className={inputCls(!!errors.contact)}
              placeholder="10-digit mobile number"
              autoComplete="tel"
            />
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <input
              type="email"
              {...register('email', {
                required: 'We need an email to send your receipt',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
              })}
              className={inputCls(!!errors.email)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </Field>

          <Field label="How did you get to know about us?" error={errors.source?.message}>
            <select {...register('source', { required: true })} className={inputCls(false)}>
              {SOURCES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <Button type="submit" arrow={!sending} disabled={sending} className="w-full sm:w-auto">
              {sending ? 'Taking you to checkout…' : 'Continue to payment — ₹99'}
            </Button>
            <p className="mt-3 text-[12.5px] text-ink-dim">
              Fully redeemable on your first purchase.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
