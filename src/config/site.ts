/**
 * Central site configuration — brand, navigation, and canonical metadata.
 * Everything that appears in more than one place lives here so copy stays
 * consistent across the marketing site and the app shell.
 */

export const site = {
  name: 'Semicon Labs',
  legalName: 'Semicon Labs',
  tagline: 'Learn Semiconductor Engineering by Solving Real Project Problems',
  shortTagline: 'The platform for engineering thinking, not command memorization.',
  description:
    'Semicon Labs is an execution-first semiconductor learning platform. Solve real engineering challenges in Physical Design and Design Verification — investigate, fix, and validate, just like on the job.',
  url: (import.meta.env.VITE_SITE_URL as string) || 'https://semiconlabs.com',
  locale: 'en_US',
  email: 'hello@semiconlabs.com',
  twitter: '@semiconlabs',
  logos: {
    color: '/images/color-logo.png', // full vertical lockup (SL + wordmark)
    white: '/images/white-logo.png',
    black: '/images/black-logo.png',
    mark: '/images/logo-mark.png', // SL monogram only (for the horizontal nav lockup)
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/semiconlabs',
    twitter: 'https://twitter.com/semiconlabs',
    youtube: 'https://www.youtube.com/@semiconlabs',
    github: 'https://github.com/semiconlabs',
  },
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Modules', to: '/modules' },
  { label: 'Competencies', to: '/competencies' },
  { label: 'Domains', to: '/domains' },
  { label: 'How It Works', to: '/#how' },
  { label: 'Pricing', to: '/pricing' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Competencies', to: '/competencies' },
      { label: 'Domains', to: '/domains' },
      { label: 'How It Works', to: '/#how' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Our Vision', to: '/about#vision' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Resource Library', to: '/resources' },
      { label: 'Help Center', to: '/faq' },
      { label: 'Refund Policy', to: '/refund' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];
