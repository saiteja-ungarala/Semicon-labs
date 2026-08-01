import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNav, site, type NavItem } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';
import { cn } from '@/lib/cn';

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 12 12"
    className={cn('h-3 w-3 transition-transform duration-200', open && 'rotate-180')}
    fill="none"
    aria-hidden
  >
    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isAuthed = useAuthStore((s) => s.status === 'authenticated');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on navigation and lock body scroll while open.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-500 ease-out',
        scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-line shadow-[0_4px_30px_rgba(0,0,0,0.02)]'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-[var(--header-h)] max-w-content items-center justify-between px-6 sm:px-8 lg:px-12">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden items-center justify-center gap-1 lg:flex">
          {primaryNav.map((item) =>
            item.children ? (
              <NavDropdown key={item.label} item={item} />
            ) : (
              <NavLink key={item.label} to={item.to} label={item.label} />
            ),
          )}
        </div>

        <div className="flex items-center justify-end gap-4">
          {isAuthed ? (
            <Button to="/dashboard" size="md" arrow className="hidden sm:inline-flex shadow-sm">
              Dashboard
            </Button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-ink-dim transition-colors hover:bg-void-2 hover:text-ink sm:inline-flex"
              >
                Log in
              </Link>
              <Button to="/register" size="md" arrow className="hidden sm:inline-flex shadow-sm">
                Get Started
              </Button>
            </>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-void-2 text-ink transition-colors hover:bg-line lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="relative h-4 w-5">
              <span className={cn('absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300', open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5')} />
              <span className={cn('absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200', open && 'opacity-0')} />
              <span className={cn('absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300', open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0.5')} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full max-h-[calc(100vh-var(--header-h))] overflow-y-auto border-b border-line bg-white/95 shadow-xl backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6 sm:px-8">
              {primaryNav.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.to}
                    className="block rounded-xl px-4 py-3 font-display text-lg font-semibold text-ink transition-all hover:bg-void-2 active:scale-[0.98]"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mb-1 flex flex-col border-l border-line pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.to + c.label}
                          to={c.to}
                          className="rounded-lg px-3 py-2 text-[15px] font-medium text-ink-dim transition-colors hover:bg-void-2 hover:text-ink"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                {isAuthed ? (
                  <Button to="/dashboard" size="lg" arrow className="w-full justify-center">
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button to="/register" size="lg" arrow className="w-full justify-center">
                      Get Started
                    </Button>
                    <Button to="/login" variant="secondary" size="lg" className="w-full justify-center">
                      Log in
                    </Button>
                  </>
                )}
              </div>
              <p className="mt-8 px-4 text-center font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                {site.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isActive = location.pathname.startsWith(item.to) && item.to !== '/';
  const wide = (item.children?.length ?? 0) > 4;

  // Close on navigation.
  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const openNow = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    timer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon} onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}>
      <Link
        to={item.to}
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={openNow}
        className={cn(
          'group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-void-2',
          isActive || open ? 'text-ink' : 'text-ink-dim hover:text-ink',
        )}
      >
        {item.label}
        <span className="text-ink-faint">
          <Chevron open={open} />
        </span>
      </Link>

      <AnimatePresence>
        {open && (
          /* Static wrapper owns the centering — framer's `y` animation would
             otherwise overwrite the -translate-x-1/2 transform and shove the
             panel off-center. */
          <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3" role="menu">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                'rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(28,20,120,0.28)]',
                wide ? 'grid w-[560px] grid-cols-2 gap-1' : 'w-[320px]',
              )}
            >
              {item.children!.map((c) => (
                <Link
                  key={c.to + c.label}
                  to={c.to}
                  role="menuitem"
                  className="group/item flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-blue-soft"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold text-ink transition-colors group-hover/item:text-blue-600">
                      {c.label}
                    </span>
                    {c.description && <span className="mt-0.5 text-xs text-ink-dim">{c.description}</span>}
                  </span>
                  <span
                    aria-hidden
                    className="-translate-x-1 text-sm font-semibold text-blue opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                  >
                    →
                  </span>
                </Link>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to) && to !== '/';

  return (
    <Link
      to={to}
      className={cn(
        'group relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:bg-void-2',
        isActive ? 'text-ink' : 'text-ink-dim hover:text-ink',
      )}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 z-[-1] rounded-full bg-void-2"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}
