import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores scroll position on navigation:
 * - new path → scroll to top
 * - path with #hash → smooth-scroll to the target element (after paint)
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Arriving from another route, the target sits inside a lazily-loaded
      // page that has not mounted yet — a single frame lands before it exists
      // and silently falls back to the top. Keep looking for a short while.
      let raf = 0;
      const deadline = performance.now() + 1500;
      const look = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (performance.now() < deadline) {
          raf = requestAnimationFrame(look);
          return;
        }
        window.scrollTo({ top: 0 });
      };
      raf = requestAnimationFrame(look);
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return undefined;
  }, [pathname, hash]);

  return null;
}
