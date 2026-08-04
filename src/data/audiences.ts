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
    slug: 'individuals',
    icon: 'individual',
    title: 'Individuals',
    planLabel: 'Individual plan',
    summary:
      'Freshers preparing for a first semiconductor role, and working engineers going deeper. Build real project experience on the exact competencies live projects demand.',
    points: [
      'Guided challenges that teach the thought process',
      'Independent & expert-level challenges as you progress',
      'Verified competency certificates you can point to',
    ],
    cta: { label: 'For Individuals', to: '/who-we-serve/individuals' },
  },
  {
    slug: 'teams',
    icon: 'team',
    title: 'Teams',
    planLabel: 'Team plan · 5+ seats',
    summary:
      'Training a group of engineers together. Give your whole cohort the same hands-on, validated challenge experience with shared progress tracking.',
    points: [
      'Group seats with shared progress',
      'Every PD & DV competency included',
      'Onboarding built for training cohorts',
    ],
    cta: { label: 'For Teams', to: '/who-we-serve/teams' },
  },
  {
    slug: 'corporates',
    icon: 'enterprise',
    title: 'Corporates',
    planLabel: 'Corporate · 25+ seats',
    summary:
      'Building semiconductor capability at scale — org-wide or across a department. Custom rollout, admin controls, and reporting to match your programme.',
    points: [
      'Admin roles & usage reporting',
      'Custom rollout and billing terms',
      'Labs provisioned via tokens',
    ],
    cta: { label: 'For Corporates', to: '/who-we-serve/corporates' },
  },
];
