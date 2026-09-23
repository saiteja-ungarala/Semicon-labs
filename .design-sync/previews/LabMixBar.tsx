import { LabMixBar } from '@semiconlabs/web';

export const Default = () => (
  <div className="max-w-md">
    <LabMixBar mix={{ GOLDEN: 4, BUGGY: 6, EXERCISE: 8, GUIDED: 5, CHALLENGE: 3 }} />
  </div>
);

export const TwoTypes = () => (
  <div className="max-w-md">
    <LabMixBar mix={{ GUIDED: 9, CHALLENGE: 4 }} />
  </div>
);
