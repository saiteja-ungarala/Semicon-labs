import { Link } from 'react-router-dom';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** Wrap in a home link. */
  href?: string;
  /** Show the "Semicon Labs" wordmark beside the SL monogram. */
  showWordmark?: boolean;
  /** Rendered monogram height in px (width scales to the 2.15:1 mark ratio). */
  size?: number;
}

/**
 * Brand lockup: the SL monogram (cropped from the master art, transparent
 * background) beside a wordmark rendered in the display face. The full
 * vertical lockup already contains its own wordmark, so we use the monogram
 * for the horizontal nav to avoid a squashed, illegible stack.
 */
export function Logo({ className, href = '/', showWordmark = true, size = 34 }: LogoProps) {
  const inner = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <img
        src={site.logos.mark}
        alt={`${site.name} logo`}
        style={{ height: size, width: 'auto' }}
        className="shrink-0 object-contain"
        loading="eager"
        decoding="async"
      />
      {showWordmark && (
        <span className="font-display text-[19px] font-extrabold uppercase tracking-tight text-ink">
          Semicon<span className="text-blue"> Labs</span>
        </span>
      )}
    </span>
  );

  if (!href) return inner;
  return (
    <Link to={href} aria-label={`${site.name} home`} className="inline-flex items-center rounded-md">
      {inner}
    </Link>
  );
}
