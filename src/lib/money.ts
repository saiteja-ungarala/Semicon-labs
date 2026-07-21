/** Format an amount in minor units (paise/cents) as a currency string. */
export function formatMoney(minor: number, currency = 'INR'): string {
  return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(minor / 100);
}

/** Effective price after per-module discount, in minor units. */
export function netPriceMinor(priceMinor: number, discountMinor = 0): number {
  return Math.max(0, priceMinor - discountMinor);
}
