import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Wrap in a home link. */
  href?: string;
  /** Kept for API compatibility — the wordmark image always includes the name. */
  showWordmark?: boolean;
  /** Rendered logo height in px (width scales with the wordmark's ratio). */
  size?: number;
}

/**
 * Brand lockup: the horizontal SEMICON LABS wordmark (client master art,
 * transparent background) rendered as a single image.
 */
export function Logo({ className, href = '/', size = 32 }: LogoProps) {
  const inner = (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={site.logos.wordmark}
        alt={`${site.name} logo`}
        style={{ height: size, width: 'auto' }}
        className="shrink-0 object-contain"
        loading="eager"
        decoding="async"
      />
    </span>
  );

  if (!href) return inner;
  return (
    <Link to={href} aria-label={`${site.name} home`} className="inline-flex items-center rounded-md">
      {inner}
    </Link>
  );
}
