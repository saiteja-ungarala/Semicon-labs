/**
 * The list endpoint sorts "newest" by publishedAt, which the card payload does
 * not carry — so client-side sorting cannot reproduce it from the items alone.
 * Capture the server's actual ordering per sort and replay it statically.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const BASE = process.env.API_BASE ?? 'https://semicon-labs-backend-production.up.railway.app/api/v1';
const FILE = process.argv[2] ?? 'src/data/catalog-snapshot.json';
const snap = JSON.parse(readFileSync(FILE, 'utf8'));

const get = async (path) => {
  const r = await fetch(BASE + path, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json();
};

snap.orderBySort = {};
for (const sort of ['popular', 'newest', 'price_asc', 'price_desc']) {
  const slugs = [];
  let page = 1;
  for (;;) {
    const res = await get(`/modules?sort=${sort}&page=${page}&limit=60`);
    slugs.push(...res.items.map((m) => m.slug));
    if (slugs.length >= res.pagination.total) break;
    page += 1;
  }
  snap.orderBySort[sort] = slugs;
  console.log(`${sort}: ${slugs.length} slugs, first = ${slugs[0]}`);
}

writeFileSync(FILE, JSON.stringify(snap));
console.log(`\nmerged into ${FILE}`);
