/** Pricing, testimonials, FAQs, and the "why traditional learning fails" copy. */

export interface PricingPlan {
  id: 'individual' | 'team' | 'corporate';
  name: string;
  priceMonthly: number;
  priceStrikeMonthly?: number;
  cadence: string;
  featured?: boolean;
  badge?: string;
  tagline: string;
  features: string[];
  cta: { label: string; to: string };
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'individual',
    name: 'Individual',
    priceMonthly: 12600,
    cadence: '1 user',
    tagline: 'applicable for 1 user',
    features: [
      'All modules and certifications accessible per domain',
      'Self-paced learning',
      'Completion certification included',
      'Cloud-based labs',
      'Tool switching',
      'Renewal available',
      'Multi-domain access',
    ],
    cta: { label: 'Get Started', to: '/register' },
  },
  {
    id: 'team',
    name: 'Team',
    priceMonthly: 9000,
    cadence: 'session',
    featured: true,
    badge: 'Most Popular',
    tagline: '5+ user minimum. Session = 1 month',
    features: [
      'All domain modules',
      'Self-paced learning',
      'Completion certification included',
      'Tool switching',
      'Reader access add-on',
      'Custom loyalty programs',
    ],
    cta: { label: 'Get Started', to: '/register?plan=team' },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    priceMonthly: 0,
    cadence: 'session',
    tagline: '25+ user minimum',
    features: [
      'All domain modules',
      'Self-paced learning',
      'Completion certification included',
      'Labs billed via tokens',
      'Tool switching',
      'Client admin roles',
      'Custom loyalty programs',
      'Reader access add-on',
      'Quarterly billing terms',
    ],
    cta: { label: 'Contact Sales', to: '/contact' },
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I'd finished three STA courses and still froze on my first real hold violation. My first Semicon Labs challenge was harder than any of them — in exactly the way I needed.",
    name: 'M. Sharma',
    role: 'Physical Design Engineer, 1st year',
    rating: 5,
  },
  {
    quote:
      'The debug challenges feel exactly like the regression triage I do at work now. I wish this existed before my first project, not after it.',
    name: 'A. Fernandes',
    role: 'Verification Engineer',
    rating: 5,
  },
  {
    quote:
      'Went from Guided to Assessment level on coverage closure in six weeks. That track alone was worth the upgrade.',
    name: 'R. Okafor',
    role: 'Graduate, ECE',
    rating: 5,
  },
  {
    quote:
      'It stopped being about remembering commands and started being about reading a report and knowing what to do next. That shift is the whole point.',
    name: 'K. Nair',
    role: 'Design Verification Engineer',
    rating: 5,
  },
  {
    quote:
      'Objective validation is the difference. I always knew whether I actually fixed it — not whether I wrote a convincing paragraph about it.',
    name: 'T. Mehta',
    role: 'Physical Design Engineer',
    rating: 5,
  },
];

export interface Faq {
  question: string;
  answer: string;
  category: 'getting-started' | 'learning' | 'billing' | 'platform';
}

export const faqs: Faq[] = [
  {
    category: 'platform',
    question: 'Do I need real EDA tool access to solve these challenges?',
    answer:
      'No. Every challenge runs in our environment with the same reports, logs, and outputs you would see on a real project — no license, install, or workstation required.',
  },
  {
    category: 'getting-started',
    question: "I'm a student with no project experience. Is this too advanced?",
    answer:
      'Start at the Guided level. You are walked through the methodology and the thought process an experienced engineer would use, before you are ever asked to solve anything independently.',
  },
  {
    category: 'learning',
    question: 'How is my solution actually graded?',
    answer:
      'Every challenge has an objective validation check tied to the expected engineering outcome — measured against the result, not a human reviewer’s subjective opinion of your write-up.',
  },
  {
    category: 'learning',
    question: 'What is the difference between a domain, a skill, and a competency?',
    answer:
      'A domain is a broad discipline (Physical Design or Design Verification). A skill is a specialized area within it (like Static Timing Analysis). A competency is a specific capability you are measured on (like Setup Closure). You progress competency by competency.',
  },
  {
    category: 'platform',
    question: 'Will this become a full learning platform?',
    answer:
      'Yes. This is Phase One. Individual competency challenges come first; complete, industry-inspired chip-development projects that connect those competencies are on the roadmap. Your progress carries forward.',
  },
  {
    category: 'billing',
    question: 'Can I cancel if it is not for me?',
    answer:
      'Yes — cancel anytime from your account, and every paid plan carries a 7-day money-back guarantee, no questions asked.',
  },
];

/** "Why traditional learning falls short" — the industry-reality gap. */
export const industryDemands = [
  'Diagnose failures',
  'Investigate root causes',
  'Interpret reports and results',
  'Make engineering decisions',
  'Evaluate trade-offs',
  'Drive issues to closure',
];

/** The four pillars from the tone/theme doc ("Why Semicon Labs"). */
export type PillarIcon = 'challenge' | 'analyze' | 'debug' | 'confidence';

export const whyPillars: { icon: PillarIcon; title: string; description: string; spec: string }[] = [
  {
    icon: 'challenge',
    title: 'Learn Through Engineering Challenges',
    description:
      'Each lab is a realistic engineering scenario that requires investigation, analysis, and decision-making — not simply following instructions.',
    spec: 'REAL PROJECT SCENARIOS',
  },
  {
    icon: 'analyze',
    title: 'Build Analytical Thinking',
    description:
      'Develop the ability to understand why a design failed, interpret results, evaluate alternatives, and choose the right solution.',
    spec: 'INTERPRET · EVALUATE · DECIDE',
  },
  {
    icon: 'debug',
    title: 'Master Debugging & Validation',
    description:
      'Debugging and validation are the heart of semiconductor engineering. Every challenge sharpens how you identify issues, validate fixes, and improve design quality.',
    spec: 'OBJECTIVE VALIDATION',
  },
  {
    icon: 'confidence',
    title: 'Develop Execution Confidence',
    description:
      'Gain confidence by solving increasingly complex problems that reflect real-world development rather than classroom exercises.',
    spec: 'GUIDED → INDEPENDENT → EXPERT',
  },
];
