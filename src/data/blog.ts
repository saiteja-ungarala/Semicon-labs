/**
 * Editorial content. In production this is sourced from the CMS (see the
 * `Blog` model in the Prisma schema); this static set seeds the marketing
 * blog index and gives the SEO layer real URLs to work with.
 */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Physical Design' | 'Design Verification' | 'Careers' | 'Platform';
  readingMinutes: number;
  publishedAt: string; // ISO date
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'reading-a-setup-violation-like-an-engineer',
    title: 'Reading a setup violation like an engineer, not a script',
    excerpt:
      'A timing report is a story about where a signal ran out of time. Here is how experienced PD engineers decode one before touching a single constraint.',
    category: 'Physical Design',
    readingMinutes: 8,
    publishedAt: '2026-06-28',
    author: 'Semicon Labs Team',
  },
  {
    slug: 'why-your-regression-passes-but-silicon-fails',
    title: 'Why your regression passes but silicon fails',
    excerpt:
      'Green regressions feel like safety. Coverage tells a different story. A practical look at the gap between “tests pass” and “design is verified.”',
    category: 'Design Verification',
    readingMinutes: 10,
    publishedAt: '2026-06-14',
    author: 'Semicon Labs Team',
  },
  {
    slug: 'the-engineer-ai-cant-replace',
    title: "The engineer AI can't replace",
    excerpt:
      'AI can generate a fix in seconds. Deciding whether that fix is correct is still an engineering judgment. Why that judgment is now the most valuable skill you can build.',
    category: 'Careers',
    readingMinutes: 7,
    publishedAt: '2026-05-30',
    author: 'Semicon Labs Team',
  },
  {
    slug: 'from-competencies-to-complete-chips',
    title: 'From modules to complete chips: the Semicon Labs roadmap',
    excerpt:
      'Phase one is focused module challenges. Here is how those individual skills come together into full, industry-inspired chip development projects.',
    category: 'Platform',
    readingMinutes: 6,
    publishedAt: '2026-05-12',
    author: 'Semicon Labs Team',
  },
  {
    slug: 'congestion-is-a-symptom-not-a-cause',
    title: 'Congestion is a symptom, not a cause',
    excerpt:
      'Chasing congestion hotspots without understanding what drives them is how you burn a week of PnR iterations. A framework for finding the real cause.',
    category: 'Physical Design',
    readingMinutes: 9,
    publishedAt: '2026-04-22',
    author: 'Semicon Labs Team',
  },
  {
    slug: 'closing-coverage-that-wont-budge',
    title: "Closing coverage that won't budge",
    excerpt:
      'The last 3% of functional coverage is where verification engineers earn their title. How to tell a real hole from an unreachable bin.',
    category: 'Design Verification',
    readingMinutes: 8,
    publishedAt: '2026-04-05',
    author: 'Semicon Labs Team',
  },
];
