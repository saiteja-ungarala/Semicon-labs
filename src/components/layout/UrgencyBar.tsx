import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'sl-urgency-dismissed';

/** Top announcement bar. Dismissible; state persists for the session. */
export function UrgencyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem(STORAGE_KEY) !== '1');
  }, []);

  if (!visible) return null;

  return (
    <div className="relative z-[60] bg-gradient-to-r from-blue-600 via-blue to-sky/80 text-white">
      <div className="mx-auto flex max-w-content items-center justify-center gap-2 px-10 py-2 text-center font-mono text-[12.5px] font-medium sm:text-[13px]">
        <span aria-hidden>◆</span>
        <p>
          Founding Learner pricing —{' '}
          <Link to="/pricing" className="underline decoration-white/50 underline-offset-2 hover:decoration-white">
            lock in up to 40% off
          </Link>{' '}
          <span className="hidden opacity-80 sm:inline">before cohort pricing resets.</span>
        </p>
        <button
          type="button"
          aria-label="Dismiss announcement"
          onClick={() => {
            sessionStorage.setItem(STORAGE_KEY, '1');
            setVisible(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/80 transition hover:bg-white/15 hover:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
