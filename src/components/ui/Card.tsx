import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  className?: string;
  /** Adds the animated gradient ring border. */
  gradient?: boolean;
  /** Adds hover elevation + border glow (for interactive cards). */
  interactive?: boolean;
  children: ReactNode;
}

export function Card({ className, gradient = false, interactive = false, children }: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-[2rem] border border-white/40 bg-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl',
        gradient && 'gradient-border border-transparent',
        interactive &&
          'transition-all duration-500 ease-out hover:-translate-y-1.5 hover:bg-white/80 hover:shadow-[0_20px_40px_-12px_rgba(46,30,224,0.15)] hover:border-blue/20 cursor-pointer',
        className,
      )}
    >
      <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,1)] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
