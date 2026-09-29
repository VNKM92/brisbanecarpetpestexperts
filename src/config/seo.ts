export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'brisbane',
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Professional cleaning services',
  twitterHandle: '@qleenservices',
  defaultImage: '/images/og-image.jpg',
  defaultImageAlt: 'Qleen - Professional Cleaning Services',
  robots: 'follow, index',
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
};

export const COMPANY_INFO = {
  name: 'Brisbane',
  email: 'info@brisbane.com',
  phone: '0434 061 188',
  address: '4109 Brisbane Queensland\n Australia.',
  social: {
    twitter: 'https://twitter.com/brisbanecarpet',
    facebook: 'https://facebook.com/brisbaneservices',
    instagram: 'https://instagram.com/brisbaneservices',
    linkedin: 'https://linkedin.com/company/brisbaneservices',
  },
};
