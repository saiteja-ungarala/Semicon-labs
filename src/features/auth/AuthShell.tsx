import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

interface AuthShellProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

/** Centered card layout shared by all auth screens. */
export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-var(--header-h))] items-center overflow-hidden py-16">
      <div className="pointer-events-none absolute inset-0 bg-radial-dual" />
      <Container className="relative">
        <div className="mx-auto max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex">
              <Logo size={40} />
            </Link>
          </div>
          <div className="gradient-border rounded-2xl border border-transparent bg-panel p-7 shadow-card sm:p-8">
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-ink-dim">{subtitle}</p>}
            <div className="mt-6">{children}</div>
          </div>
          {footer && <p className="mt-6 text-center text-sm text-ink-dim">{footer}</p>}
        </div>
      </Container>
    </section>
  );
}

/** Inline status banner for auth forms. */
export function FormBanner({ tone, children }: { tone: 'error' | 'success'; children: ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={
        tone === 'error'
          ? 'mb-5 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger'
          : 'mb-5 rounded-lg border border-blue/30 bg-blue-soft px-4 py-3 text-sm text-blue-600'
      }
    >
      {children}
    </div>
  );
}
