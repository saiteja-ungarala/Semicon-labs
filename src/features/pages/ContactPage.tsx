import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Seo } from '@/components/seo/Seo';
import { Section } from '@/components/ui/Section';
import { PageHero } from '@/components/marketing/PageHero';
import { Button } from '@/components/ui/Button';
import { site } from '@/config/site';
import { breadcrumbSchema } from '@/lib/seo';
import { cn } from '@/lib/cn';

interface ContactForm {
  name: string;
  email: string;
  topic: string;
  message: string;
}

const topics = ['General enquiry', 'Billing & plans', 'Partnerships', 'Careers', 'Press'];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({ defaultValues: { topic: topics[0] } });

  const onSubmit = handleSubmit(async (data) => {
    // The public contact endpoint lands with the CMS in a later phase; until
    // then we accept and acknowledge the submission client-side.
    await new Promise((r) => setTimeout(r, 600));
    console.info('Contact submission:', data);
    setSubmitted(true);
    reset();
  });

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with the Semicon Labs team — questions about challenges, plans, partnerships, or anything else."
        path="/contact"
        schemas={[breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]}
      />
      <PageHero
        eyebrow="get in touch"
        title="Talk to a human."
        lede="Whether you're weighing a plan or stuck on a challenge, we answer fast."
        crumbs={[{ name: 'Home', to: '/' }, { name: 'Contact' }]}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="space-y-8">
            <ContactMethod
              label="Email us"
              value={site.email}
              href={`mailto:${site.email}`}
              hint="Typical reply within one business day."
            />
            <ContactMethod
              label="Careers"
              value="View open roles"
              href="/careers"
              hint="We're building the team that builds the platform."
            />
            <div className="rounded-2xl border border-line bg-panel/60 p-6">
              <p className="font-mono text-xs uppercase tracking-wider text-navy">Note</p>
              <p className="mt-3 text-sm text-ink-dim">
                For account or payment issues, include the email you registered with so we can find
                you faster.
              </p>
            </div>
          </div>

          <div className="gradient-border rounded-2xl border border-transparent bg-panel/70 p-7 sm:p-8">
            {submitted ? (
              <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-soft text-2xl text-blue-600">
                  ✓
                </div>
                <h2 className="mt-5 text-xl font-semibold">Message sent</h2>
                <p className="mt-2 max-w-sm text-sm text-ink-dim">
                  Thanks for reaching out. We'll get back to you at the email you provided shortly.
                </p>
                <Button variant="ghost" className="mt-6" onClick={() => setSubmitted(false)}>
                  Send another
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-5">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register('name', { required: 'Please tell us your name' })}
                    className={inputCls(!!errors.name)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                  />
                </Field>
                <Field label="Email" error={errors.email?.message}>
                  <input
                    type="email"
                    {...register('email', {
                      required: 'We need an email to reply',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    className={inputCls(!!errors.email)}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </Field>
                <Field label="Topic" error={errors.topic?.message}>
                  <select {...register('topic')} className={inputCls(false)}>
                    {topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    rows={5}
                    {...register('message', {
                      required: 'Add a short message',
                      minLength: { value: 10, message: 'A little more detail, please' },
                    })}
                    className={cn(inputCls(!!errors.message), 'resize-y')}
                    placeholder="How can we help?"
                  />
                </Field>
                <Button type="submit" className="w-full" disabled={isSubmitting} arrow={!isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function ContactMethod({ label, value, href, hint }: { label: string; value: string; href: string; hint: string }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wider text-ink-faint">{label}</p>
      <a href={href} className="mt-2 block text-lg font-semibold text-ink transition hover:text-blue-400">
        {value}
      </a>
      <p className="mt-1 text-sm text-ink-dim">{hint}</p>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-danger">{error}</span>}
    </label>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full rounded-lg border bg-void-2 px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:outline-none',
    hasError ? 'border-danger/60 focus:border-danger' : 'border-line focus:border-blue/60',
  );
}
