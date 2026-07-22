/**
 * "Who We Serve" — audience segments mapped to the plan that fits them, mirroring
 * the client reference (Individual / Team / Corporate) and extending it with the
 * learner personas from the platform brief (students, working engineers).
 */
export type AudienceIcon = 'student' | 'individual' | 'team' | 'enterprise';

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
    slug: 'students-freshers',
    icon: 'student',
    title: 'Students & Freshers',
    planLabel: 'Starts free',
    summary:
      'Preparing for your first semiconductor role. Build real project experience before day one and walk into interviews able to solve problems, not just recall commands.',
    points: [
      'Guided challenges that teach the thought process',
      'Placement-ready PD & DV competencies',
      'Objective validation you can point to',
    ],
    cta: { label: 'Start free', to: '/register' },
  },
  {
    slug: 'working-engineers',
    icon: 'individual',
    title: 'Working Engineers',
    planLabel: 'Individual plan',
    summary:
      'Already in the field and want to go deeper in Physical Design or Design Verification. Sharpen the exact competencies your live projects demand.',
    points: [
      'Independent & expert-level challenges',
      'Self-paced, lifetime access to courses',
      'Verified competency certificates',
    ],
    cta: { label: 'See plans', to: '/pricing' },
  },
  {
    slug: 'teams-cohorts',
    icon: 'team',
    title: 'Teams & Cohorts',
    planLabel: 'Team plan · 5+ seats',
    summary:
      'Training a group of engineers together. Give your whole cohort the same hands-on, validated challenge experience with shared progress tracking.',
    points: [
      'Group seats with shared progress',
      'All PD & DV domain modules',
      'Onboarding for training cohorts',
    ],
    cta: { label: 'Talk to us', to: '/contact' },
  },
  {
    slug: 'enterprises-universities',
    icon: 'enterprise',
    title: 'Enterprises & Universities',
    planLabel: 'Corporate · 25+ seats',
    summary:
      'Building semiconductor capability at scale — org-wide or across a department. Custom rollout, admin controls, and reporting to match your programme.',
    points: [
      'Admin roles & usage reporting',
      'Custom rollout and billing terms',
      'Labs provisioned via tokens',
    ],
    cta: { label: 'Contact sales', to: '/contact' },
  },
];
