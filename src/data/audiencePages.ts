/**
 * Dedicated "Who We Serve" audience pages — Individuals / Teams / Corporates.
 * Content adapted from the client's reference site, rewritten in our voice.
 */

export interface AudiencePageFeature {
  title: string;
  copy: string;
}

/** A single tier shown side-by-side when a plan has more than one. */
export interface AudiencePageTier {
  name: string;
  price: string;
  /** Sits under the price, e.g. "₹14,160 incl. GST". */
  note: string;
  highlight?: boolean;
}

export interface AudiencePagePricing {
  name: string;
  price: string;
  priceNote: string;
  popular?: boolean;
  features: string[];
  cta: { label: string; to: string };
  /**
   * Two-tier plans (Teams) render these instead of the single `price`, so the
   * card carries the same numbers as the pricing page in a narrower column.
   * `price`/`priceNote` stay as the fallback for one-tier audiences.
   */
  tiers?: AudiencePageTier[];
  /** One line of small print under the tiers, e.g. the session definition. */
  fineprint?: string;
}

export interface AudiencePage {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  /** Hero artwork (background-removed PNG in web/public/images/audiences/). */
  heroArt: string;
  sectionEyebrow: string;
  sectionTitle: string;
  sectionLede: string;
  features: AudiencePageFeature[];
  pricing: AudiencePagePricing;
}

export const audiencePages: AudiencePage[] = [
  {
    slug: 'individuals',
    name: 'Individuals',
    heroArt: '/images/audiences/individuals.png',
    eyebrow: 'who we serve · individuals',
    title: 'Individuals',
    lede:
      "Whether you're a VLSI-trained fresher aiming for your first placement or a working professional looking to upskill — Semicon Labs helps you build industry-ready expertise through real VLSI labs, EDA tools, practical workflows, and AI-powered mock interviews designed for placement readiness.",
    sectionEyebrow: 'more than industry tools',
    sectionTitle: 'A complete VLSI learning experience.',
    sectionLede:
      'Tools alone don’t make you project-ready. Everything around them here is built to turn practice into proof.',
    features: [
      {
        title: 'Progress tracking that keeps you accountable',
        copy: 'Skill assessments and performance benchmarks that show exactly how far you’ve come — and what a recruiter can trust.',
      },
      {
        title: 'Flexible lab credits. Zero waste.',
        copy: 'Top up when you need it, use it when you can. Credit-based lab time means you never pay for idle hours.',
      },
      {
        title: 'Learning material that actually reflects the industry',
        copy: 'Content written and updated by working professionals — current tools, current flows, current standards.',
      },
      {
        title: '750+ real world scenarios to solve',
        copy: 'Golden, buggy, guided and challenge labs distilled from live project failures — the practice bank no other platform has.',
      },
      {
        title: 'Objective validation on every solve',
        copy: 'Your fix is checked against the expected engineering outcome. What you prove here is what you can point to in interviews.',
      },
    ],
    pricing: {
      name: 'Individual Plan',
      price: '₹12,600',
      priceNote: '1 user · per domain',
      features: [
        'All modules and certifications in the domain',
        'Self-paced learning with completion certification',
        'Cloud-based labs — nothing to install',
        'Tool switching across Cadence, Synopsys & Siemens',
        'Multi-domain access options',
      ],
      cta: { label: 'View plans & pricing', to: '/pricing' },
    },
  },
  {
    slug: 'teams',
    name: 'Teams',
    heroArt: '/images/audiences/teams.png',
    eyebrow: 'who we serve · teams',
    title: 'Teams',
    lede:
      'Designed for fast-growing VLSI teams that need flexibility and real execution capability. Browser-based Cadence, Synopsys and Siemens labs, real-time practical progress, and access that expands as project demands evolve.',
    sectionEyebrow: 'why teams choose semicon labs',
    sectionTitle: 'Built to keep your engineering team in motion.',
    sectionLede:
      'Eight ways Semicon Labs removes friction, accelerates execution, and turns your team into a high-velocity semiconductor workforce.',
    features: [
      {
        title: 'No waiting for lab machines or tool setup',
        copy: 'Instant environments: every engineer gets a ready EDA workspace in the browser, from day one.',
      },
      {
        title: 'Your team practices on real industry tools',
        copy: 'Industry-grade Cadence, Synopsys and Siemens flows — not simulators.',
      },
      {
        title: 'Zero infrastructure. Maximum productivity.',
        copy: 'No licenses to procure, no servers to maintain, no IT queue. We carry the overhead; your team ships.',
      },
      {
        title: 'All domains in one place',
        copy: 'Physical Design, Design & Verification and Analog Layout — one platform for the whole team.',
      },
      {
        title: 'Faster ramp-up for every new engineer',
        copy: 'Structured, validated practice compresses onboarding from months of shadowing to weeks of solving.',
      },
      {
        title: 'Built-in support at every step',
        copy: 'AI assistance, guided workflows and automatic scenario validation keep engineers moving without waiting on seniors.',
      },
      {
        title: 'Catch issues before they become bigger problems',
        copy: 'Validation-first practice builds the habit of proving a fix — the same discipline your projects need.',
      },
      {
        title: 'Real-time team progress tracking',
        copy: 'Unified visibility into who has mastered what, with dynamic allocation as project demands shift.',
      },
    ],
    // Numbers mirror the Teams tab on /pricing exactly — update both together.
    pricing: {
      name: 'Team Plans',
      price: '₹12,000',
      priceNote: 'per session · excl. GST',
      popular: true,
      tiers: [
        { name: 'Basic', price: '₹12,000', note: '₹14,160 incl. GST' },
        { name: 'Pro', price: '₹13,500', note: '₹15,930 incl. GST', highlight: true },
      ],
      fineprint: '1 session = 1 seat × 1 month × 240 lab hours · minimum 2 sessions',
      features: [
        'Every PD & DV module included',
        'Dedicated admin and manager accounts',
        'Automated practical evaluation + certification',
        'Up to 30% off at 5 sessions',
      ],
      cta: { label: 'View plans & pricing', to: '/pricing?plan=teams' },
    },
  },
  {
    slug: 'corporates',
    name: 'Corporates',
    heroArt: '/images/audiences/corporates.png',
    eyebrow: 'who we serve · corporates',
    title: 'Corporates',
    lede:
      'Empower your entire semiconductor organization through one unified platform built for practical VLSI execution — enterprise rollout, enterprise visibility, enterprise economics.',
    sectionEyebrow: 'why corporates choose semicon labs',
    sectionTitle: 'Workforce capability, provable at scale.',
    sectionLede:
      'From fresher ramp-up to org-wide benchmarking — the platform your L&D and engineering leadership can both stand behind.',
    features: [
      {
        title: 'Built for organization-scale workforce enablement',
        copy: 'Enterprise rollout with flexible licensing — Corp 400/200-hour models, from 10 licenses to whole divisions.',
      },
      {
        title: 'Real EDA infrastructure without procurement headaches',
        copy: 'Browser-based Cadence, Synopsys and Siemens access. No tool procurement cycles, no license servers.',
      },
      {
        title: 'Compress engineering ramp-up from years to months',
        copy: 'Freshers and lateral hires reach project-readiness dramatically faster on validated, real-flow practice.',
      },
      {
        title: 'Cross-domain & cross-vendor learning in one platform',
        copy: 'Physical Design, Design & Verification and Analog Layout across all three major vendors — one contract, one dashboard.',
      },
      {
        title: 'Standardized practical benchmarking across the organization',
        copy: 'Automated validation pipelines give every engineer the same objective bar — compare capability, not certificates.',
      },
      {
        title: 'Enterprise visibility & scale-friendly commercials',
        copy: 'Centralized dashboards, flexible License allocation, and up to 40% volume discounts as you scale.',
      },
      {
        title: 'Progress Tracking',
        copy: 'Track all your organization users progress in one platform and ensure everything stays on the right track.',
      },
    ],
    pricing: {
      name: 'Corporate Plan',
      price: 'Custom',
      priceNote: '10+ users · tailored rollout',
      features: [
        'All domains, all modules, all vendors',
        'Self-paced learning + certification',
        'Admin roles, usage reporting & dashboards',
        'Dedicated rollout and success support',
      ],
      cta: { label: 'Speak with an expert', to: '/contact' },
    },
  },
];
