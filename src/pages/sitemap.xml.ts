import type { APIRoute } from 'astro';
import { tools } from '@/data/tools';
import { articles } from '@/data/articles';
import { site } from '@/data/site';

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'tools/', priority: '0.9', changefreq: 'weekly' },
  { path: 'guides/', priority: '0.8', changefreq: 'weekly' },
  { path: 'about/', priority: '0.6', changefreq: 'monthly' },
  { path: 'privacy/', priority: '0.6', changefreq: 'monthly' },
  { path: 'terms/', priority: '0.4', changefreq: 'monthly' },
  { path: 'cookies/', priority: '0.4', changefreq: 'monthly' },
  { path: 'advertising/', priority: '0.4', changefreq: 'monthly' },
  { path: 'contact/', priority: '0.5', changefreq: 'monthly' }
];
const buildDate = site.lastUpdated;

function xmlEscape(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&apos;', '"': '&quot;' }[char] ?? char));
}

function entry(loc: string, lastmod = buildDate, changefreq = 'monthly', priority = '0.7') {
  return `  <url><loc>${xmlEscape(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}

export const GET: APIRoute = () => {
  const urls = [
    ...staticPages.map((page) => entry(`${site.url}/${page.path}`, buildDate, page.changefreq, page.priority)),
    ...tools.map((tool) => entry(`${site.url}/tools/${tool.slug}/`, buildDate, 'monthly', '0.8')),
    ...articles.map((article) => entry(`${site.url}/guides/${article.slug}/`, article.updated, 'monthly', '0.7'))
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
