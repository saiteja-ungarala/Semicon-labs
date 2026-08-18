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
    mark: '/images/logo-mark.png', // SL monogram only
    wordmark: '/images/main-logo.png', // horizontal SEMICON LABS wordmark (primary)
  },
  // Live accounts. The LinkedIn entry is the PUBLIC company URL — the admin
  // dashboard link (/admin/dashboard/) only resolves for page administrators.
  social: {
    linkedin: 'https://www.linkedin.com/company/133293910/',
    instagram: 'https://www.instagram.com/semicon.labs/',
    youtube: 'https://www.youtube.com/@SemiconLabs',
    facebook: 'https://www.facebook.com/profile.php?id=61590531068682',
  },
} as const;

/** Display order + accessible names + brand hover colour for the social row. */
export const socialLinks = [
  { key: 'linkedin', label: 'LinkedIn', href: site.social.linkedin, brand: '#0A66C2' },
  { key: 'instagram', label: 'Instagram', href: site.social.instagram, brand: '#E1306C' },
  { key: 'youtube', label: 'YouTube', href: site.social.youtube, brand: '#FF0000' },
  { key: 'facebook', label: 'Facebook', href: site.social.facebook, brand: '#1877F2' },
] as const;

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
      { label: 'Individuals', to: '/who-we-serve/individuals', description: 'VLSI-trained fresher / VLSI working professional' },
      { label: 'Teams', to: '/who-we-serve/teams', description: 'Fast-growing VLSI teams · min 2' },
      { label: 'Corporates', to: '/who-we-serve/corporates', description: 'Org-wide enablement · min 10 licenses' },
    ],
  },
  {
    // Curriculum hierarchy, top to bottom: Domains → Skills → Modules → Test Cases.
    label: 'Domains',
    to: '/domains',
    children: [
      { label: 'Physical Design', to: '/domains/physical-design', description: 'Synthesis · PnR · CTS · STA · PV' },
      { label: 'Design Verification', to: '/domains/design-verification', description: 'Verilog · SV · UVM · Coverage' },
      { label: 'Analog Layout', to: '/domains/analog-layout', description: 'Custom layout · Matching · Signoff' },
    ],
  },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Who We Serve', to: '/who-we-serve' },
      { label: 'Curriculum', to: '/domains' },
      { label: 'Courses', to: '/modules' },
      { label: 'Modules', to: '/competencies' },
      { label: 'Pricing', to: '/pricing' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'support@semiconlabs.com', to: 'mailto:support@semiconlabs.com' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Refund Policy', to: '/refund' },
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];
