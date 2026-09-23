/**
 * "Who We Serve" — the three audience segments the site is organised around.
 * These mirror the header dropdown exactly (Individuals / Teams / Corporates)
 * so the nav and the page never disagree; each card links to its own page.
 */
export type AudienceIcon = 'individual' | 'team' | 'enterprise';

export interface Audience {
  slug: string;
  icon: AudienceIcon;
  title: string;
  planLabel: string;
  summary: string;
  points: string[];
  cta: { label: string; to: string };
}

export const audiences: Audience[] = [
  {
    // Entry point for people with no VLSI background yet. Unlike the other
    // three this has no audience page of its own — it sells a single ₹499
    // pack, so the CTA goes straight to the plan cards on /pricing.
    slug: 'launch-pad',
    icon: 'individual',
    title: 'VLSI Launch Pad',
    planLabel: '₹499 · one-time',
    summary:
      'For all ECE & EEE graduates and VLSI aspirants. Explore VLSI workflows, access premium PD & DV learning content, and get 10 hours of hands-on lab experience for just ₹499.',
    points: [
      '10 Hours VLSI Lab Access — Practice, explore and experience real VLSI workflows',
      'Access to complete VLSI Learning Content for PD & DV — Covering Basics to Advanced Core Topics with Self-Assessment',
      'Industry EDA Tools — Cadence, Synopsys & Siemens',
      '7-Day Lab Data Backup — Your work remains backed up for 1 week after lab expiry',
    ],
    cta: { label: 'Start with VLSI Launch Pad', to: '/pricing#plans' },
  },
  {
    slug: 'individuals',
    icon: 'individual',
    title: 'VLSI Trained Fresher',
    planLabel: 'Individual plan',
    summary:
      'VLSI Trained Freshers preparing for a first semiconductor role, and working engineers going deeper. Build real project experience on the exact Modules live projects demand.',
    points: [
      'Guided challenges that teach the thought process',
      'Independent & expert-level challenges as you progress',
      'Verified module certificates you can point to',
    ],
    cta: { label: 'For VLSI Trained Freshers', to: '/who-we-serve/individuals' },
  },
  {
    slug: 'teams',
    icon: 'team',
    title: 'Teams',
    planLabel: 'Team plan · 2+ seats',
    summary:
      'Training a group of engineers together. Give your whole cohort the same hands-on, validated challenge experience with shared progress tracking.',
    points: [
      'Group seats with shared progress',
      'Every PD & DV module included',
      'Onboarding built for training cohorts',
    ],
    cta: { label: 'For Teams', to: '/who-we-serve/teams' },
  },
  {
    slug: 'corporates',
    icon: 'enterprise',
    title: 'Corporates',
    planLabel: 'Corporate · 10+ licenses',
    summary:
      'Building semiconductor capability at scale — org-wide or across a department. Custom rollout, admin controls, and reporting to match your programme.',
    points: [
      'Admin roles & usage reporting',
      'Custom rollout and billing terms',
    ],
    cta: { label: 'For Corporates', to: '/who-we-serve/corporates' },
  },
];
