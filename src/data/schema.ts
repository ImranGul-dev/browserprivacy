import type { ToolPage } from './tools';
import type { GuidePage } from './guides';

export const siteUrl = 'https://privacy-toolbox.com';
const maintainerUrl = `${siteUrl}/about/`;
const maintainerProfile = 'https://github.com/ImranGul-dev';
const websiteId = `${siteUrl}/#website`;
const organizationId = `${siteUrl}/#organization`;
const maintainerId = `${siteUrl}/#maintainer`;

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
    '@id': websiteId,
    name: 'Privacy Toolbox',
    url: siteUrl,
    description: 'Browser-only privacy tools and practical guides for cleaning sensitive text, files, logs, images, links, and structured data before sharing.',
    inLanguage: 'en',
    publisher: { '@id': organizationId }
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': maintainerId,
    name: 'Imran Gul',
    url: maintainerUrl,
    sameAs: [maintainerProfile],
    jobTitle: 'Web developer and Privacy Toolbox maintainer',
    knowsAbout: ['Browser-based tools', 'Web development', 'Client-side data processing', 'Technical documentation']
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': organizationId,
    name: 'Privacy Toolbox',
    url: siteUrl,
    email: 'support@privacy-toolbox.com',
    founder: {
      '@type': 'Person',
      '@id': maintainerId,
      name: 'Imran Gul',
      url: maintainerUrl
    }
  };
}

export function softwareSchema(tool: ToolPage) {
  const url = `${siteUrl}/${tool.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#software`,
    name: tool.name,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any modern browser',
    browserRequirements: 'JavaScript enabled; current desktop or mobile browser',
    url,
    description: tool.metaDescription,
    isAccessibleForFree: true,
    dateModified: tool.updated,
    featureList: tool.detects,
    isPartOf: { '@id': websiteId },
    author: {
      '@type': 'Person',
      '@id': maintainerId,
      name: 'Imran Gul',
      url: maintainerUrl,
      sameAs: [maintainerProfile]
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  };
}

export function articleSchema(guide: GuidePage) {
  const url = `${siteUrl}/guides/${guide.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: guide.title,
    description: guide.metaDescription,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    isPartOf: { '@id': websiteId },
    datePublished: guide.published,
    dateModified: guide.updated,
    inLanguage: 'en',
    articleSection: guide.category,
    author: {
      '@type': 'Person',
      '@id': maintainerId,
      name: 'Imran Gul',
      url: maintainerUrl,
      sameAs: [maintainerProfile]
    },
    publisher: {
      '@type': 'Organization',
      '@id': organizationId,
      name: 'Privacy Toolbox',
      url: siteUrl
    }
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
      item: absoluteUrl(item.url)
    }))
  };
}
