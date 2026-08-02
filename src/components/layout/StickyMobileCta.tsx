import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';

/** Fixed bottom CTA on small screens; appears after the hero scrolls away. */
export function StickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={cnShow(show)}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">Founding pricing is live</p>
        <p className="truncate text-xs text-ink-dim">Pre-book ₹99 · 200 hours for the price of 100</p>
      </div>
      <Button to="/pricing" size="sm" className="shrink-0">
        Get Started
      </Button>
    </div>
  );
}

function cnShow(show: boolean) {
  return [
    'fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line',
    'glass px-4 py-3 transition-transform duration-300 lg:hidden',
    show ? 'translate-y-0' : 'translate-y-full',
  ].join(' ');
}
