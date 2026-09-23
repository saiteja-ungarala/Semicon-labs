import { ToolBadge } from '@semiconlabs/web';

export const AllVendors = () => (
  <div className="flex flex-wrap items-center gap-2.5">
    <ToolBadge tool="CADENCE" />
    <ToolBadge tool="SYNOPSYS" />
    <ToolBadge tool="SIEMENS" />
  </div>
);
