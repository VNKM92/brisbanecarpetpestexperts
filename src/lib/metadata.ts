import { Metadata } from 'next';
import { SEO_CONFIG } from '@/config/seo';
import { prisma } from './prisma';

interface PageMetadataOptions {
  slug?: string;
  defaultTitle?: string;
  defaultDescription?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}

/**
 * Enterprise SEO Dynamic Metadata Generator
 * Fetches admin-configured metadata from database with fallback to sensible defaults
 */
export async function getPageMetadata(options: PageMetadataOptions = {}): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl || 'http://localhost:3000';
  const path = options.path || (options.slug ? `/${options.slug}` : '/');
  const canonicalUrl = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  let pageData: any = null;

  if (options.slug) {
    try {
      pageData = await prisma.page.findUnique({
        where: { slug: options.slug },
      });
    } catch (e) {
      // Fallback gracefully on DB error
    }
  }

  const title =
    pageData?.metaTitle ||
    pageData?.title ||
    options.defaultTitle ||
    'Brisbane Carpet & Pest Experts | Professional Cleaning Services';

  const description =
    pageData?.metaDesc ||
    options.defaultDescription ||
    SEO_CONFIG.siteDescription ||
    'Professional cleaning services in Brisbane including bond cleaning, end-of-lease, carpet cleaning, pest control, and more. Experienced team, satisfaction guaranteed.';

  const keywords = pageData?.metaKeywords
    ? pageData.metaKeywords.split(',').map((k: string) => k.trim())
    : ['cleaning services', 'bond cleaning', 'Brisbane', 'end-of-lease', 'carpet cleaning', 'pest control'];

  const ogImage =
    pageData?.ogImage ||
    options.image ||
    `${baseUrl}/images/home-clean.jpg`;

  const robots = pageData?.robots || 'index, follow';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: '%s | Brisbane Carpet & Pest Experts',
    },
    description,
    keywords,
    robots: {
      index: !robots.includes('noindex'),
      follow: !robots.includes('nofollow'),
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    alternates: {
      canonical: pageData?.canonicalUrl || canonicalUrl,
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
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@brisbanecarpet',
      title,
      description,
      images: [ogImage],
    },
  };
}

export function generateMetadata(
  title: string,
  description: string,
  path: string = '/',
  image?: string,
  type: 'website' | 'article' = 'website'
): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SEO_CONFIG.siteUrl || 'http://localhost:3000';
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/images/home-clean.jpg`;

  return {
    title: {
      default: title,
      template: `%s | Brisbane Carpet & Pest Experts`,
    },
    description,
    keywords: ['cleaning services', 'bond cleaning', 'Brisbane', 'carpet cleaning', 'pest control'],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type,
      locale: 'en_AU',
      url,
      title,
      description,
      siteName: 'Brisbane Carpet & Pest Experts',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}
