import { socialLinks } from '@/config/site';
import { socialIcons } from '@/components/ui/SocialIcons';
import { cn } from '@/lib/cn';

/**
 * The live social accounts. Each pill fills with its own brand colour on
 * hover, which reads as "these are real accounts" rather than stock chrome.
 */
export function SocialRow({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const box = size === 'lg' ? 'h-12 w-12' : 'h-11 w-11'; // 44px floor for touch
  const glyph = size === 'lg' ? 'h-[19px] w-[19px]' : 'h-[17px] w-[17px]';

  return (
    <div className={cn('flex flex-wrap gap-2.5', className)}>
      {socialLinks.map((s) => (
        <a
          key={s.key}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Semicon Labs on ${s.label}`}
          title={s.label}
          style={{ ['--brand' as string]: s.brand }}
          className={cn(
            'group flex items-center justify-center rounded-full border border-line text-ink-dim transition-all duration-200',
            'hover:-translate-y-0.5 hover:border-[color:var(--brand)] hover:bg-[var(--brand)] hover:text-white hover:shadow-md',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2',
            box,
          )}
        >
          <span className={glyph}>{socialIcons[s.key]}</span>
        </a>
      ))}
    </div>
  );
}
