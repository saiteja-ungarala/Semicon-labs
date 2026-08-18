import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { UrgencyBar } from './UrgencyBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollManager } from './ScrollManager';
import { RouteFallback } from '@/components/feedback/RouteFallback';
import { useSessionBootstrap } from '@/features/auth/useSessionBootstrap';

/** Public marketing/app shell: announcement bar, nav, page, footer. */
export function RootLayout() {
  const { pathname } = useLocation();
  // Restore any existing session (silent refresh) once on load.
  useSessionBootstrap();

  return (
    <>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-blue focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      {/* Ticker and nav pin together: the announcement used to scroll out of
          view and never come back. One sticky wrapper keeps them as a unit. */}
      <div className="sticky top-0 z-50">
        <UrgencyBar />
        <Navbar />
      </div>
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          {/* Keyed by pathname so a route that only changes a param (e.g.
              /who-we-serve/individuals -> /teams) remounts. Without this the
              scroll-reveal observers, which fire once, never re-run and the
              new page's content stays at opacity 0. */}
          <Outlet key={pathname} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
