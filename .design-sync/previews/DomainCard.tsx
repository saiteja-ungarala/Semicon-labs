import { DomainCard } from '@semiconlabs/web';

const physicalDesign = {
  slug: 'physical-design',
  code: 'PD' as const,
  name: 'Physical Design',
  pipeline: 'SYNTHESIS · PNR · CTS · STA · PV',
  tagline: 'Take RTL to a manufacturable layout.',
  description:
    'Floorplan, place and route, clock trees and timing closure — the full backend flow on industry EDA tools.',
  skills: [],
};

const designVerification = {
  slug: 'design-verification',
  code: 'DV' as const,
  name: 'Design Verification',
  pipeline: 'VERILOG · SV · UVM · ASSERTIONS · COVERAGE',
  tagline: 'Prove the design does what the spec says.',
  description:
    'Testbenches, constrained-random stimulus, coverage closure and the debugging that follows a failure.',
  skills: [],
};

export const PhysicalDesign = () => <DomainCard domain={physicalDesign} />;
export const DesignVerification = () => <DomainCard domain={designVerification} />;
