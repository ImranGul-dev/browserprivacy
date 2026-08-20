import { tools } from '../data/tools';
import { mainPages } from '../data/mainPages';
import { guides } from '../data/guides';

const site = 'https://privacy-toolbox.com';
const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);
const latestDate = (dates: string[]) => [...dates].filter(Boolean).sort((a, b) => b.localeCompare(a))[0];

const latestToolUpdate = latestDate(tools.map((tool) => tool.updated));
const latestGuideUpdate = latestDate(guides.map((guide) => guide.updated));
const latestSiteUpdate = latestDate([
  ...tools.map((tool) => tool.updated),
  ...mainPages.map((page) => page.updated),
  ...guides.map((guide) => guide.updated)
]);

const urls = [
  { path: '/', lastmod: latestSiteUpdate },
  { path: '/tools/', lastmod: latestToolUpdate },
  { path: '/guides/', lastmod: latestGuideUpdate },
  ...mainPages.map((page) => ({ path: `/${page.slug}/`, lastmod: page.updated })),
  ...tools.map((tool) => ({ path: `/${tool.slug}/`, lastmod: tool.updated })),
  ...guides.map((guide) => ({ path: `/guides/${guide.slug}/`, lastmod: guide.updated }))
];

export function GET() {
  const unique = Array.from(new Map(urls.map((entry) => [entry.path, entry])).values());
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${unique
    .map(({ path, lastmod }) => `  <url>\n    <loc>${escapeXml(`${site}${path}`)}</loc>${lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ''}\n  </url>`)
    .join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
