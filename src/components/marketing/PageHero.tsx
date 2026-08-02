import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  /** Optional chip artwork shown on the right (desktop only), softly masked into the page. */
  image?: string;
  imageAlt?: string;
  /** Transparent-PNG artwork: floats on the right over a soft glow (not cropped). */
  art?: string;
  artAlt?: string;
}

/** Consistent inner-page header with breadcrumb, eyebrow, title and lede. */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  children,
  image,
  imageAlt = '',
  art,
  artAlt = '',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pb-14 pt-14 sm:pb-16 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-radial-blue" />

      {/* Floating transparent artwork (audience pages): glow pedestal + slow drift.
          The static wrapper owns the centering — a motion `y` animation would
          overwrite Tailwind's -translate-y-1/2 and drop the art out of frame. */}
      {art && (
        <div className="pointer-events-none absolute right-[7%] top-1/2 hidden -translate-y-1/2 lg:block">
          <motion.div
            aria-hidden={!artAlt}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid h-[240px] w-[240px] place-items-center xl:h-[280px] xl:w-[280px]"
          >
            {/* Soft brand glow behind the art */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(46,30,224,0.18), transparent 65%)' }}
            />
            <div aria-hidden className="absolute inset-6 rounded-full border border-blue/15 bg-panel/40 backdrop-blur-sm" />
            <img
              src={art}
              alt={artAlt}
              className="relative h-[64%] w-[64%] animate-float object-contain drop-shadow-[0_18px_35px_rgba(28,20,120,0.22)]"
              loading="eager"
            />
          </motion.div>
        </div>
      )}

      {/* Right-side chip artwork: fades into the page so the white system stays airy. */}
      {image && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] lg:block"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 45%, black 100%)',
          }}
        >
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-[0.9]" loading="eager" />
          {/* Wash so overlapping text keeps contrast and the tone matches the brand */}
          <div className="absolute inset-0 bg-gradient-to-r from-void via-void/35 to-transparent" />
        </motion.div>
      )}

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
