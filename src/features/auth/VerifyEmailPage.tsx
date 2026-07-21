import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Seo } from '@/components/seo/Seo';
import { Button } from '@/components/ui/Button';
import { apiErrorMessage } from '@/lib/api';
import { verifyEmailRequest } from './api';
import { AuthShell, FormBanner } from './AuthShell';

export default function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get('token') ?? '';
  const [state, setState] = useState<'verifying' | 'ok' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // guard React 18/19 StrictMode double-run
    ran.current = true;
    if (!token) {
      setState('error');
      setMessage('This verification link is missing its token.');
      return;
    }
    verifyEmailRequest(token)
      .then(() => setState('ok'))
      .catch((err) => {
        setState('error');
        setMessage(apiErrorMessage(err, 'This link is invalid or has expired.'));
      });
  }, [token]);

  return (
    <>
      <Seo title="Verify email" path="/verify-email" noindex />
      <AuthShell title="Email verification">
        {state === 'verifying' && <p className="text-sm text-ink-dim">Verifying your email…</p>}
        {state === 'ok' && (
          <>
            <FormBanner tone="success">Your email is verified. You're all set.</FormBanner>
            <Button to="/dashboard" className="w-full" arrow>
              Go to dashboard
            </Button>
          </>
        )}
        {state === 'error' && (
          <>
            <FormBanner tone="error">{message}</FormBanner>
            <Button to="/login" variant="ghost" className="w-full">
              Back to sign in
            </Button>
          </>
        )}
        <p className="mt-6 text-center text-sm text-ink-dim">
          <Link to="/" className="text-blue hover:underline">
            Return home
          </Link>
        </p>
      </AuthShell>
    </>
  );
}
