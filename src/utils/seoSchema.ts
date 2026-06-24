import { site } from '@/data/site';
import type { Tool } from '@/data/tools';
import type { Article } from '@/data/articles';

type FAQ = { question: string; answer: string };
type BreadcrumbItem = { name: string; url: string };

const organizationId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': organizationId,
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: new URL(site.logo, site.url).href,
    email: site.supportEmail,
    foundingDate: site.foundingYear,
    description: site.description,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: site.supportEmail,
      availableLanguage: ['en']
    },
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {})
  };
}

export function websiteSchema(description = site.description) {
  return {
    '@context': 'https://schema.org',
    '@id': websiteId,
    '@type': 'WebSite',
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description,
    inLanguage: 'en',
    publisher: { '@id': organizationId }
  };
}

export function webpageSchema(name: string, description: string, url: string, pageType = 'WebPage') {
  return {
    '@context': 'https://schema.org',
    '@type': pageType,
    name,
    description,
    url,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    publisher: { '@id': organizationId },
    dateModified: site.lastUpdated
  };
}

export function itemListSchema(name: string, items: { name: string; url: string; description?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.url,
      name: item.name,
      ...(item.description ? { description: item.description } : {})
    }))
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function howToSchema(name: string, description: string, url: string, steps: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    inLanguage: 'en',
    totalTime: 'PT2M',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step
    }))
  };
}

export function toolApplicationSchema(tool: Tool, canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['WebApplication', 'SoftwareApplication'],
    name: tool.h1,
    alternateName: tool.title,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any device with a modern web browser',
    browserRequirements: 'Requires a modern browser with JavaScript enabled.',
    url: canonical,
    description: tool.metaDescription,
    keywords: [tool.primaryKeyword, tool.category, 'browser-only privacy tool', 'no upload privacy tool'],
    isAccessibleForFree: true,
    dateModified: site.lastUpdated,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    publisher: { '@id': organizationId },
    creator: { '@id': organizationId },
    featureList: [tool.outputPromise, 'Processes supported inputs locally in the browser', 'No account required', 'No server-side file upload for supported files'],
    softwareHelp: `${site.url}/guides/${tool.articleSlug}/`,
    potentialAction: {
      '@type': 'UseAction',
      target: canonical,
      name: tool.cta
    }
  };
}

export function articleSchema(article: Article, canonical: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: canonical,
    image: new URL(site.ogImage, site.url).href,
    dateModified: article.updated,
    datePublished: article.updated,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: site.authorName, url: site.url },
    publisher: { '@id': organizationId },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
  };
}
