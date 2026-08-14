import { Link } from 'react-router-dom';
import { footerNav, site } from '@/config/site';
import { SocialRow } from '@/components/marketing/SocialRow';
import { Logo } from '@/components/ui/Logo';
import { Container } from '@/components/ui/Container';

export function Footer() {
  return (
    <footer className="relative mt-8 border-t border-line bg-void-2/60">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-pretty text-sm text-ink-faint">
              The platform for learning semiconductor engineering through real project problems —
              Physical Design and Design Verification.
            </p>
            <SocialRow className="mt-6" />
          </div>

          {footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-ink-faint">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.to + item.label}>
                    <Link to={item.to} className="inline-flex min-h-9 items-center py-1 text-sm text-ink-dim transition hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint">
            Built for engineers who want project-ready judgment, not just a certificate.
          </p>
        </div>
      </Container>
    </footer>
  );
}
