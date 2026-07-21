/**
 * The Semicon Labs curriculum model, taken verbatim in meaning from the
 * platform brief: Domains → Skills → Competencies, plus the proficiency
 * levels every competency progresses through.
 *
 * This is the single source of truth for the Domains page, Competencies page,
 * homepage sections, and (later) the module marketplace filters.
 */

export interface Competency {
  slug: string;
  name: string;
  /** One-line description of what the learner proves at this competency. */
  summary: string;
}

export interface Skill {
  slug: string;
  name: string;
  summary: string;
  competencies: Competency[];
}

export interface Domain {
  slug: string;
  code: 'PD' | 'DV';
  name: string;
  /** Short pipeline tag, e.g. "SYNTHESIS · PNR · CTS · STA · PV". */
  pipeline: string;
  tagline: string;
  description: string;
  skills: Skill[];
}

export const domains: Domain[] = [
  {
    slug: 'physical-design',
    code: 'PD',
    name: 'Physical Design',
    pipeline: 'SYNTHESIS · PNR · CTS · STA · PV',
    tagline: 'Turn a netlist into a manufacturable, timing-clean layout.',
    description:
      'Physical Design is where logical intent becomes silicon reality. You work the problems that only appear once a design is placed, routed, and clocked — timing that will not close, congestion that will not route, and violations that block signoff.',
    skills: [
      {
        slug: 'static-timing-analysis',
        name: 'Static Timing Analysis',
        summary: 'Constrain the design correctly, then drive setup and hold to closure.',
        competencies: [
          { slug: 'constraint-development', name: 'Constraint Development', summary: 'Author SDC that models real design intent — clocks, exceptions, I/O timing.' },
          { slug: 'constraint-debugging', name: 'Constraint Debugging', summary: 'Find the missing, wrong, or over-constrained exceptions hiding a real problem.' },
          { slug: 'setup-closure', name: 'Setup Closure', summary: 'Diagnose and close setup violations across corners without breaking hold.' },
          { slug: 'hold-closure', name: 'Hold Closure', summary: 'Fix hold violations after CTS without regressing setup or area.' },
          { slug: 'timing-eco-analysis', name: 'Timing ECO Analysis', summary: 'Scope, evaluate, and validate an ECO against the expected timing outcome.' },
        ],
      },
      {
        slug: 'place-and-route',
        name: 'Place & Route',
        summary: 'Get the design placed, congestion-free, and fully routed.',
        competencies: [
          { slug: 'congestion-analysis', name: 'Congestion Analysis', summary: 'Read congestion maps, locate hotspots, and reason about their cause.' },
          { slug: 'placement-optimization', name: 'Placement Optimization', summary: 'Improve placement for timing and routability under real floorplan limits.' },
          { slug: 'routing-closure', name: 'Routing Closure', summary: 'Resolve the last shorts, opens, and DRC-driven routing failures.' },
        ],
      },
      {
        slug: 'physical-verification',
        name: 'Physical Verification',
        summary: 'Clear DRC and LVS and prove the design is signoff-ready.',
        competencies: [
          { slug: 'drc-debug', name: 'DRC Debug', summary: 'Interpret DRC reports, trace the root violation, and fix without new errors.' },
          { slug: 'lvs-debug', name: 'LVS Debug', summary: 'Chase down layout-versus-schematic mismatches to their real source.' },
          { slug: 'signoff-readiness', name: 'Signoff Readiness', summary: 'Judge whether a block is genuinely ready to hand off to signoff.' },
        ],
      },
    ],
  },
  {
    slug: 'design-verification',
    code: 'DV',
    name: 'Design Verification',
    pipeline: 'FUNCTIONAL · UVM · ASSERTIONS · COVERAGE · PROTOCOL',
    tagline: 'Prove the design does what it should — and catch it when it does not.',
    description:
      'Design Verification is investigation as a discipline. You triage failing regressions, chase functional bugs to root cause, close coverage that will not budge, and debug the corner cases that only surface under real stimulus.',
    skills: [
      {
        slug: 'functional-verification',
        name: 'Functional Verification',
        summary: 'Build the testbench, reproduce failures, and drive them to root cause.',
        competencies: [
          { slug: 'testbench-development', name: 'Testbench Development', summary: 'Construct a UVM environment that actually exercises the design intent.' },
          { slug: 'functional-debug', name: 'Functional Debug', summary: 'Reproduce a failing test and isolate the failing transaction.' },
          { slug: 'root-cause-analysis', name: 'Root Cause Analysis', summary: 'Separate symptom from cause across DUT, testbench, and stimulus.' },
        ],
      },
      {
        slug: 'coverage-analysis',
        name: 'Coverage Analysis',
        summary: 'Understand what is unverified and close the gap deliberately.',
        competencies: [
          { slug: 'coverage-closure', name: 'Coverage Closure', summary: 'Drive functional and code coverage to target with meaningful stimulus.' },
          { slug: 'gap-investigation', name: 'Gap Investigation', summary: 'Distinguish real coverage holes from unreachable or excluded bins.' },
        ],
      },
      {
        slug: 'protocol-and-assertions',
        name: 'Protocol & Assertions',
        summary: 'Verify protocol compliance and debug assertion failures.',
        competencies: [
          { slug: 'protocol-compliance', name: 'Protocol Compliance', summary: 'Validate transactions against the specification, not just the happy path.' },
          { slug: 'assertion-violations', name: 'Assertion Violations', summary: 'Trace an SVA failure to the exact cycle and cause.' },
          { slug: 'corner-case-debug', name: 'Corner Case Debug', summary: 'Reproduce and resolve the rare interleavings that break silicon.' },
        ],
      },
    ],
  },
];

export interface ProficiencyLevel {
  key: 'beginner' | 'specialist' | 'expert';
  badge: string;
  title: string;
  challengeType: string;
  description: string;
}

export const proficiencyLevels: ProficiencyLevel[] = [
  {
    key: 'beginner',
    badge: 'Beginner',
    title: 'Guided Challenges',
    challengeType: 'Guided',
    description:
      'You are introduced to the problem, the methodology, and the thought process an experienced engineer would use to approach it — so you understand the workflow before you are asked to solve anything alone.',
  },
  {
    key: 'specialist',
    badge: 'Specialist',
    title: 'Independent Challenges',
    challengeType: 'Independent',
    description:
      'You investigate and solve similar scenarios with minimal guidance, implement the fix, and validate the outcome — reinforcing judgment through repeated application.',
  },
  {
    key: 'expert',
    badge: 'Expert',
    title: 'Assessment Challenges',
    challengeType: 'Assessment',
    description:
      'You solve a new problem independently, evaluating trade-offs across multiple constraints from start to finish — demonstrating practical competency and engineering judgment.',
  },
];

/** The universal learning loop every challenge follows. */
export const learningLoop = [
  {
    step: 'PROBLEM',
    title: "You're handed a failure",
    description:
      'A regression fails, timing is not closing, coverage has a gap. No hints yet — just the report, exactly as it would land on your desk.',
  },
  {
    step: 'INVESTIGATION',
    title: 'You dig into root cause',
    description:
      'Read logs, interpret reports, and narrow down what is actually broken — not what the textbook says should be.',
  },
  {
    step: 'SOLUTION',
    title: 'You implement a fix',
    description:
      'Evaluate the trade-offs, choose an approach, and apply it the way you would on a live project.',
  },
  {
    step: 'VALIDATION',
    title: "You prove it's resolved",
    description:
      'Your fix is checked against the expected engineering outcome — objectively, against the result, not by opinion.',
  },
] as const;

/** Homepage trust-strip statistics, derived from the curriculum above. */
export const platformStats = [
  { value: '2', label: 'Engineering Domains' },
  { value: '11', label: 'Skill Tracks' },
  { value: '25', label: 'Competencies' },
  { value: '3', label: 'Proficiency Levels' },
  { value: '2,300+', label: 'Active Learners' },
];

/** Traditional learning vs. Semicon Labs — the core positioning table. */
export const comparison: { aspect: string; traditional: string; semicon: string }[] = [
  { aspect: 'How you learn', traditional: 'Watch tutorials & lectures', semicon: 'Solve real engineering problems' },
  { aspect: 'What you practice', traditional: 'Tool commands & flow steps', semicon: 'Diagnosing failures & driving issues to closure' },
  { aspect: 'The material', traditional: 'Isolated, simplified examples', semicon: 'Industry-inspired challenges from real projects' },
  { aspect: 'What you build', traditional: 'Recall & tool familiarity', semicon: 'Investigation, judgment & trade-off evaluation' },
  { aspect: 'Feedback', traditional: 'Completion checkmarks', semicon: 'Objective validation against engineering outcomes' },
  { aspect: 'What it measures', traditional: 'Hours completed', semicon: 'Demonstrated competency, level by level' },
  { aspect: 'What it prepares you for', traditional: 'Interviews', semicon: 'Real semiconductor projects' },
];
