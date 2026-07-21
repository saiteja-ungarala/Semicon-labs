import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { UrgencyBar } from './UrgencyBar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StickyMobileCta } from './StickyMobileCta';
import { ScrollManager } from './ScrollManager';
import { RouteFallback } from '@/components/feedback/RouteFallback';
import { useSessionBootstrap } from '@/features/auth/useSessionBootstrap';

/** Public marketing/app shell: announcement bar, nav, page, footer. */
export function RootLayout() {
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
      <UrgencyBar />
      <Navbar />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <StickyMobileCta />
    </>
  );
}
