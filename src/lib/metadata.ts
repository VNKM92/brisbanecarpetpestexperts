import { Metadata } from 'next';
import { SEO_CONFIG } from '@/config/seo';

export function generateMetadata(
  title: string,
  description: string,
  path: string = '/',
  image?: string,
  type: 'website' | 'article' = 'website'
): Metadata {
  const url = `${SEO_CONFIG.siteUrl}${path}`;
  const ogImage = image || SEO_CONFIG.defaultImage;

  return {
    title: {
      default: title,
      template: `%s | ${SEO_CONFIG.siteName}`,
    },
    description,
    keywords: ['cleaning services', 'professional cleaning', 'home cleaning'],
    viewport: 'width=device-width, initial-scale=1.0',
    robots: SEO_CONFIG.robots,
    
    // Open Graph
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title,
      description,
      siteName: SEO_CONFIG.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: SEO_CONFIG.defaultImageAlt,
        },
      ],
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: SEO_CONFIG.twitterHandle,
      title,
      description,
      images: [ogImage],
    },

    // Verification
    verification: {
      google: SEO_CONFIG.googleSiteVerification || '',
    },

    // Canonical
    alternates: {
      canonical: url,
    },
  };
}

export function generateSchemaMarkup(
  type: 'Organization' | 'LocalBusiness' | 'BreadcrumbList' | 'Article',
  data: Record<string, any>
): string {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return JSON.stringify(schemaData);
}
