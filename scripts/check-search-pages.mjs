import { readFileSync } from 'node:fs';

const guides = readFileSync('src/data/guides.ts', 'utf8');
const redirects = readFileSync('public/_redirects', 'utf8');

const restoredGuideSlugs = [
  'extract-one-page-from-pdf',
  'remove-tracking-from-amazon-links',
  'remove-gps-from-android-photos',
  'remove-gps-from-iphone-photos',
  'docx-comments-tracked-changes'
];

const errors = [];

for (const slug of restoredGuideSlugs) {
  if (!guides.includes(`slug: '${slug}'`)) {
    errors.push(`missing restored guide: ${slug}`);
  }

  const guidePath = `/guides/${slug}/`;
  const conflictingRedirect = redirects
    .split(/\r?\n/)
    .some((line) => line.trim().startsWith(`${guidePath} `));

  if (conflictingRedirect) {
    errors.push(`restored guide is still redirected: ${guidePath}`);
  }
}

for (const source of ['/blog/docx-comments-tracked-changes', '/blog/docx-comments-tracked-changes/']) {
  const expected = `${source} /guides/docx-comments-tracked-changes/ 301!`;
  if (!redirects.split(/\r?\n/).includes(expected)) {
    errors.push(`missing intent-matched legacy redirect: ${expected}`);
  }
}

if (errors.length) {
  console.error(`Search page validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Validated ${restoredGuideSlugs.length} restored search-intent guides and their legacy routes.`);
