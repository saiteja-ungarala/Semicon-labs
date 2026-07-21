/**
 * Sample engineering challenges, adapted from the platform brief's real-project
 * examples. Presented in the Problem → Investigation → Outcome format (the
 * company site's "Projects" pattern, repurposed for learning content).
 */

export type ChallengeDomain = 'PD' | 'DV';

export interface SampleChallenge {
  id: string;
  domain: ChallengeDomain;
  domainName: string;
  skill: string;
  level: 'Guided' | 'Independent' | 'Assessment';
  title: string;
  problem: string;
  investigation: string;
  outcome: string;
}

export const sampleChallenges: SampleChallenge[] = [
  {
    id: 'pd-setup-cts',
    domain: 'PD',
    domainName: 'Physical Design',
    skill: 'Static Timing Analysis',
    level: 'Guided',
    title: 'Setup violation appears after CTS',
    problem: 'A block that met timing pre-CTS now shows a 0.42ns setup violation on a critical path.',
    investigation: 'Attribute the slack loss between clock skew and net delay, and locate the unbalanced clock-tree branch.',
    outcome: 'Resize buffers, re-run incremental CTS, and confirm positive slack across every corner.',
  },
  {
    id: 'pd-congestion',
    domain: 'PD',
    domainName: 'Physical Design',
    skill: 'Place & Route',
    level: 'Independent',
    title: 'Congestion hotspot blocks routing',
    problem: 'Global route reports a congestion hotspot in one region that will not resolve on its own.',
    investigation: 'Read the congestion map, separate cause from symptom, and decide whether placement or routing is at fault.',
    outcome: 'Apply a targeted placement change and prove the region routes clean without new violations.',
  },
  {
    id: 'pd-drc',
    domain: 'PD',
    domainName: 'Physical Design',
    skill: 'Physical Verification',
    level: 'Assessment',
    title: 'DRC violations block signoff',
    problem: 'A signoff run returns a cluster of DRC violations across two metal layers.',
    investigation: 'Interpret the DRC report, trace each violation to its root, and rule out false errors from the deck.',
    outcome: 'Fix the true violations, re-run, and judge whether the block is genuinely signoff-ready.',
  },
  {
    id: 'dv-regression',
    domain: 'DV',
    domainName: 'Design Verification',
    skill: 'Functional Verification',
    level: 'Guided',
    title: 'A regression test starts failing',
    problem: 'An overnight regression flips one test to FAIL with no obvious change in the log.',
    investigation: 'Reproduce the failure, isolate the failing transaction, and separate DUT bug from testbench issue.',
    outcome: 'Identify the true root cause and validate the fix against the expected functional result.',
  },
  {
    id: 'dv-coverage',
    domain: 'DV',
    domainName: 'Design Verification',
    skill: 'Coverage Analysis',
    level: 'Independent',
    title: 'Coverage stalls at 82%',
    problem: 'Functional coverage plateaus well short of target and more random seeds are not helping.',
    investigation: 'Distinguish genuine coverage holes from unreachable or excluded bins, and find what stimulus is missing.',
    outcome: 'Write directed stimulus that closes the real gap and drives coverage to the target.',
  },
  {
    id: 'dv-assertion',
    domain: 'DV',
    domainName: 'Design Verification',
    skill: 'Protocol & Assertions',
    level: 'Assessment',
    title: 'Intermittent assertion violation',
    problem: 'An SVA fires only on certain seeds, pointing to a rare protocol corner case.',
    investigation: 'Trace the failing assertion to the exact cycle and reconstruct the interleaving that triggers it.',
    outcome: 'Explain the corner case, fix or waive it correctly, and prove the protocol now holds.',
  },
];

/** Semiconductor terms for the hero marquee (adapted from the trust-logo row). */
export const marqueeTerms = [
  'SYNTHESIS',
  'PLACE & ROUTE',
  'CLOCK TREE SYNTHESIS',
  'STATIC TIMING ANALYSIS',
  'PHYSICAL VERIFICATION',
  'UVM',
  'FUNCTIONAL COVERAGE',
  'ASSERTIONS',
  'PROTOCOL COMPLIANCE',
  'REGRESSION TRIAGE',
  'DRC / LVS',
  'TIMING ECO',
];
