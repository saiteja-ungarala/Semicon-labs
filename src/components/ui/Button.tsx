import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-blue text-white shadow-pill hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-glow active:scale-[0.97]',
  secondary:
    'bg-panel-raised text-ink ring-1 ring-inset ring-line-strong hover:-translate-y-0.5 hover:ring-blue/40 hover:bg-panel hover:shadow-md active:scale-[0.97]',
  ghost: 
    'text-ink ring-1 ring-inset ring-transparent hover:ring-line hover:-translate-y-0.5 hover:bg-void-2 hover:shadow-sm active:scale-[0.97]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-[52px] px-8 text-[16px]',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  /** Show a trailing arrow that nudges right on hover. */
  arrow?: boolean;
}

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type ButtonAsLink = CommonProps & { to: string; href?: undefined };
type ButtonAsAnchor = CommonProps & { href: string; to?: undefined };

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

const Arrow = () => (
  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, arrow = false, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button ref={ref} className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
});
