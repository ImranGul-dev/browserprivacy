import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const redirectsPath = resolve('public/_redirects');
const distPath = resolve('dist');
const checkDist = process.argv.includes('--dist');
const errors = [];
const redirects = [];

for (const [index, rawLine] of readFileSync(redirectsPath, 'utf8').split(/\r?\n/).entries()) {
  const lineNumber = index + 1;
  const line = rawLine.trim();

  if (!line || line.startsWith('#')) continue;

  const fields = line.split(/\s+/);
  if (fields.length !== 3) {
    errors.push(`line ${lineNumber}: expected "source destination status"`);
    continue;
  }

  const [source, destination, status] = fields;
  if (!source.startsWith('/') || source.startsWith('//')) {
    errors.push(`line ${lineNumber}: source must be an absolute site path: ${source}`);
  }
  if (!(destination.startsWith('/') && !destination.startsWith('//')) && !/^https?:\/\//i.test(destination)) {
    errors.push(`line ${lineNumber}: destination must be an absolute site path or HTTP(S) URL: ${destination}`);
  }
  if (!/^(301|308)!?$/.test(status)) {
    errors.push(`line ${lineNumber}: redirect must use permanent status 301 or 308: ${status}`);
  }

  redirects.push({ source, destination, lineNumber });
}

const sources = new Map();
for (const redirect of redirects) {
  const previous = sources.get(redirect.source);
  if (previous) {
    errors.push(`line ${redirect.lineNumber}: duplicate source ${redirect.source} (first declared on line ${previous.lineNumber})`);
  } else {
    sources.set(redirect.source, redirect);
  }

  if (redirect.source === redirect.destination) {
    errors.push(`line ${redirect.lineNumber}: self-redirect ${redirect.source}`);
  }
}

for (const redirect of redirects) {
  if (redirect.destination.startsWith('/') && sources.has(redirect.destination)) {
    const next = sources.get(redirect.destination);
    errors.push(
      `line ${redirect.lineNumber}: redirect chain ${redirect.source} -> ${redirect.destination} -> ${next.destination}`,
    );
  }
}

if (checkDist) {
  if (!existsSync(distPath) || !statSync(distPath).isDirectory()) {
    errors.push('dist directory does not exist; run the production build first');
  } else {
    const checkedDestinations = new Set();
    for (const { destination, lineNumber } of redirects) {
      if (!destination.startsWith('/') || checkedDestinations.has(destination)) continue;
      checkedDestinations.add(destination);

      const pathname = destination.split(/[?#]/, 1)[0];
      const relativePath = decodeURIComponent(pathname).replace(/^\/+/, '');
      const candidates = pathname.endsWith('/')
        ? [resolve(distPath, relativePath, 'index.html')]
        : [resolve(distPath, relativePath), resolve(distPath, `${relativePath}.html`), resolve(distPath, relativePath, 'index.html')];

      if (!candidates.some(existsSync)) {
        errors.push(`line ${lineNumber}: destination is missing from dist: ${destination}`);
      }
    }
  }
}

if (errors.length) {
  console.error(`Redirect validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${redirects.length} redirects: unique sources, no self-redirects, no chains${checkDist ? ', and all internal destinations exist in dist' : ''}.`,
);
