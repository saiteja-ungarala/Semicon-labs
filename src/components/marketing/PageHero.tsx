import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';

export interface Crumb {
  name: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}

/** Consistent inner-page header with breadcrumb, eyebrow, title and lede. */
export function PageHero({ eyebrow, title, lede, crumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-14 sm:pb-16 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-radial-blue" />
      <Container className="relative">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs text-ink-faint">
              {crumbs.map((crumb, i) => (
                <li key={crumb.name} className="flex items-center gap-2">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition hover:text-ink">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-ink-dim">{crumb.name}</span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-4 max-w-3xl text-display-lg">{title}</h1>
          {lede && <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-dim">{lede}</p>}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </Container>
    </section>
  );
}
