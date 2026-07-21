import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

interface SectionProps {
  id?: string;
  className?: string;
  /** Alternate background wash used for rhythm between sections. */
  alt?: boolean;
  /** Render the section full-bleed (caller provides its own Container). */
  bleed?: boolean;
  children: ReactNode;
}

export function Section({ id, className, alt = false, bleed = false, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'relative scroll-mt-24 py-20 sm:py-24 lg:py-28',
        alt && 'bg-gradient-to-b from-void via-void-2 to-void',
        className,
      )}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  );
}

interface SectionHeadProps {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'split' | 'center';
  className?: string;
}

/** Standard eyebrow + heading + lede block used to open a section. */
export function SectionHead({ eyebrow, title, lede, align = 'split', className }: SectionHeadProps) {
  if (align === 'center') {
    return (
      <div className={cn('mx-auto mb-14 max-w-2xl text-center', className)}>
        {eyebrow && <p className="eyebrow justify-center">{eyebrow}</p>}
        <h2 className="mt-4 text-display-md">{title}</h2>
        {lede && <p className="mx-auto mt-5 max-w-prose text-pretty text-ink-dim">{lede}</p>}
      </div>
    );
  }
  return (
    <div className={cn('mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-4 text-display-md">{title}</h2>
      </div>
      {lede && <p className="max-w-sm text-pretty text-ink-dim md:text-right">{lede}</p>}
    </div>
  );
}
