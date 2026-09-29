import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  console.log('Seeding policy pages & site branding...');

  // 1. Pages
  const defaultPages = [
    {
      title: 'Home Page',
      slug: 'home',
      heading: 'Expert Carpet Cleaning & Pest Control in Brisbane',
      subheading: 'Professional end of lease cleaning, carpet steam cleaning, and comprehensive pest management backed by our 100% Bond Back Guarantee.',
      metaTitle: 'Brisbane Carpet & Pest Experts | Top-Rated Bond Cleaning Brisbane',
      metaDesc: 'Professional cleaning services in Brisbane including bond cleaning, end-of-lease, carpet steam cleaning, and pest control. 100% Satisfaction & Bond Back Guaranteed.',
      metaKeywords: 'carpet cleaning brisbane, bond cleaning, pest control brisbane, end of lease cleaning, commercial cleaning',
      canonicalUrl: 'http://localhost:3000',
      isPublished: true,
    },
    {
      title: 'About Us',
      slug: 'about-us',
      heading: 'About Brisbane Carpet & Pest Experts',
      subheading: 'Queensland premier residential and commercial cleaning and pest control service provider.',
      metaTitle: 'About Us | Brisbane Carpet & Pest Experts',
      metaDesc: 'Learn about our certified cleaning technicians, eco-friendly practices, and 100% Bond Back Guarantee.',
      metaKeywords: 'about brisbane cleaners, certified carpet cleaners, pest control experts',
      canonicalUrl: 'http://localhost:3000/about-us',
      isPublished: true,
    },
    {
      title: 'Privacy Policy',
      slug: 'privacy-policy',
      heading: 'Privacy Policy',
      subheading: 'Australian Privacy Principles (APP) & Privacy Act 1988 Compliance',
      metaTitle: 'Privacy Policy | Brisbane Carpet & Pest Experts',
      metaDesc: 'Read our comprehensive Privacy Policy outlining how Brisbane Carpet & Pest Experts collects, protects, uses, and discloses your personal information in compliance with Australian Privacy Principles (APPs).',
      metaKeywords: 'privacy policy, APP compliance, data security, brisbane carpet cleaning',
      canonicalUrl: 'http://localhost:3000/privacy-policy',
      isPublished: true,
    },
    {
      title: 'Terms of Service',
      slug: 'terms-of-service',
      heading: 'Terms of Service',
      subheading: 'Service Agreement, Booking Conditions & 100% Bond Back Guarantee Terms',
      metaTitle: 'Terms of Service | Brisbane Carpet & Pest Experts',
      metaDesc: 'Read the Terms and Conditions of service for Brisbane Carpet & Pest Experts covering bookings, cancellations, 100% bond back guarantee, and service policies.',
      metaKeywords: 'terms of service, booking terms, bond back guarantee policy, terms and conditions',
      canonicalUrl: 'http://localhost:3000/terms-of-service',
      isPublished: true,
    },
    {
      title: 'Cookie Policy',
      slug: 'cookie-policy',
      heading: 'Cookie Policy',
      subheading: 'How we utilize cookies and tracking technologies to ensure optimal booking experiences.',
      metaTitle: 'Cookie Policy | Brisbane Carpet & Pest Experts',
      metaDesc: 'Understand how Brisbane Carpet & Pest Experts uses cookies, web beacons, and local tracking technologies to optimize your browsing and booking experience.',
      metaKeywords: 'cookie policy, tracking technologies, browser cookies, privacy consent',
      canonicalUrl: 'http://localhost:3000/cookie-policy',
      isPublished: true,
    },
    {
      title: 'Cookies Settings',
      slug: 'cookies-settings',
      heading: 'Cookies Settings',
      subheading: 'Take full control over which cookies and tracking data we use during your visit.',
      metaTitle: 'Cookies Settings & Preferences | Brisbane Carpet & Pest Experts',
      metaDesc: 'Manage your cookies preferences and tracking consent settings for Brisbane Carpet & Pest Experts.',
      metaKeywords: 'cookies settings, cookie consent manager, privacy preferences',
      canonicalUrl: 'http://localhost:3000/cookies-settings',
      isPublished: true,
    },
  ];

  for (const p of defaultPages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 2. Settings
  const settings = [
    { key: 'site_name', value: 'Brisbane Carpet & Pest Experts', group: 'general', label: 'Website Name' },
    { key: 'site_slogan', value: 'Eco-Friendly Steam Carpet Cleaning & Pest Control in Brisbane', group: 'general', label: 'Site Slogan' },
    { key: 'header_logo', value: '/logo.png', group: 'general', label: 'Header Logo URL' },
    { key: 'footer_logo', value: '/logo.png', group: 'general', label: 'Footer Logo URL' },
    { key: 'site_logo', value: '/logo.png', group: 'general', label: 'Default Logo URL' },
    { key: 'company_phone', value: '0434 061 188', group: 'contact', label: 'Primary Phone' },
    { key: 'company_email', value: 'info@brisbane.com', group: 'contact', label: 'Primary Email' },
    { key: 'company_address', value: '192 Turton St, Sunnybank, QLD 4109, Australia', group: 'contact', label: 'Address' },
    { key: 'business_hours', value: 'Monday to Saturday: 8:00 AM – 6:00 PM', group: 'contact', label: 'Business Hours' },
    { key: 'footer_about_text', value: 'We clean with care, precision, and eco-friendly products across Brisbane and surrounding Queensland suburbs.', group: 'general', label: 'Footer About Bio' },
    { key: 'footer_cta_text', value: 'Book A Free Consultation', group: 'general', label: 'Footer CTA Text' },
    { key: 'footer_cta_link', value: '/contact', group: 'general', label: 'Footer CTA Link' },
    { key: 'footer_copyright', value: '© 2026 Brisbane Carpet & Pest Experts. All rights reserved.', group: 'general', label: 'Footer Copyright' },
    { key: 'social_facebook', value: 'https://facebook.com/brisbaneservices', group: 'social', label: 'Facebook URL' },
    { key: 'social_instagram', value: 'https://instagram.com/brisbaneservices', group: 'social', label: 'Instagram URL' },
    { key: 'social_twitter', value: 'https://twitter.com/brisbanecarpet', group: 'social', label: 'Twitter / X URL' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/brisbaneservices', group: 'social', label: 'LinkedIn URL' },
    { key: 'default_meta_title', value: 'Brisbane Carpet & Pest Experts | Professional Cleaning Services', group: 'seo', label: 'Default Meta Title' },
    { key: 'default_meta_desc', value: 'Top rated bond cleaning, carpet steam cleaning and pest control services in Brisbane Queensland. 100% satisfaction guarantee.', group: 'seo', label: 'Default Meta Description' },
    { key: 'pricing_base_rate', value: '700', group: 'booking', label: 'Base Estimate Rate ($)' },
    { key: 'pricing_supplies_rate', value: '40', group: 'booking', label: 'Supplies Add-on Rate ($)' },
  ];

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: {},
      create: s,
    });
  }

  console.log('Seed runner completed successfully!');
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
