import type { Config } from 'tailwindcss';

/**
 * Semicon Labs design system — "white & electric-blue" theme, matched to the
 * brand key art: white surfaces, the exact brand blue (#2E1EE0), heavy
 * Montserrat display type, soft indigo-tinted shadows and blue glow.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        // Surfaces — near-white page, white cards
        void: '#FAFBFF',
        'void-2': '#F1F2FC',
        panel: '#FFFFFF',
        'panel-raised': '#F3F4FD',
        line: '#E6E7F4',
        'line-strong': '#CFD2EC',

        // Ink — deep indigo-black text
        ink: '#0C1230',
        'ink-dim': '#565E82',
        'ink-faint': '#8A90B0',

        // Brand — exact electric indigo-blue from the logo
        blue: {
          DEFAULT: '#2E1EE0',
          soft: 'rgba(46,30,224,0.10)',
          50: '#EFEDFF',
          100: '#E0DCFF',
          400: '#5B4EF2',
          500: '#3B2BEA',
          600: '#2417C4',
          700: '#1B1099',
        },
        // Electric accent used for glow / highlights
        sky: {
          DEFAULT: '#4361FF',
          soft: 'rgba(67,97,255,0.12)',
        },
        // Deep indigo for eyebrows / labels
        navy: {
          DEFAULT: '#171266',
          soft: 'rgba(23,18,102,0.10)',
        },

        // Semantic
        pass: '#2E1EE0', // positive marks stay on-brand blue
        fail: '#94A3B8', // negative/✕ marks are muted slate, not red
        warn: '#171266',
        danger: '#DC2626', // reserved solely for form validation errors
      },
      fontFamily: {
        // Modern SaaS typography: Plus Jakarta Sans for all UI elements
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        hand: ['Caveat', 'ui-rounded', 'cursive'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.8vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.8vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.85rem, 3.9vw, 2.9rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
      },
      maxWidth: { content: '1200px', prose: '68ch' },
      borderRadius: { xl: '0.875rem', '2xl': '1.125rem' },
      boxShadow: {
        glow: '0 0 0 1px rgba(46,30,224,0.28), 0 12px 40px -12px rgba(46,30,224,0.5)',
        'glow-sky': '0 0 0 1px rgba(67,97,255,0.26), 0 12px 40px -12px rgba(67,97,255,0.45)',
        card: '0 14px 40px -22px rgba(28,20,120,0.22)',
        'card-hover': '0 22px 55px -24px rgba(28,20,120,0.30)',
        pill: '0 12px 30px -12px rgba(28,20,120,0.28), 0 2px 6px -2px rgba(28,20,120,0.12)',
      },
      backgroundImage: {
        'radial-blue': 'radial-gradient(circle at 30% 20%, rgba(46,30,224,0.12), transparent 55%)',
        'radial-dual':
          'radial-gradient(circle at 22% 12%, rgba(46,30,224,0.14), transparent 50%), radial-gradient(circle at 82% 85%, rgba(67,97,255,0.12), transparent 50%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: { '50%': { opacity: '0' } },
        sweep: {
          '0%': { transform: 'translateY(-4%)' },
          '50%': { transform: 'translateY(102%)' },
          '100%': { transform: 'translateY(-4%)' },
        },
        flicker: {
          '0%,100%': { opacity: '0' },
          '45%': { opacity: '0' },
          '50%': { opacity: '1' },
          '65%': { opacity: '0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '0.9' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        // Attention blink: fill flashes twice then holds (used on icon hover).
        'icon-flash': {
          '0%': { opacity: '0' },
          '25%': { opacity: '1' },
          '45%': { opacity: '0.25' },
          '70%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'icon-flash': 'icon-flash 0.55s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease forwards',
        blink: 'blink 1s step-end infinite',
        sweep: 'sweep 5.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        marquee: 'marquee 34s linear infinite',
        // Announcement ticker: one message crosses, then a long gap.
        'marquee-ticker': 'marquee 18s linear infinite',
        'marquee-ticker-wide': 'marquee 26s linear infinite',
      },
      transitionTimingFunction: { 'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};

export default config;
