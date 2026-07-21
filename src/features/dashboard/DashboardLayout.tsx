import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Seo } from '@/components/seo/Seo';
import { useAuthStore } from '@/stores/auth';
import { logoutRequest } from '@/features/auth/api';
import { cn } from '@/lib/cn';

const links = [
  { to: '/dashboard', label: 'Overview', end: true },
  { to: '/dashboard/purchases', label: 'My Purchases' },
  { to: '/dashboard/orders', label: 'Orders & Invoices' },
  { to: '/dashboard/profile', label: 'Profile' },
];

export function DashboardLayout() {
  const user = useAuthStore((s) => s.user);
  const clear = useAuthStore((s) => s.clear);
  const navigate = useNavigate();

  const logout = async () => {
    await logoutRequest().catch(() => undefined);
    clear();
    navigate('/');
  };

  return (
    <>
      <Seo title="Dashboard" path="/dashboard" noindex />
      <Container className="py-10 lg:py-14">
        <div className="mb-8">
          <p className="eyebrow">your workspace</p>
          <h1 className="mt-3 text-display-md">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}.
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-line bg-panel p-2 lg:flex-col lg:overflow-visible">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  className={({ isActive }) =>
                    cn(
                      'whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition',
                      isActive ? 'bg-blue text-white' : 'text-ink-dim hover:bg-panel-raised hover:text-ink',
                    )
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <button
                type="button"
                onClick={logout}
                className="mt-1 whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-sm font-medium text-ink-dim transition hover:bg-panel-raised hover:text-ink"
              >
                Log out
              </button>
            </nav>
          </aside>

          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </Container>
    </>
  );
}
