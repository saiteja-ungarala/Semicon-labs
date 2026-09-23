import { LabTypeBadge } from '@semiconlabs/web';

export const AllTypes = () => (
  <div className="flex flex-wrap items-center gap-2.5">
    <LabTypeBadge type="GOLDEN" />
    <LabTypeBadge type="BUGGY" />
    <LabTypeBadge type="EXERCISE" />
    <LabTypeBadge type="GUIDED" />
    <LabTypeBadge type="CHALLENGE" />
  </div>
);
