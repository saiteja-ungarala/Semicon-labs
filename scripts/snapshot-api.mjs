/**
 * Freezes the API into static JSON so the site can run with no backend.
 * Every endpoint the web app calls is captured exactly as it responds.
 *
 * Usage — run against any API instance (deployed, or `npm run dev` in server/):
 *
 *   node scripts/snapshot-api.mjs src/data/catalog-snapshot.json
 *   node scripts/snapshot-sorts.mjs src/data/catalog-snapshot.json
 *
 * Both must run, in that order: the second adds the per-sort module ordering,
 * which cannot be derived from the card payloads (see that file for why).
 *
 * Override the API with API_BASE, e.g.
 *   API_BASE=http://localhost:4000/api/v1 node scripts/snapshot-api.mjs …
 *
 * Updating catalog content: edit the source workbook, re-run the server's
 * scripts/import-catalog.ts and seed a database, then re-snapshot from it.
 */
import { writeFileSync } from 'node:fs';

const BASE = process.env.API_BASE ?? 'https://semicon-labs-backend-production.up.railway.app/api/v1';

const get = async (path) => {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const r = await fetch(BASE + path, { headers: { accept: 'application/json' } });
      if (!r.ok) throw new Error(`${r.status} ${path}`);
      const j = await r.json();
      return j.data ?? j;
    } catch (e) {
      if (attempt === 3) throw e;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
};

const out = { domains: null, domainBySlug: {}, skillBySlug: {}, modulesList: null, moduleBySlug: {}, testcasesByModule: {} };

console.log('domains…');
out.domains = await get('/domains');

for (const d of out.domains) {
  console.log('  domain', d.slug);
  const detail = await get(`/domains/${d.slug}`);
  out.domainBySlug[d.slug] = detail;
  for (const s of detail.skills ?? []) {
    const sk = await get(`/domains/${d.slug}/skills/${s.slug}`);
    out.skillBySlug[`${d.slug}/${s.slug}`] = sk;
  }
}

// Marketplace list — pull every page so filtering/sorting can run client-side.
console.log('modules…');
let page = 1;
const all = [];
let meta = null;
for (;;) {
  const res = await get(`/modules?page=${page}&limit=60`);
  const items = res.items ?? res.data ?? res;
  all.push(...items);
  meta = res.meta ?? res.pagination ?? null;
  const total = meta?.total ?? items.length;
  if (all.length >= total || items.length === 0) break;
  page += 1;
}
out.modulesList = { items: all, meta };
console.log(`  ${all.length} modules`);

for (const m of all) {
  out.moduleBySlug[m.slug] = await get(`/modules/${m.slug}`);
  try {
    out.testcasesByModule[m.slug] = await get(`/modules/${m.slug}/testcases`);
  } catch {
    out.testcasesByModule[m.slug] = null;
  }
}

const file = process.argv[2] ?? 'api-snapshot.json';
writeFileSync(file, JSON.stringify(out));
console.log(`\nwrote ${file}`);
console.log(
  `domains=${out.domains.length} domainDetails=${Object.keys(out.domainBySlug).length} skills=${Object.keys(out.skillBySlug).length} modules=${all.length} moduleDetails=${Object.keys(out.moduleBySlug).length}`,
);
