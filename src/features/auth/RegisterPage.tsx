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
  email: string;
  password: string;
}

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
  } = useForm<RegisterForm>();

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    try {
      const { user, accessToken } = await registerRequest(values);
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
        subtitle="Start with a free challenge — no credit card required."
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
              error={errors.firstName?.message}
              {...register('firstName', { required: 'Required' })}
            />
            <TextField
              label="Last name"
              autoComplete="family-name"
              error={errors.lastName?.message}
              {...register('lastName', { required: 'Required' })}
            />
          </div>
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
          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            hint="Use at least 8 characters."
            error={errors.password?.message}
            {...register('password', {
              required: 'Choose a password',
              minLength: { value: 8, message: 'At least 8 characters' },
            })}
          />
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
