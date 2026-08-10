import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/** Corporate enquiry capture — sales follows up from here. */

interface Fields {
  name: string;
  email: string;
  contact: string;
  organization: string;
  requirement: string;
  source: string;
}

const SOURCES = [
  'LinkedIn',
  'Instagram',
  'YouTube',
  'Facebook',
  'WhatsApp',
  'Referral / word of mouth',
  'Conference or event',
  'Google search',
  'Other',
];

const field = (bad: boolean) =>
  cn(
    'w-full rounded-lg border bg-void-2 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none',
    bad ? 'border-danger/60 focus:border-danger' : 'border-line focus:border-blue/60',
  );

function Row({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
}

export function CorporateEnquiryForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ defaultValues: { source: SOURCES[0] } });

  const onSubmit = handleSubmit(async (data) => {
    // Sales picks these up; the endpoint lands with the CMS work.
    await new Promise((r) => setTimeout(r, 500));
    console.info('Corporate enquiry:', data);
    setSent(true);
    reset();
  });

  return (
    <div id="corporate-enquiry" className="mx-auto mt-14 max-w-3xl scroll-mt-28">
      <div className="gradient-border rounded-3xl border border-transparent bg-panel p-7 shadow-card sm:p-9">
        <p className="eyebrow text-blue">talk to sales</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-[28px]">
          Tell us what your organisation needs.
        </h3>
        <p className="mt-2.5 text-[14.5px] text-ink-dim">
          Share a couple of lines about your requirement and we'll come back with a tailored rollout
          and pricing.
        </p>

        {sent ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-line bg-void-2/60 py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-soft text-2xl text-blue-600">
              ✓
            </div>
            <h4 className="mt-5 text-xl font-semibold text-ink">Query submitted</h4>
            <p className="mt-2 max-w-sm text-sm text-ink-dim">
              Thanks — our team will reach out on the details you shared.
            </p>
            <Button variant="ghost" className="mt-6" onClick={() => setSent(false)}>
              Send another
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
            <Row label="Name" error={errors.name?.message}>
              <input
                {...register('name', { required: 'Please tell us your name' })}
                className={field(!!errors.name)}
                placeholder="Ananya Sharma"
                autoComplete="name"
              />
            </Row>
            <Row label="Email" error={errors.email?.message}>
              <input
                type="email"
                {...register('email', {
                  required: 'We need an email to reply',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                })}
                className={field(!!errors.email)}
                placeholder="you@company.com"
                autoComplete="email"
              />
            </Row>
            <Row label="Contact number" error={errors.contact?.message}>
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
            </Row>
            <Row label="Organization name" error={errors.organization?.message}>
              <input
                {...register('organization', { required: 'Please add your organisation' })}
                className={field(!!errors.organization)}
                placeholder="Acme Semiconductors"
                autoComplete="organization"
              />
            </Row>

            <div className="sm:col-span-2">
              <Row label="Explain a line or two about your requirement" error={errors.requirement?.message}>
                <textarea
                  rows={4}
                  {...register('requirement', {
                    required: 'A short description helps us prepare',
                    minLength: { value: 10, message: 'A little more detail, please' },
                  })}
                  className={cn(field(!!errors.requirement), 'resize-y')}
                  placeholder="e.g. 40 engineers across PD and DV, ramping a new team over two quarters."
                />
              </Row>
            </div>

            <div className="sm:col-span-2">
              <Row label="How did you get to know about us?">
                <select {...register('source')} className={field(false)}>
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Row>
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" arrow={!isSubmitting} disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? 'Submitting…' : 'Submit query'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
