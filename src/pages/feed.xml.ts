import { guides } from '../data/guides';

const site = 'https://privacy-toolbox.com';
const escapeXml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[char] ?? char);

export function GET() {
  const items = [...guides]
    .sort((a, b) => b.updated.localeCompare(a.updated))
    .map((guide) => {
      const url = `${site}/guides/${guide.slug}/`;
      return `    <item>\n      <title>${escapeXml(guide.title)}</title>\n      <link>${escapeXml(url)}</link>\n      <guid isPermaLink="true">${escapeXml(url)}</guid>\n      <description>${escapeXml(guide.metaDescription)}</description>\n      <category>${escapeXml(guide.category)}</category>\n      <pubDate>${new Date(`${guide.updated}T00:00:00Z`).toUTCString()}</pubDate>\n    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Privacy Toolbox Guides</title>\n    <link>${site}/guides/</link>\n    <description>Practical guides for reducing sensitive information before sharing text, logs, structured data, images, and files.</description>\n    <language>en</language>\n    <lastBuildDate>${new Date(`${[...guides].sort((a, b) => b.updated.localeCompare(a.updated))[0]?.updated ?? '2026-07-23'}T00:00:00Z`).toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>\n`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
