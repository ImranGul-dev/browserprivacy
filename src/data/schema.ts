import type { FAQItem, ToolPage } from './tools';
import type { GuidePage } from './guides';

export const siteUrl = 'https://privacy-toolbox.com';

export function absoluteUrl(path: string) {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function breadcrumb(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url)
    }))
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Privacy Toolbox',
    url: siteUrl,
    description: 'Browser-only privacy tools and practical guides for cleaning sensitive text, files, logs, images, links, and structured data before sharing.',
    inLanguage: 'en'
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Imran Gul',
    url: `${siteUrl}/about/`,
    jobTitle: 'Web developer and Privacy Toolbox maintainer',
    knowsAbout: ['Browser-based tools', 'Web development', 'Client-side data processing', 'Technical documentation']
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Privacy Toolbox',
    url: siteUrl,
    email: 'support@privacy-toolbox.com',
    founder: {
      '@type': 'Person',
      name: 'Imran Gul',
      url: `${siteUrl}/about/`
    }
  };
}

export function softwareSchema(tool: ToolPage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any modern browser',
    browserRequirements: 'JavaScript enabled; current desktop or mobile browser',
    url: `${siteUrl}/${tool.slug}/`,
    description: tool.metaDescription,
    isAccessibleForFree: true,
    dateModified: tool.updated,
    author: {
      '@type': 'Person',
      name: 'Imran Gul',
      url: `${siteUrl}/about/`
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function articleSchema(guide: GuidePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.metaDescription,
    mainEntityOfPage: `${siteUrl}/guides/${guide.slug}/`,
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: 'en',
    articleSection: guide.category,
    author: {
      '@type': 'Person',
      name: 'Imran Gul',
      url: `${siteUrl}/about/`
    },
    publisher: {
      '@type': 'Organization',
      name: 'Privacy Toolbox',
      url: siteUrl
    }
  };
}

export function faqSchema(faq: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function itemListSchema(name: string, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url)
    }))
  };
}
