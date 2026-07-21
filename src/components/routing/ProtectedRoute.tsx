import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth';
import { RouteFallback } from '@/components/feedback/RouteFallback';

/** Gate for authenticated-only routes. Waits for session bootstrap to settle. */
export function ProtectedRoute() {
  const status = useAuthStore((s) => s.status);
  const location = useLocation();

  if (status === 'idle' || status === 'loading') return <RouteFallback />;
  if (status !== 'authenticated') {
    // Preserve where the user was headed so we can return them after login.
    return <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
  }
  return <Outlet />;
}
