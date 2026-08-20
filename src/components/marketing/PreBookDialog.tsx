import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Seat capture, asked for in place rather than by sending the buyer to a login
 * page. We collect the four details, stash them for the checkout step the
 * client's team owns, then hand off to payment.
 *
 * `variant` changes wording only — the fields, validation and stored payload
 * are identical either way:
 *  - "prebook" (default) is the ₹99 flow on the home page, the individuals
 *    page and the domain pages.
 *  - "offer" is the same form opened from the Exclusive offers tab, where the
 *    client asked for the ₹99 not to appear at all.
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

export function PreBookDialog({
  open,
  onClose,
  variant = 'prebook',
}: {
  open: boolean;
  onClose: () => void;
  variant?: 'prebook' | 'offer';
}) {
  const offer = variant === 'offer';
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  // The address the link went to. Comparing it against the live field value is
  // what resets the button when the buyer edits their email — no effect needed.
  const [verifiedFor, setVerifiedFor] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<Fields>({ defaultValues: { source: SOURCES[0] } });

  const emailValue = (watch('email') ?? '').trim().toLowerCase();
  const verifySent = verifiedFor !== null && verifiedFor === emailValue;

  const onVerify = async () => {
    // Only the trigger lives here — the client's team owns sending the mail and
    // recording the confirmation. Wire that call in place of this handler.
    if (!(await trigger('email'))) return;
    setVerifiedFor(emailValue);
    console.info('Verify email requested:', emailValue);
  };

  const onSubmit = handleSubmit((data) => {
    setSending(true);
    // No payment gateway in the static build, so the seat is reserved as an
    // enquiry and the buyer is told someone will follow up. THIS is where the
    // payment call goes once a gateway is connected — the collected details
    // are already in `data`.
    // The plan tag is how the two entry points are told apart downstream.
    const payload = {
      ...data,
      emailVerifyRequested: verifySent,
      plan: offer ? 'launch-offer' : 'individual-launch',
    };
    sessionStorage.setItem('sl-prebook', JSON.stringify(payload));
    console.info('Pre-book request:', payload);
    setSending(false);
    setDone(true);
  });

  return (
    <Modal
      open={open}
      onClose={onClose}
      label={offer ? 'Claim the launch offer' : 'Pre-book your seat for ₹99'}
    >
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
            {offer ? (
              <>
                <span className="font-mono text-[40px] font-bold leading-none">200</span>
                <span className="pb-1 text-[14px] font-semibold text-white/90">
                  <b>lab hours</b> for the price of 100
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-[40px] font-bold leading-none">₹99</span>
                <span className="pb-1 text-[14px] font-semibold text-white/90">
                  unlocks <b>200 lab hours</b> at the price of 100
                </span>
              </>
            )}
          </div>
          <p className="relative mt-2 text-[12.5px] text-white/70">
            {offer
              ? 'Basic ₹9,000 · Pro ₹10,000 · excl. GST'
              : 'Fully redeemable on your first purchase.'}
          </p>
        </div>

        {done ? (
          <div className="px-7 py-10 text-center sm:px-9">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue/10 text-blue">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="mt-5 font-display text-[22px] font-bold text-ink">Your seat is reserved</h3>
            <p className="mx-auto mt-3 max-w-[46ch] text-pretty text-[14px] leading-relaxed text-ink-dim">
              Thanks — we have your details. Our team will contact you shortly with the payment link to{' '}
              {offer
                ? 'confirm your seat and unlock your 200 lab hours.'
                : 'confirm your ₹99 pre-book and unlock your 200 lab hours.'}
            </p>
            <Button onClick={onClose} variant="primary" className="mt-7 h-11 px-8">
              Done
            </Button>
          </div>
        ) : (
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

          <div className="sm:col-span-2">
            <label htmlFor="prebook-email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <div className="flex items-start gap-2">
              <input
                id="prebook-email"
                type="email"
                {...register('email', {
                  required: 'We need an email for your receipt',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                className={cn(field(!!errors.email), 'min-w-0 flex-1')}
                placeholder="you@example.com"
                autoComplete="email"
              />
              <button
                type="button"
                onClick={onVerify}
                disabled={verifySent}
                className={cn(
                  'flex h-[46px] shrink-0 items-center gap-1.5 rounded-xl border px-4 text-[13px] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40',
                  verifySent
                    ? 'cursor-default border-blue/30 bg-blue/5 text-blue'
                    : 'border-blue/45 bg-blue/5 text-blue hover:bg-blue/10',
                )}
              >
                {verifySent && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
                {verifySent ? 'Sent' : 'Verify email'}
              </button>
            </div>
            {errors.email && <span className="mt-1.5 block text-xs text-danger">{errors.email.message}</span>}
            {verifySent && !errors.email && (
              <span className="mt-1.5 block text-xs text-blue" role="status">
                Verification link sent to {verifiedFor}. Edit the address to send again.
              </span>
            )}
            {/* Only on the offer entry point: buyers who already paid the ₹99
                come back through this form and need to use the same address. */}
            {offer && (
              <p className="mt-2.5 rounded-lg border border-blue/15 bg-blue-50 px-3 py-2 text-[12px] leading-relaxed text-ink-dim">
                If you registered for the{' '}
                <b className="font-semibold text-blue-600">₹99 Pre-Launch Offer</b>, enter the same
                email verify and continue to the pricing page
              </p>
            )}
          </div>

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
              {sending ? 'Reserving your seat…' : offer ? 'Claim this offer' : 'Pay now — ₹99'}
            </Button>
            <p className="mt-3 text-center text-[12px] text-ink-faint">
              {offer
                ? 'We will reach out with the payment link to confirm your seat.'
                : 'Secure checkout · your seat is held as soon as payment clears.'}
            </p>
          </div>
        </form>
        )}
      </div>
    </Modal>
  );
}
