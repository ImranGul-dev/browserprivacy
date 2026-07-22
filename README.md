# Privacy Toolbox

Privacy Toolbox is a static Astro site containing browser-only privacy and file-safety utilities. Text, image, and hash processing is designed to run in the visitor's browser without accounts or server uploads.

## Current canonical areas

- AI text and PII redaction
- Developer log and secret cleanup
- JSON and CSV privacy helpers
- Screenshot redaction
- URL and JWT inspection
- Image metadata viewing and removal
- SHA-256 checksum calculation
- Privacy, EXIF, PDF, ZIP, and tracking-link guides

## Local setup

Requirements: Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

## Production validation

```bash
npm run check
```

This validates the browser scripts and creates a production build in `dist/`.

## Deployment

The included `netlify.toml` uses:

```bash
npm run build
```

Publish directory: `dist`

The `_redirects` file preserves important old URLs and consolidates overlapping keyword pages into canonical tools. Keep redirects in place for at least one year after deployment, and preferably indefinitely when old URLs have backlinks or search history.

## SEO maintenance

Before publishing a new page:

1. Confirm it serves a distinct search intent.
2. Link it from an appropriate hub or related page.
3. Add a self-referencing canonical, unique title, unique description, and one clear H1.
4. Add it to the sitemap only when it is complete and indexable.
5. Avoid creating near-duplicate pages for minor keyword variations.
6. Record material tool or content changes on `/changelog/`.

## Important limitations

Pattern-based redaction can miss unusual values and indirect identifiers. Image re-encoding can remove original metadata but does not prove that a visible image is safe to share. PDF guidance is educational; this project does not claim to provide a complete PDF forensic sanitization engine.
