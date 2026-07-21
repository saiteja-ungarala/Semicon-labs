import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { useAuthStore } from '@/stores/auth';
import { apiErrorMessage } from '@/lib/api';
import { loginRequest } from './api';
import { AuthShell, FormBanner } from './AuthShell';

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [error, setError] = useState('');
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = handleSubmit(async (values) => {
    setError('');
    try {
      const { user, accessToken } = await loginRequest(values);
      setAuth(user, accessToken);
      navigate(from, { replace: true });
    } catch (err) {
      setError(apiErrorMessage(err, 'Could not sign you in'));
    }
  });

  return (
    <>
      <Seo title="Log in" path="/login" noindex />
      <AuthShell
        title="Welcome back"
        subtitle="Sign in to continue solving challenges."
        footer={
          <>
            New to Semicon Labs?{' '}
            <Link to="/register" className="font-semibold text-blue hover:underline">
              Create an account
            </Link>
          </>
        }
      >
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
          <TextField
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { required: 'Enter your password' })}
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-blue hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting} arrow={!isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>
      </AuthShell>
    </>
  );
}
