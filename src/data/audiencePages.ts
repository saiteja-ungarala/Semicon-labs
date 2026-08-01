/**
 * Dedicated "Who We Serve" audience pages — Individuals / Teams / Corporates.
 * Content adapted from the client's reference site, rewritten in our voice.
 */

export interface AudiencePageFeature {
  title: string;
  copy: string;
}

export interface AudiencePagePricing {
  name: string;
  price: string;
  priceNote: string;
  popular?: boolean;
  features: string[];
  cta: { label: string; to: string };
}

export interface AudiencePage {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
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
    eyebrow: 'who we serve · individuals',
    title: 'Individuals',
    lede:
      "Whether you're a VLSI-trained fresher preparing for your first semiconductor opportunity or a working professional ready to level up — Semicon Labs moves with you. Learn when you can, wherever you are, with real VLSI labs, industry EDA tools, and workflows built around real execution.",
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
        title: 'Real support from real engineers',
        copy: '24/7 lab access with semiconductor professionals behind it, not a generic helpdesk.',
      },
      {
        title: '750+ real testcases to solve',
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
      cta: { label: 'Get Started', to: '/register' },
    },
  },
  {
    slug: 'teams',
    name: 'Teams',
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
        copy: 'Industry-grade Cadence, Synopsys and Siemens flows — not simulators, not toy environments.',
      },
      {
        title: 'Zero infrastructure. Maximum productivity.',
        copy: 'No licenses to procure, no servers to maintain, no IT queue. We carry the overhead; your team ships.',
      },
      {
        title: 'All domains in one place',
        copy: 'Physical Design, Design Verification, RTL2GDS and Analog Layout — one platform for the whole team.',
      },
      {
        title: 'Faster ramp-up for every new engineer',
        copy: 'Structured, validated practice compresses onboarding from months of shadowing to weeks of solving.',
      },
      {
        title: 'Built-in support at every step',
        copy: 'AI assistance, guided workflows and automatic testcase validation keep engineers moving without waiting on seniors.',
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
    pricing: {
      name: 'Team Plan',
      price: '₹9,000',
      priceNote: 'per session · session = 1 month · 5+ users',
      popular: true,
      features: [
        'All domain modules included',
        'Self-paced learning + completion certification',
        'Tool switching across vendors',
        'Reader access add-on available',
        'Custom loyalty programs for your team',
      ],
      cta: { label: 'Get Started', to: '/contact' },
    },
  },
  {
    slug: 'corporates',
    name: 'Corporates',
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
        copy: 'Browser-based Cadence, Synopsys and Siemens access. No tool procurement cycles, no license servers, no CAPEX.',
      },
      {
        title: 'Compress engineering ramp-up from years to months',
        copy: 'Freshers and lateral hires reach project-readiness dramatically faster on validated, real-flow practice.',
      },
      {
        title: 'Cross-domain & cross-vendor learning in one platform',
        copy: 'RTL2GDS, Physical Design and Verification across all three major vendors — one contract, one dashboard.',
      },
      {
        title: 'Standardized practical benchmarking across the organization',
        copy: 'Automated validation pipelines give every engineer the same objective bar — compare capability, not certificates.',
      },
      {
        title: 'Enterprise visibility & scale-friendly commercials',
        copy: 'Centralized dashboards, flexible seat allocation, and up to 40% volume discounts as you scale.',
      },
      {
        title: 'Just-in-time upskilling without delivery disruption',
        copy: 'Engineers skill up in parallel with delivery — no pulling teams off projects for training weeks.',
      },
      {
        title: '10× more cost-efficient — with recognition built in',
        copy: 'A fraction of traditional training cost, plus a loyalty system that lets you reward top performers with 5% of your subscription.',
      },
    ],
    pricing: {
      name: 'Corporate Plan',
      price: 'Custom',
      priceNote: '25+ users · tailored rollout',
      features: [
        'All domains, all modules, all vendors',
        'Self-paced learning + certification',
        'Token-based lab provisioning',
        'Admin roles, usage reporting & dashboards',
        'Dedicated rollout and success support',
      ],
      cta: { label: 'Speak with an expert', to: '/contact' },
    },
  },
];
