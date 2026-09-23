/**
 * Compiles the app's Tailwind stylesheet for the design-sync bundle.
 *
 * The app has no dist/ library entry: it is a Vite site, so its only compiled
 * CSS is a hashed dist/assets/index-*.css. This produces a stable path the
 * converter can point at, scanning the whole src/ tree so every utility any
 * synced component uses is present.
 *
 * Fonts load from Google at runtime in the app (index.html <link>). The same
 * @import goes at the top here so rendered designs get the real families.
 */
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const OUT = '.design-sync/.cache/styles.css';
const FONTS =
  "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;500;600;700&family=Caveat:wght@600;700&display=swap');\n";

mkdirSync('.design-sync/.cache', { recursive: true });
execSync(`npx tailwindcss -c tailwind.config.ts -i src/index.css -o ${OUT} --content "src/**/*.{ts,tsx}" --minify`, {
  stdio: 'inherit',
});
writeFileSync(OUT, FONTS + readFileSync(OUT, 'utf8'));
console.log(`wrote ${OUT}`);
