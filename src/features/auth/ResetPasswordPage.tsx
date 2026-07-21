import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { apiErrorMessage } from '@/lib/api';
import { resetPasswordRequest } from './api';
import { AuthShell, FormBanner } from './AuthShell';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<{ password: string; confirm: string }>();

  const onSubmit = handleSubmit(async ({ password }) => {
    setError('');
    try {
      await resetPasswordRequest(token, password);
      navigate('/login', { replace: true });
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  });

  return (
    <>
      <Seo title="Reset password" path="/reset-password" noindex />
      <AuthShell title="Choose a new password" subtitle="Set a new password for your account.">
        {!token ? (
          <FormBanner tone="error">
            This reset link is missing its token.{' '}
            <Link to="/forgot-password" className="underline">
              Request a new one
            </Link>
            .
          </FormBanner>
        ) : (
          <>
            {error && <FormBanner tone="error">{error}</FormBanner>}
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <TextField
                label="New password"
                type="password"
                autoComplete="new-password"
                error={errors.password?.message}
                {...register('password', {
                  required: 'Choose a password',
                  minLength: { value: 8, message: 'At least 8 characters' },
                })}
              />
              <TextField
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                error={errors.confirm?.message}
                {...register('confirm', {
                  required: 'Confirm your password',
                  validate: (v) => v === watch('password') || 'Passwords do not match',
                })}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting} arrow={!isSubmitting}>
                {isSubmitting ? 'Updating…' : 'Update password'}
              </Button>
            </form>
          </>
        )}
      </AuthShell>
    </>
  );
}
