import type { CSSProperties } from 'react';

/**
 * Per-domain accent used by the curriculum explorer. Alphas are pre-baked as
 * their own custom properties: Tailwind cannot apply an opacity modifier to a
 * var colour (`text-[color:var(--ac)]/30` silently produces nothing).
 *
 * Solid values are chosen to clear 4.5:1 against white text on the filled node.
 */
interface Accent {
  ac: string;
  a06: string;
  a10: string;
  a16: string;
  a30: string;
  glow: string;
}

export const DOMAIN_ACCENT: Record<string, Accent> = {
  'physical-design': {
    ac: '#2E1EE0',
    a06: 'rgba(46,30,224,0.06)',
    a10: 'rgba(46,30,224,0.10)',
    a16: 'rgba(46,30,224,0.16)',
    a30: 'rgba(46,30,224,0.30)',
    glow: 'rgba(46,30,224,0.45)',
  },
  'design-verification': {
    ac: '#6D28D9',
    a06: 'rgba(109,40,217,0.06)',
    a10: 'rgba(109,40,217,0.10)',
    a16: 'rgba(109,40,217,0.16)',
    a30: 'rgba(109,40,217,0.30)',
    glow: 'rgba(109,40,217,0.45)',
  },
  'analog-layout': {
    ac: '#B45309',
    a06: 'rgba(180,83,9,0.06)',
    a10: 'rgba(180,83,9,0.10)',
    a16: 'rgba(180,83,9,0.16)',
    a30: 'rgba(180,83,9,0.30)',
    glow: 'rgba(180,83,9,0.45)',
  },
};

export function accentVars(slug: string): CSSProperties {
  const a = DOMAIN_ACCENT[slug] ?? DOMAIN_ACCENT['physical-design'];
  return {
    '--ac': a.ac,
    '--ac-06': a.a06,
    '--ac-10': a.a10,
    '--ac-16': a.a16,
    '--ac-30': a.a30,
    '--ac-glow': a.glow,
  } as CSSProperties;
}
