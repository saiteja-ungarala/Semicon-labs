import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Corporate enquiry capture — sales follows up from here.
 *
 * Fields are the client's final spec (Aug 2026): POC name, POC number, company,
 * licence count are required; location, website and the requirement note are
 * optional. Deliberately no email field — the POC number is the contact route.
 */

interface Fields {
  pocName: string;
  pocNumber: string;
  companyName: string;
  licences: string;
  location: string;
  website: string;
  requirement: string;
}

const field = (bad: boolean) =>
  cn(
    'w-full rounded-lg border bg-void-2 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none',
    bad ? 'border-danger/60 focus:border-danger' : 'border-line focus:border-blue/60',
  );

function Row({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-danger">
            *
          </span>
        )}
      </span>
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
  } = useForm<Fields>();

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
            <Row label="POC Name" required error={errors.pocName?.message}>
              <input
                {...register('pocName', { required: 'Please add the point of contact' })}
                className={field(!!errors.pocName)}
                placeholder="Ananya Sharma"
                autoComplete="name"
              />
            </Row>
            <Row label="POC Number" required error={errors.pocNumber?.message}>
              <input
                type="tel"
                inputMode="tel"
                {...register('pocNumber', {
                  required: 'We need a contact number',
                  pattern: { value: /^[+\d][\d\s-]{7,15}$/, message: 'Enter a valid phone number' },
                })}
                className={field(!!errors.pocNumber)}
                placeholder="98765 43210"
                autoComplete="tel"
              />
            </Row>
            <Row label="Company Name" required error={errors.companyName?.message}>
              <input
                {...register('companyName', { required: 'Please add your company name' })}
                className={field(!!errors.companyName)}
                placeholder="Acme Semiconductors"
                autoComplete="organization"
              />
            </Row>
            <Row label="No. of Licences Required" required error={errors.licences?.message}>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                {...register('licences', {
                  required: 'How many licences do you need?',
                  min: { value: 1, message: 'At least one licence' },
                })}
                className={field(!!errors.licences)}
                placeholder="25"
              />
            </Row>
            <Row label="Location">
              <input
                {...register('location')}
                className={field(false)}
                placeholder="Hyderabad, India"
                autoComplete="address-level2"
              />
            </Row>
            <Row label="Website">
              <input
                {...register('website')}
                className={field(false)}
                placeholder="acmesemi.com"
                autoComplete="url"
              />
            </Row>

            <div className="sm:col-span-2">
              <Row label="Few lines about your requirement" error={errors.requirement?.message}>
                <textarea
                  rows={4}
                  {...register('requirement')}
                  className={cn(field(!!errors.requirement), 'resize-y')}
                  placeholder="e.g. 40 engineers across PD and DV, ramping a new team over two quarters."
                />
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
