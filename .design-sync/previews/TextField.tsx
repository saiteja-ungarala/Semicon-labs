import { TextField } from '@semiconlabs/web';

export const Default = () => (
  <div className="max-w-sm">
    <TextField label="Work email" name="email" placeholder="you@company.com" />
  </div>
);

export const WithHint = () => (
  <div className="max-w-sm">
    <TextField label="Team size" name="seats" placeholder="12" hint="Minimum 2 seats per team." />
  </div>
);

export const WithError = () => (
  <div className="max-w-sm">
    <TextField label="Work email" name="email" defaultValue="not-an-email" error="Enter a valid email address." />
  </div>
);
