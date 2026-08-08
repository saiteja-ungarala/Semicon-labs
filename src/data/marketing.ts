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
    tagline: '2+ user minimum. Session = 1 month',
    features: [
      'All domain modules',
      'Self-paced learning',
      'Completion certification included',
      'Tool switching',
      'Reader access add-on',
    ],
    cta: { label: 'Get Started', to: '/register?plan=team' },
  },
  {
    id: 'corporate',
    name: 'Corporate',
    priceMonthly: 0,
    cadence: 'session',
    tagline: '10+ license minimum',
    features: [
      'All domain modules',
      'Self-paced learning',
      'Completion certification included',
      'Labs billed via tokens',
      'Tool switching',
      'Client admin roles',
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
  logo?: 'google' | 'none'; // Defines which logo to render in the UI
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Bite-sized training and mentorship helped me learn advanced skills. It should be introduced to students of all ages.',
    name: 'Sayak Dutta',
    role: 'Software Engineer',
    rating: 5,
    logo: 'google',
  },
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
    category: 'learning',
    question: 'What is the difference between Skills and Modules?',
    answer:
      'Skills are certification paths made up of Modules, Real world scenarios, and a Quiz. Once you complete all of these, you earn a certificate for that skill. If you complete only a Module, you cannot earn a certificate.',
  },
  {
    category: 'billing',
    question: 'What is included in Basic vs Pro plans?',
    answer:
      'In the Basic plan, you can only work with one tool. In the Pro plan, you can switch tools and handle bigger projects/labs.',
  },
  {
    category: 'learning',
    question: 'How can I get a Certificate?',
    answer:
      'You can earn a certificate only after completing all the Modules in your enrolled skill.',
  },
  {
    category: 'platform',
    question: 'What content is inside a Module?',
    answer:
      'The Content Inside the Modules are Objectives, Core Concepts, Lab Guide, Success Criteria and a Small Quiz.',
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
