import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'sl-urgency-dismissed';

const MESSAGE = 'Hurry Up !! Launching on 15th August · Limited Registrations — only for the first 1,000 users';

/** Top announcement bar — rolling marquee. Dismissible; state persists for the session. */
export function UrgencyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sessionStorage.getItem(STORAGE_KEY) !== '1');
  }, []);

  if (!visible) return null;

  // Duplicate the track so the -50% translate loops seamlessly.
  const items = Array.from({ length: 6 });

  return (
    <div className="relative z-[60] overflow-hidden bg-gradient-to-r from-blue-600 via-blue to-sky/80 text-white">
      <Link to="/register" aria-label="Register before launch" className="block py-2">
        <div className="flex w-max animate-marquee items-center motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
          {items.map((_, i) => (
            <span
              key={i}
              className={
                'flex items-center gap-2 whitespace-nowrap px-8 font-mono text-[12.5px] font-semibold sm:text-[13px]' +
                (i > 0 ? ' motion-reduce:hidden' : '')
              }
            >
              <span aria-hidden={i > 0 || undefined}>🔥</span>
              <span aria-hidden={i > 0 || undefined}>{MESSAGE}</span>
            </span>
          ))}
        </div>
      </Link>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          sessionStorage.setItem(STORAGE_KEY, '1');
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded bg-blue-600/60 p-1 text-white/80 transition hover:bg-white/15 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
