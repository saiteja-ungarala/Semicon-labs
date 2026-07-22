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

export interface NavChild {
  label: string;
  to: string;
  description?: string;
}

export interface NavItem {
  label: string;
  to: string;
  /** When present, the header item opens a dropdown of these links. */
  children?: NavChild[];
}

// Header nav mirrors the client reference, with dropdowns for the two rich items.
export const primaryNav: NavItem[] = [
  {
    label: 'Who We Serve',
    to: '/who-we-serve',
    children: [
      { label: 'Students & Freshers', to: '/who-we-serve#students-freshers', description: 'Get placement-ready before day one' },
      { label: 'Working Engineers', to: '/who-we-serve#working-engineers', description: 'Deepen your PD or DV expertise' },
      { label: 'Teams & Cohorts', to: '/who-we-serve#teams-cohorts', description: 'Train a group together · 5+ seats' },
      { label: 'Enterprises & Universities', to: '/who-we-serve#enterprises-universities', description: 'Roll out at scale · 25+ seats' },
    ],
  },
  {
    // Curriculum hierarchy, top to bottom: Domains → Skills → Competencies → Modules → Test Cases.
    label: 'Domains',
    to: '/domains',
    children: [
      { label: 'Physical Design', to: '/domains/physical-design', description: 'Synthesis · PnR · CTS · STA · PV' },
      { label: 'Design Verification', to: '/domains/design-verification', description: 'Functional · UVM · Coverage · Assertions' },
      { label: 'Skills', to: '/domains', description: 'Specialized tracks within each domain' },
      { label: 'Competencies', to: '/competencies', description: 'The exact capabilities you prove' },
      { label: 'Modules', to: '/modules', description: 'Hands-on, buyable courses' },
      { label: 'Test Cases', to: '/#challenges', description: 'Objective validation on every challenge' },
    ],
  },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Who We Serve', to: '/who-we-serve' },
      { label: 'Curriculum', to: '/domains' },
      { label: 'Courses', to: '/modules' },
      { label: 'Competencies', to: '/competencies' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
      { label: 'FAQ', to: '/faq' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Resource Library', to: '/resources' },
      { label: 'Refund Policy', to: '/refund' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];
