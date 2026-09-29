import { SEO_CONFIG, COMPANY_INFO } from '@/config/seo';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateWebSiteSchema(siteUrl = SEO_CONFIG.siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_CONFIG.siteName,
    url: siteUrl,
    description: SEO_CONFIG.siteDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/services?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateLocalBusinessSchema(siteUrl = SEO_CONFIG.siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    '@id': `${siteUrl}/#localbusiness`,
    name: 'Brisbane Carpet & Pest Experts',
    image: `${siteUrl}/images/home-clean.jpg`,
    url: siteUrl,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Brisbane Region',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4109',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -27.4698,
      longitude: 153.0251,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      COMPANY_INFO.social.facebook,
      COMPANY_INFO.social.instagram,
      COMPANY_INFO.social.twitter,
      COMPANY_INFO.social.linkedin,
    ].filter(Boolean),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Brisbane, Queensland, Australia',
    },
  };
}

export function generateServiceSchema({
  name,
  description,
  url,
  image,
  price,
  siteUrl = SEO_CONFIG.siteUrl,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
  siteUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cleaning and Pest Control',
    name,
    description,
    provider: {
      '@type': 'CleaningService',
      name: 'Brisbane Carpet & Pest Experts',
      url: siteUrl,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Brisbane, Queensland, Australia',
    },
    url,
    ...(image ? { image } : {}),
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            price: price.toString(),
            priceCurrency: 'AUD',
          },
        }
      : {}),
  };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[], siteUrl = SEO_CONFIG.siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  authorName = 'Brisbane Cleaning Experts',
  siteUrl = SEO_CONFIG.siteUrl,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  siteUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    description,
    image: image ? [image.startsWith('http') ? image : `${siteUrl}${image}`] : [`${siteUrl}/images/article1.jpg`],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Brisbane Carpet & Pest Experts',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
