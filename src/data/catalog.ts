/**
 * The catalog, served from a frozen snapshot instead of an API.
 *
 * Client direction (Aug 2026): the site ships as a static build with no backend
 * of ours behind it. `catalog-snapshot.json` is a verbatim capture of every
 * curriculum/marketplace endpoint the UI calls, taken from the live API, so the
 * pages render exactly what they rendered when it was wired up.
 *
 * Regenerate it by pointing `scripts/snapshot-api.mjs` at a running API — see
 * HANDOVER.md. To go back to a live backend, restore the `api.get` calls in
 * features/curriculum/api.ts and features/marketplace/api.ts; nothing else in
 * the app changed shape, because the snapshot IS the API's response payload.
 */

// Dynamically imported so the ~570KB of catalog data becomes its own chunk
// rather than loading with the homepage. Cached after the first read.
let cache: Snapshot | null = null;

export interface Snapshot {
  domains: unknown[];
  domainBySlug: Record<string, unknown>;
  skillBySlug: Record<string, unknown>;
  modulesList: { items: ModuleCardish[]; meta: unknown };
  moduleBySlug: Record<string, unknown>;
  testcasesByModule: Record<string, unknown>;
  orderBySort: Record<string, string[]>;
}

/** Only the fields the list view filters on — the rest passes through. */
export interface ModuleCardish {
  slug: string;
  title: string;
  subtitle: string | null;
  difficulty: string;
  level: string;
  toolVendor: string | null;
  domain: { slug: string };
  skill?: { slug: string } | null;
}

export async function loadCatalog(): Promise<Snapshot> {
  if (!cache) {
    const mod = await import('./catalog-snapshot.json');
    cache = (mod.default ?? mod) as unknown as Snapshot;
  }
  return cache;
}

/** Thrown when a slug is not in the snapshot, mirroring the API's 404. */
export class NotInCatalogError extends Error {
  constructor(what: string) {
    super(`${what} was not found in the catalog.`);
    this.name = 'NotInCatalogError';
  }
}

export function requireEntry<T>(value: T | undefined, what: string): T {
  if (value === undefined || value === null) throw new NotInCatalogError(what);
  return value;
}
