const SCRIPT_SRC = 'https://ebz-static.s3.ap-south-1.amazonaws.com/easecheckout/v2.0.0/easebuzz-checkout.js';

/** The payment result object Easebuzz passes to onResponse. */
export interface EasebuzzResponse {
  txnid: string;
  easepayid?: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  status: string; // "success" | "failure" | "userCancelled"
  hash: string;
  key?: string;
  mode?: string;
  [key: string]: unknown;
}

interface EasebuzzOptions {
  access_key: string;
  onResponse: (response: EasebuzzResponse) => void;
  theme?: string;
}

interface EasebuzzInstance {
  initiatePayment: (options: EasebuzzOptions) => void;
}

declare global {
  interface Window {
    EasebuzzCheckout?: new (key: string, env: string) => EasebuzzInstance;
  }
}

let scriptPromise: Promise<boolean> | null = null;

/** Lazy-load the Easebuzz checkout script once. */
export function loadEasebuzz(): Promise<boolean> {
  if (window.EasebuzzCheckout) return Promise.resolve(true);
  scriptPromise =
    scriptPromise ??
    new Promise<boolean>((resolve) => {
      const script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  return scriptPromise;
}

/** Open the Easebuzz checkout popup for a given access key. */
export function openEasebuzz(
  merchantKey: string,
  env: string,
  accessKey: string,
  onResponse: (response: EasebuzzResponse) => void,
) {
  if (!window.EasebuzzCheckout) throw new Error('Easebuzz script not loaded');
  const checkout = new window.EasebuzzCheckout(merchantKey, env);
  checkout.initiatePayment({ access_key: accessKey, onResponse, theme: '#2E1EE0' });
}
