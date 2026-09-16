/**
 * Writes public/sitemap.xml from the router's public routes plus every slug
 * the catalog snapshot and audience data know about. Runs as `prebuild`, so
 * the sitemap always matches the catalog the build ships with.
 *
 * Auth, checkout, payment and dashboard routes are deliberately absent — they
 * are noindexed by <Seo> and listed under Disallow in robots.txt.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://semiconlabs.com';

/** Marketing pages straight from src/router/routes.tsx. */
const staticPaths = [
  '/',
  '/about',
  '/who-we-serve',
  '/competencies',
  '/domains',
  '/pricing',
  '/faq',
  '/contact',
  '/careers',
  '/modules',
  '/privacy',
  '/terms',
  '/refund',
];

const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

// audience slugs from the data file, so a new audience card is picked up
// audiencePages.ts, NOT audiences.ts. The card list in audiences.ts includes
// launch-pad, which has no page of its own and redirects to /who-we-serve -
// listing a redirecting URL in a sitemap earns a crawl error.
const audienceSlugs = [...read('src/data/audiencePages.ts').matchAll(/^\s*slug: '([a-z0-9-]+)',/gm)].map((m) => m[1]);

const catalog = JSON.parse(read('src/data/catalog-snapshot.json'));
const domainPaths = Object.keys(catalog.domainBySlug).map((s) => `/domains/${s}`);
// skillBySlug keys are "domain/skill" pairs, exactly the two URL segments
const skillPaths = Object.keys(catalog.skillBySlug).map((k) => {
  const [domain, skill] = k.split('/');
  return `/domains/${domain}/skills/${skill}`;
});
const modulePaths = Object.keys(catalog.moduleBySlug).map((s) => `/modules/${s}`);

const paths = [
  ...staticPaths,
  ...audienceSlugs.map((s) => `/who-we-serve/${s}`),
  ...domainPaths,
  ...skillPaths,
  ...modulePaths,
];

const today = new Date().toISOString().slice(0, 10);
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  paths
    .map((p) => `  <url><loc>${SITE}${p}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n') +
  '\n</urlset>\n';

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), xml);
console.log(`sitemap.xml: ${paths.length} urls (${audienceSlugs.length} audiences, ${domainPaths.length} domains, ${skillPaths.length} skills, ${modulePaths.length} modules)`);
