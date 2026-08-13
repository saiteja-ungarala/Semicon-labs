/**
 * Builds src/data/catalog-snapshot.json straight from the server's
 * prisma/catalog.json — no API, no database.
 *
 *   node scripts/build-snapshot.mjs
 *   node scripts/build-snapshot.mjs --catalog ../server/prisma/catalog.json --out src/data/catalog-snapshot.json
 *
 * Why this exists: the site ships static, and the backend that once served
 * these endpoints is gone. The original snapshot was captured from the live
 * API (scripts/snapshot-api.mjs); this reproduces the same payloads offline so
 * content updates only need the workbook → import-catalog.ts → this script.
 *
 * Shapes are the API's, field for field. `--verify <file>` diffs the output
 * against an existing snapshot, which is how this was validated: it reproduces
 * the API-captured PD and Analog Layout entries exactly.
 *
 * Identifiers: the API returned database cuids. Those are only used as React
 * keys — every route and payload keys off slugs — so here they are derived
 * deterministically from the slug, keeping the file stable across runs.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const arg = (flag, fallback) => {
  const i = process.argv.indexOf(flag);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
};

const CATALOG = resolve(arg('--catalog', '../server/prisma/catalog.json'));
const OUT = resolve(arg('--out', 'src/data/catalog-snapshot.json'));
const VERIFY = arg('--verify', null);

const catalog = JSON.parse(readFileSync(CATALOG, 'utf8'));

// Values the seeded database carried that the catalog file does not.
const PRICE_MINOR = 49900; // every module was seeded at ₹499
const DISCOUNT_MINOR = 0;
const CURRENCY = 'INR';
const STAMP = '2026-08-03T11:07:11.321Z'; // fixed so reruns produce no diff

// prisma/seed.ts mapped Module.level from its difficulty…
const LEVEL_BY_DIFFICULTY = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'SPECIALIST',
  ADVANCED: 'EXPERT',
};

// …and attributed every module to the seeded admin account.
const INSTRUCTOR = {
  firstName: 'Semicon',
  lastName: 'Admin',
  avatarUrl: null,
  headline: 'Semicon Labs Curriculum Team',
};

/** Stable stand-in for the old database cuid. */
const idFor = (kind, key) =>
  'cm' + createHash('sha1').update(`${kind}:${key}`).digest('hex').slice(0, 23);

const labMixOf = (testcases) => {
  const mix = {};
  for (const t of testcases) mix[t.labType] = (mix[t.labType] ?? 0) + 1;
  return mix;
};

const moduleCore = (m, domain, skill) => ({
  id: idFor('module', m.slug),
  slug: m.slug,
  externalId: m.externalId ?? null,
  title: m.title,
  subtitle: null,
  thumbnailUrl: null,
  difficulty: m.difficulty,
  level: LEVEL_BY_DIFFICULTY[m.difficulty] ?? 'SPECIALIST',
  toolVendor: m.toolVendor ?? null,
  durationMin: m.durationMin,
  priceMinor: PRICE_MINOR,
  discountMinor: DISCOUNT_MINOR,
  currency: CURRENCY,
  ratingAvg: 0,
  ratingCount: 0,
  domainRef: { slug: domain.slug, name: domain.name, code: domain.code },
  skillRef: skill ? { slug: skill.slug, name: skill.name } : null,
});

// ---------------------------------------------------------------- assemble

const out = {
  domains: [],
  domainBySlug: {},
  skillBySlug: {},
  modulesList: { items: [], meta: null },
  moduleBySlug: {},
  testcasesByModule: {},
  orderBySort: {},
};

const allCards = [];

for (const domain of catalog.domains) {
  const domainId = idFor('domain', domain.slug);
  let dModules = 0;
  let dTestcases = 0;

  const skills = domain.skills.map((skill) => {
    const modules = skill.modules;
    const testcases = modules.reduce((n, m) => n + m.testcases.length, 0);
    const durationMin = modules.reduce((n, m) => n + m.durationMin, 0);
    dModules += modules.length;
    dTestcases += testcases;
    return {
      id: idFor('skill', `${domain.slug}/${skill.slug}`),
      domainId,
      slug: skill.slug,
      name: skill.name,
      summary: skill.summary,
      order: skill.order,
      toolVendor: skill.toolVendor ?? null,
      difficulty: skill.difficulty ?? null,
      createdAt: STAMP,
      updatedAt: STAMP,
      stats: { modules: modules.length, testcases, durationMin },
    };
  });

  const domainRow = {
    id: domainId,
    slug: domain.slug,
    code: domain.code,
    name: domain.name,
    pipeline: domain.pipeline,
    tagline: domain.tagline,
    description: domain.description,
    order: domain.order,
    isPublished: true,
    comingSoon: domain.comingSoon,
    createdAt: STAMP,
    updatedAt: STAMP,
    skills,
    stats: { skills: skills.length, modules: dModules, testcases: dTestcases },
  };

  out.domains.push(domainRow);
  out.domainBySlug[domain.slug] = domainRow;

  // --- per-skill detail, plus module cards/details/testcases
  domain.skills.forEach((skill, si) => {
    const skillRow = skills[si];
    const skillModules = skill.modules.map((m) => {
      const core = moduleCore(m, domain, skill);
      const { domainRef, skillRef, ...card } = core;
      void domainRef;
      void skillRef;
      return {
        ...card,
        description: m.description,
        testcaseCount: m.testcases.length,
        labMix: labMixOf(m.testcases),
      };
    });

    out.skillBySlug[`${domain.slug}/${skill.slug}`] = {
      domain: { slug: domain.slug, name: domain.name, code: domain.code },
      skill: { ...skillRow, modules: skillModules },
    };

    for (const m of skill.modules) {
      const core = moduleCore(m, domain, skill);
      const { domainRef, skillRef, ...base } = core;

      allCards.push({
        ...base,
        domain: domainRef,
        skill: skillRef,
        competencies: [],
        testcaseCount: m.testcases.length,
      });

      out.moduleBySlug[m.slug] = {
        ...base,
        description: m.description,
        domainId,
        skillId: skillRow.id,
        instructorId: idFor('user', 'admin'),
        docContentName: m.docContentName ?? null,
        order: m.order,
        status: 'PUBLISHED',
        publishedAt: STAMP,
        createdAt: STAMP,
        updatedAt: STAMP,
        deletedAt: null,
        seoId: null,
        domain: domainRef,
        skill: skillRef ? { ...skillRef, summary: skill.summary } : null,
        instructor: INSTRUCTOR,
        reviews: [],
        _count: { challenges: m.testcases.length },
        competencies: [],
        labMix: labMixOf(m.testcases),
        owned: false,
      };

      out.testcasesByModule[m.slug] = {
        module: { id: base.id, slug: m.slug, title: m.title, toolVendor: m.toolVendor ?? null },
        testcases: m.testcases.map((t) => ({
          slug: t.slug,
          externalId: t.externalId ?? null,
          title: t.title,
          scenario: t.description,
          labType: t.labType,
          level: t.level,
          difficulty: t.difficulty,
          toolVendor: t.toolVendor ?? null,
          verifiable: t.verifiable,
          estimatedMin: t.estimatedMin,
          order: t.order,
        })),
      };
    }
  });
}

// The list endpoint ordered by the sort field then id; with uniform prices and
// ratings that collapsed to id order, which is what the captured snapshot show.
const byId = [...allCards].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
out.modulesList = {
  items: byId,
  meta: {
    page: Math.max(1, Math.ceil(byId.length / 60)),
    limit: 60,
    total: byId.length,
    totalPages: Math.max(1, Math.ceil(byId.length / 60)),
  },
};
for (const sort of ['popular', 'newest', 'price_asc', 'price_desc']) {
  out.orderBySort[sort] = byId.map((m) => m.slug);
}

writeFileSync(OUT, JSON.stringify(out));
console.log(`wrote ${OUT}`);
console.log(
  `  domains=${out.domains.length} skills=${Object.keys(out.skillBySlug).length} ` +
    `modules=${Object.keys(out.moduleBySlug).length} ` +
    `testcases=${Object.values(out.testcasesByModule).reduce((n, t) => n + t.testcases.length, 0)}`,
);

// ---------------------------------------------------------------- verify
if (VERIFY) {
  const prev = JSON.parse(readFileSync(resolve(VERIFY), 'utf8'));
  // Generated identifiers and timestamps are expected to differ from the
  // database's; everything that reaches the UI must not.
  const drop = new Set([
    'id',
    'domainId',
    'skillId',
    'instructorId',
    'createdAt',
    'updatedAt',
    'publishedAt',
  ]);
  const norm = (v) => {
    if (Array.isArray(v)) return v.map(norm);
    if (v && typeof v === 'object') {
      return Object.fromEntries(
        Object.entries(v)
          .filter(([k]) => !drop.has(k))
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([k, x]) => [k, norm(x)]),
      );
    }
    return v;
  };
  let diffs = 0;
  const cmp = (label, a, b) => {
    const same = JSON.stringify(norm(a)) === JSON.stringify(norm(b));
    if (!same) {
      diffs += 1;
      console.log(`  DIFF ${label}`);
    }
    return same;
  };
  console.log(`\nverifying against ${VERIFY} (ignoring generated ids/timestamps)`);
  for (const slug of ['physical-design', 'analog-layout']) {
    if (!prev.domainBySlug?.[slug]) continue;
    cmp(`domain ${slug}`, out.domainBySlug[slug], prev.domainBySlug[slug]);
    for (const k of Object.keys(prev.skillBySlug)) {
      if (!k.startsWith(slug + '/')) continue;
      cmp(`skill ${k}`, out.skillBySlug[k], prev.skillBySlug[k]);
    }
    for (const [mslug, m] of Object.entries(prev.moduleBySlug)) {
      if (m.domain?.slug !== slug) continue;
      cmp(`module ${mslug}`, out.moduleBySlug[mslug], m);
      cmp(`testcases ${mslug}`, out.testcasesByModule[mslug], prev.testcasesByModule[mslug]);
    }
  }
  console.log(diffs === 0 ? '  no differences' : `  ${diffs} differing entries`);
}
