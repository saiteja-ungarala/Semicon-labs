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

  // Two copies only: the track translates by exactly one copy's width, so the
  // loop is seamless. The ~70vw trailing gap means a message has almost left
  // the screen before the next one enters — at most two are ever in view.
  const items = Array.from({ length: 2 });

  return (
    <div className="relative z-[60] overflow-hidden bg-gradient-to-r from-blue-600 via-blue to-sky/80 text-white">
      <Link to="/pricing" aria-label="See launch pricing" className="block py-2">
        <div className="flex w-max animate-marquee-ticker items-center motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center sm:animate-marquee-ticker-wide">
          {items.map((_, i) => (
            <span
              key={i}
              className={
                // min-w-[100vw] keeps one copy at least a screen wide, so the
                // -50% loop never exposes a blank strip on ultra-wide displays.
                'flex min-w-[100vw] items-center gap-2 whitespace-nowrap pl-8 pr-[70vw] font-mono text-[12.5px] font-semibold motion-reduce:min-w-0 motion-reduce:pr-8 sm:text-[13px]' +
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
