import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { apiErrorMessage } from '@/lib/api';
import { forgotPasswordRequest } from './api';
import { AuthShell, FormBanner } from './AuthShell';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>();

  const onSubmit = handleSubmit(async ({ email }) => {
    setError('');
    try {
      await forgotPasswordRequest(email);
      setSent(true);
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  });

  return (
    <>
      <Seo title="Forgot password" path="/forgot-password" noindex />
      <AuthShell
        title="Reset your password"
        subtitle="Enter your email and we'll send a reset link."
        footer={
          <Link to="/login" className="font-semibold text-blue hover:underline">
            Back to sign in
          </Link>
        }
      >
        {sent ? (
          <FormBanner tone="success">
            If an account exists for that email, a reset link is on its way. Check your inbox (and the
            server console in dev).
          </FormBanner>
        ) : (
          <>
            {error && <FormBanner tone="error">{error}</FormBanner>}
            <form onSubmit={onSubmit} noValidate className="space-y-5">
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
              <Button type="submit" className="w-full" disabled={isSubmitting} arrow={!isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Send reset link'}
              </Button>
            </form>
          </>
        )}
      </AuthShell>
    </>
  );
}
