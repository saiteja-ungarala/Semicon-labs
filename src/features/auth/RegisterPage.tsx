import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuthStore } from '@/stores/auth';
import { apiErrorMessage } from '@/lib/api';
import { registerRequest } from './api';
import { AuthShell, FormBanner } from './AuthShell';

interface RegisterForm {
  firstName: string;
  lastName: string;
  contact: string;
  email: string;
  sources: string[];
}

/** Where people find us — multi-select, because most hear from more than one. */
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

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState('');
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ defaultValues: { sources: [] } });

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    try {
      // The account API only takes the credential fields; the contact number
      // and attribution ride along for the checkout step and lead export.
      sessionStorage.setItem(
        'sl-signup-meta',
        JSON.stringify({ contact: values.contact, sources: values.sources, email: values.email }),
      );
      // The password field was removed from this form at the client's request.
      // The account API still requires one, so we mint a strong random secret;
      // the member sets their own later via "Forgot password".
      const generatedPassword = Array.from(crypto.getRandomValues(new Uint8Array(18)))
        .map((n) => n.toString(36))
        .join('')
        .slice(0, 24);
      const { user, accessToken } = await registerRequest({ ...values, password: generatedPassword });
      setAuth(user, accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(apiErrorMessage(err, 'Could not create your account'));
    }
  });

  return (
    <>
      <Seo title="Create account" path="/register" noindex />
      <AuthShell
        title="Create your account"
        subtitle="Tell us who you are and we’ll set your account up."
        footer={
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue hover:underline">
              Sign in
            </Link>
          </>
        }
      >
        {error && <FormBanner tone="error">{error}</FormBanner>}
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="First name"
              autoComplete="given-name"
              placeholder="Ananya"
              error={errors.firstName?.message}
              {...register('firstName', { required: 'Required' })}
            />
            <TextField
              label="Last name"
              autoComplete="family-name"
              placeholder="Sharma"
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Required' })}
            />
          </div>
          <TextField
            label="Contact number"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="98765 43210"
            error={errors.contact?.message}
            {...register('contact', {
              required: 'We need a contact number',
              pattern: { value: /^[+\d][\d\s-]{7,15}$/, message: 'Enter a valid phone number' },
            })}
          />
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            error={errors.email?.message}
            {...register('email', {
              required: 'Enter your email',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
          />
          <fieldset>
            <legend className="mb-2 block text-sm font-medium text-ink">
              How did you get to know about us?
            </legend>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {SOURCES.map((src) => (
                <label key={src} className="flex cursor-pointer items-center gap-2.5 text-[13.5px] text-ink-dim">
                  <input
                    type="checkbox"
                    value={src}
                    {...register('sources')}
                    className="h-4 w-4 shrink-0 rounded border-line-strong text-blue accent-blue focus:ring-2 focus:ring-blue"
                  />
                  {src}
                </label>
              ))}
            </div>
          </fieldset>

          <Button type="submit" className="w-full" disabled={isSubmitting} arrow={!isSubmitting}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>
          <p className="text-center text-xs text-ink-faint">
            By creating an account you agree to our{' '}
            <Link to="/terms" className="text-blue hover:underline">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </AuthShell>
    </>
  );
}
