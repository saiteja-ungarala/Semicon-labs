import { SectionHead, Button } from '@semiconlabs/web';

export const Split = () => (
  <SectionHead
    eyebrow="the skills companies are hiring for — right now"
    title={<>VLSI Current Hiring <span className="text-gradient">1 Lakh+</span></>}
    lede="Real project challenges on industry EDA tools, structured domain by domain."
  />
);

export const Centered = () => (
  <SectionHead
    align="center"
    eyebrow="what learners say"
    title={<>Reviewed by the engineers <span className="text-gradient">who trained here</span></>}
  />
);

export const WithControl = () => (
  <SectionHead
    eyebrow="pricing, made simple"
    title="Everything you need to break into VLSI"
    right={<Button variant="secondary" size="sm">Compare plans</Button>}
  />
);
