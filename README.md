# Privacy Toolbox

Privacy Toolbox is a production-ready Astro + TypeScript site for <https://privacy-toolbox.com/>. It includes 10 browser-only privacy tools, supporting guides, trust pages, structured data, tests, and Netlify configuration.

## Project purpose

The site is a free, SEO-focused, AdSense-ready utility website. The core promise is:

> Your files stay in your browser. No uploads. No account.

The project includes tool pages, supporting guide articles, policy/trust pages, structured metadata, sitemap, robots.txt, tests, and Netlify configuration. Visible ad placeholder sections are disabled for now.

## Browser-only privacy model

- No file upload endpoint.
- No server-side file processing.
- No accounts or login.
- No database or file history.
- No analytics event should include filenames, file contents, hashes, metadata values, GPS values, URLs, or private inputs.
- Outputs are generated locally with `Blob` / `URL.createObjectURL()` and download links revoke object URLs after use.
- Image, PDF, and hash processing use browser APIs and Web Workers where practical.

## Included tools

1. Remove EXIF Metadata
2. Remove GPS from Photo
3. View Image Metadata
4. Resize Image
5. Convert Image
6. Merge PDF
7. Split PDF
8. Remove PDF Pages
9. SHA-256 File Hash Generator
10. URL Tracking Remover

## Tech choices

- Astro static output
- TypeScript strict mode
- Vite worker bundling
- `exifr` for supported image metadata parsing
- Canvas / `createImageBitmap` / `OffscreenCanvas` for local image export
- `pdf-lib` for local PDF merge, split, and page removal
- Web Crypto API for SHA-256 hashing
- Native `URL` and `URLSearchParams` for URL cleanup
- Vitest unit tests
- Playwright smoke tests

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL shown by Astro.

## Build

```bash
npm run build
```

The static site is written to `dist/`.

## Preview production build

```bash
npm run preview
```

## Tests

```bash
npm test
```

Optional Playwright smoke tests after a build:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

## Netlify deployment

1. Push this project to GitHub.
2. Create a new Netlify site from the repository.
3. Netlify will use `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add the production domain `privacy-toolbox.com` in Netlify domain settings.
5. Configure DNS with your registrar.
6. Test the deployed tools and run a browser network audit to confirm no file bytes are sent to external services.

## AdSense readiness

No live AdSense code is included in this source. Visible ad placeholder sections are disabled for now.

When a real AdSense publisher ID is available, add ads only in clearly separated content areas. Do not place ads inside upload cards, progress states, result cards, error messages, metadata reports, or beside download/copy buttons.

After adding AdSense, update:

- `src/components/SafeAdPlaceholder.astro`
- `src/pages/privacy.astro`
- `src/pages/cookies.astro`
- `src/pages/advertising.astro`
- `netlify.toml` Content Security Policy domains

## Adding a new tool

1. Add a tool entry in `src/data/tools.ts`.
2. Add related guide content in `src/data/articles.ts`.
3. Add UI behavior in `src/tools/toolRuntime.ts`.
4. Add worker logic in `src/workers/` if heavy processing is needed.
5. Add unit tests for deterministic logic.
6. Add honest limitations and FAQs.
7. Run `npm test` and `npm run build`.

## Known limitations

- Image metadata cleaning uses a privacy re-encode path. It removes supported metadata detected by the parser, but it is not a forensic sanitizer.
- Remove GPS creates a fresh image copy and may remove other metadata as well.
- Image operations depend on browser support for `createImageBitmap` and `OffscreenCanvas` in workers.
- PDF operations can fail for encrypted, corrupted, very large, signed, or complex interactive PDFs.
- Split PDF exports one PDF containing selected ranges. Multi-file ZIP output can be added later.
- SHA-256 hashing reads the selected file into memory in this starter. Very large streaming support can be added with a chunked hashing library.
- URL tracking removal is deterministic and only removes documented query parameters; it does not unpack redirect chains or nested URLs.

## Accuracy wording

Use claims such as:

- "Removes supported EXIF metadata"
- "Removes GPS metadata when present"
- "Processes files locally in your browser"
- "Calculates the SHA-256 hash locally"
- "Merges PDFs locally"

Avoid claims such as:

- "Guaranteed complete privacy"
- "Forensic-grade"
- "Removes all hidden data"
- "Legal redaction"
- "Military-grade security"
