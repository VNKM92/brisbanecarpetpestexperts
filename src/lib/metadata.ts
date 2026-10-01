import { Metadata } from 'next';
import { SEO_CONFIG, COMPANY_INFO } from '@/config/seo';
import { prisma } from './prisma';

export interface PageMetadataOptions {
  slug?: string;
  serviceSlug?: string;
  blogSlug?: string;
  focusKeyword?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

/**
 * Enterprise Production SEO Dynamic Metadata Generator
 * Generates advance level Google-ranking metadata with focus keywords,
 * canonical URLs, Open Graph, Twitter cards, and database synchronization.
 */
export async function getPageMetadata(options: PageMetadataOptions = {}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl || 'https://brisbanecarpetpestexperts.com.au';
  const path = options.path || (options.slug ? `/${options.slug}` : '/');
  const canonicalUrl = `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;

  let dbData: any = null;

  // 1. Check Page Table in Database
  if (options.slug) {
    try {
      dbData = await prisma.page.findUnique({
        where: { slug: options.slug },
      });
    } catch (e) {
      // Graceful DB fallback
    }
  }

  // 2. Check Service Table in Database
  if (!dbData && (options.serviceSlug || options.slug)) {
    try {
      dbData = await prisma.service.findUnique({
        where: { slug: options.serviceSlug || options.slug },
      });
    } catch (e) {}
  }

  // 3. Check Blog Table in Database
  if (!dbData && options.blogSlug) {
    try {
      dbData = await prisma.blog.findUnique({
        where: { slug: options.blogSlug },
      });
    } catch (e) {}
  }

  const focus = options.focusKeyword || '';
  const baseTitle =
    dbData?.metaTitle ||
    dbData?.title ||
    options.defaultTitle ||
    (focus ? `${focus.charAt(0).toUpperCase() + focus.slice(1)} | Brisbane Carpet & Pest Experts` : 'Brisbane Carpet & Pest Experts | Professional Cleaning & Pest Control');

  const title = baseTitle.includes('Brisbane Carpet & Pest Experts')
    ? baseTitle
    : `${baseTitle} | Brisbane Carpet & Pest Experts`;

  const description =
    dbData?.metaDesc ||
    options.defaultDescription ||
    SEO_CONFIG.siteDescription ||
    'Brisbane’s trusted experts for bond cleaning, carpet steam cleaning, upholstery cleaning, and pest control. 100% Bond Back Guarantee with fast quotes.';

  // Build high-relevance search keywords
  const explicitKeywords = options.keywords || [];
  const dbKeywords = dbData?.metaKeywords
    ? dbData.metaKeywords.split(',').map((k: string) => k.trim())
    : [];

  const combinedKeywords = Array.from(
    new Set([
      ...(focus ? [focus, `${focus} qld`, `best ${focus}`, `cheap ${focus}`] : []),
      ...explicitKeywords,
      ...dbKeywords,
      ...SEO_CONFIG.keywords,
    ])
  );

  const ogImage =
    dbData?.ogImage ||
    dbData?.featuredImg ||
    options.image ||
    `${baseUrl}/images/home-clean.jpg`;

  const robotsDirective = options.noIndex ? 'noindex, nofollow' : dbData?.robots || 'index, follow';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s | Brisbane Carpet & Pest Experts',
    },
    description,
    keywords: combinedKeywords,
    authors: [{ name: 'Brisbane Carpet & Pest Experts', url: baseUrl }],
    creator: 'Brisbane Carpet & Pest Experts',
    publisher: 'Brisbane Carpet & Pest Experts',
    category: 'Home & Commercial Cleaning Services',
    alternates: {
      canonical: dbData?.canonicalUrl || canonicalUrl,
    },
    robots: {
      index: !robotsDirective.includes('noindex'),
      follow: !robotsDirective.includes('nofollow'),
      googleBot: {
        index: !robotsDirective.includes('noindex'),
        follow: !robotsDirective.includes('nofollow'),
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: options.type || 'website',
      locale: 'en_AU',
      url: canonicalUrl,
      title,
      description,
      siteName: 'Brisbane Carpet & Pest Experts',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@brisbanecarpet',
      site: '@brisbanecarpet',
      title,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`],
    },
    other: {
      'geo.region': 'AU-QLD',
      'geo.placename': 'Brisbane',
      'geo.position': '-27.5815;153.0567',
      'ICBM': '-27.5815, 153.0567',
      ...(focus ? { 'focus-keyword': focus } : {}),
    },
  };
}

export function generateMetadata(
  title: string,
  description: string,
  path: string = '/',
  image?: string,
  focusKeyword?: string
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl || 'https://brisbanecarpetpestexperts.com.au';
  const url = `${baseUrl.replace(/\/$/, '')}${path}`;
  const ogImage = image || `${baseUrl}/images/home-clean.jpg`;

  const keywords = Array.from(
    new Set([
      ...(focusKeyword ? [focusKeyword, `${focusKeyword} brisbane`, `best ${focusKeyword}`] : []),
      ...SEO_CONFIG.keywords,
    ])
  );

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${title} | Brisbane Carpet & Pest Experts`,
      template: '%s | Brisbane Carpet & Pest Experts',
    },
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url,
      title: `${title} | Brisbane Carpet & Pest Experts`,
      description,
      siteName: 'Brisbane Carpet & Pest Experts',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Brisbane Carpet & Pest Experts`,
      description,
      images: [ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`],
    },
    other: {
      'geo.region': 'AU-QLD',
      'geo.placename': 'Brisbane',
      'geo.position': '-27.5815;153.0567',
      'ICBM': '-27.5815, 153.0567',
      ...(focusKeyword ? { 'focus-keyword': focusKeyword } : {}),
    },
  };
}
