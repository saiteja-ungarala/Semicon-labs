import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { primaryNav, site } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/auth';
import { cn } from '@/lib/cn';

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
        scrolled ? 'bg-white/70 backdrop-blur-xl border-b border-line shadow-[0_4px_30px_rgba(0,0,0,0.02)]' : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav className="mx-auto flex h-[var(--header-h)] max-w-content items-center justify-between px-6 sm:px-8 lg:px-12">
        <div className="flex items-center">
          <Logo />
        </div>

        <div className="hidden lg:flex items-center justify-center gap-1">
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} label={item.label} />
          ))}
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
                className="hidden text-sm font-semibold text-ink-dim hover:text-ink transition-colors sm:inline-flex px-3 py-2 rounded-lg hover:bg-void-2"
              >
                Log in
              </Link>
              <Button to="/register" size="md" arrow className="hidden sm:inline-flex shadow-sm">
                Start Solving
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
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0.5',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-200',
                  open && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300',
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0.5',
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full overflow-hidden bg-white/95 backdrop-blur-2xl border-b border-line shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-2 px-6 py-6 sm:px-8">
              {primaryNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="rounded-xl px-4 py-3 font-display text-lg font-semibold text-ink-dim transition-all hover:bg-void-2 hover:text-ink active:scale-[0.98]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                {isAuthed ? (
                  <Button to="/dashboard" size="lg" arrow className="w-full justify-center">
                    Go to Dashboard
                  </Button>
                ) : (
                  <>
                    <Button to="/register" size="lg" arrow className="w-full justify-center">
                      Start Solving
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

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Link
      to={to}
      className={cn(
        "group relative px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full hover:bg-void-2",
        isActive ? "text-ink" : "text-ink-dim hover:text-ink"
      )}
    >
      {label}
      {isActive && (
        <motion.span 
          layoutId="nav-pill"
          className="absolute inset-0 z-[-1] rounded-full bg-void-2"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}
