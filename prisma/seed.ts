import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Permissions
  const permissionsList = [
    { name: 'Read Services', slug: 'services:read', category: 'Services' },
    { name: 'Create Services', slug: 'services:create', category: 'Services' },
    { name: 'Update Services', slug: 'services:update', category: 'Services' },
    { name: 'Delete Services', slug: 'services:delete', category: 'Services' },
    { name: 'Read Enquiries', slug: 'enquiries:read', category: 'Enquiries' },
    { name: 'Manage Enquiries', slug: 'enquiries:manage', category: 'Enquiries' },
    { name: 'Read Bookings', slug: 'bookings:read', category: 'Bookings' },
    { name: 'Manage Bookings', slug: 'bookings:manage', category: 'Bookings' },
    { name: 'Manage Orders', slug: 'orders:manage', category: 'Orders' },
    { name: 'Manage Pages', slug: 'pages:manage', category: 'CMS' },
    { name: 'Manage Blogs', slug: 'blogs:manage', category: 'CMS' },
    { name: 'Manage FAQs', slug: 'faqs:manage', category: 'CMS' },
    { name: 'Manage Testimonials', slug: 'testimonials:manage', category: 'CMS' },
    { name: 'Manage Media', slug: 'media:manage', category: 'Media' },
    { name: 'Manage Users', slug: 'users:manage', category: 'System' },
    { name: 'Manage Roles', slug: 'roles:manage', category: 'System' },
    { name: 'Manage Settings', slug: 'settings:manage', category: 'Settings' },
    { name: 'Read Logs', slug: 'logs:read', category: 'System' },
  ];

  const permissionsMap = new Map<string, string>();
  for (const p of permissionsList) {
    const existing = await prisma.permission.findUnique({ where: { slug: p.slug } });
    if (!existing) {
      const created = await prisma.permission.create({ data: p });
      permissionsMap.set(p.slug, created.id);
    } else {
      permissionsMap.set(p.slug, existing.id);
    }
  }

  // 2. Roles
  let superAdminRole = await prisma.role.findUnique({ where: { slug: 'super-admin' } });
  if (!superAdminRole) {
    superAdminRole = await prisma.role.create({
      data: {
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full unrestricted access to all modules and configurations',
        isSystem: true,
      },
    });
  }

  let adminRole = await prisma.role.findUnique({ where: { slug: 'admin' } });
  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'Admin',
        slug: 'admin',
        description: 'Standard administrator with full operational access',
        isSystem: true,
      },
    });
  }

  let managerRole = await prisma.role.findUnique({ where: { slug: 'manager' } });
  if (!managerRole) {
    managerRole = await prisma.role.create({
      data: {
        name: 'Manager',
        slug: 'manager',
        description: 'Operations manager for bookings, enquiries and CMS',
        isSystem: true,
      },
    });
  }

  let staffRole = await prisma.role.findUnique({ where: { slug: 'staff' } });
  if (!staffRole) {
    staffRole = await prisma.role.create({
      data: {
        name: 'Staff',
        slug: 'staff',
        description: 'Support staff with read and update status rights',
        isSystem: true,
      },
    });
  }

  // Assign permissions to Super Admin & Admin
  for (const permId of permissionsMap.values()) {
    const existingLink = await prisma.rolePermission.findUnique({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: permId,
        },
      },
    });
    if (!existingLink) {
      await prisma.rolePermission.create({
        data: {
          roleId: superAdminRole.id,
          permissionId: permId,
        },
      });
    }
  }

  // 3. Super Admin User
  const adminEmail = 'admin@brisbane.com';
  const existingUser = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingUser) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@123456', salt);

    await prisma.user.create({
      data: {
        name: 'Master Admin',
        email: adminEmail,
        passwordHash,
        phone: '0434 061 188',
        status: 'ACTIVE',
        roleId: superAdminRole.id,
      },
    });
    console.log('✅ Created Super Admin: admin@brisbane.com / Admin@123456');
  }

  // 4. Service Categories
  const domesticCat = await prisma.serviceCategory.upsert({
    where: { slug: 'domestic-services' },
    update: {},
    create: {
      name: 'Domestic Services',
      slug: 'domestic-services',
      description: 'Comprehensive residential cleaning and sanitation services',
      icon: '🏠',
      order: 1,
    },
  });

  const commercialCat = await prisma.serviceCategory.upsert({
    where: { slug: 'commercial-services' },
    update: {},
    create: {
      name: 'Commercial Services',
      slug: 'commercial-services',
      description: 'Professional commercial, industrial and specialized facility cleaning',
      icon: '🏢',
      order: 2,
    },
  });

  // 5. Services
  const servicesList = [
    {
      name: 'Bond Cleaning Brisbane',
      slug: 'bond-cleaning-brisbane',
      categoryId: domesticCat.id,
      shortDesc: 'Ensure you get your bond deposit back with our expert bond cleaning services in Brisbane.',
      description: 'Ensure you get your bond deposit back with our expert bond cleaning services in Brisbane. Our comprehensive cleaning packages are tailored to meet the strict standards of landlords and property managers. With flexible scheduling and a satisfaction guarantee, we make the moving process stress-free and efficient.',
      priceStarting: 400,
      priceUnit: 'Fixed',
      duration: '4-6 hours',
      icon: '🏠',
      heroImage: '/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg',
      features: JSON.stringify([
        'Deep cleaning all rooms',
        'Carpet and floor cleaning',
        'Kitchen and appliance detailing',
        'Window and blind cleaning',
        'Bond back guarantee',
      ]),
      tabData: JSON.stringify({
        residential: {
          title: 'Residential',
          price: 'From $400',
          features: ['Deep cleaning all rooms', 'Carpet and floor cleaning', 'Kitchen detailing', 'Bond back guarantee'],
        },
        commercial: {
          title: 'Commercial',
          price: 'From $600',
          features: ['Office space cleaning', 'Carpet and floor care', 'Glass cleaning', 'Same-day availability'],
        },
        outdoor: {
          title: 'Outdoor',
          price: 'From $300',
          features: ['Pressure washing driveways', 'Patio & deck cleaning', 'Debris removal', 'Fence cleaning'],
        },
      }),
      metaTitle: 'Bond Cleaning Brisbane | 100% Bond Back Guarantee',
      metaDesc: 'Professional bond cleaning and end of lease cleaning in Brisbane. Guaranteed landlord approval and flexible booking.',
      isFeatured: true,
      order: 1,
    },
    {
      name: 'End Of Lease Cleaning Brisbane',
      slug: 'end-of-lease-cleaning-brisbane',
      categoryId: domesticCat.id,
      shortDesc: 'Complete end-of-lease sanitization designed for quick inspection pass.',
      description: 'High-standard cleaning checklist covering every corner of your rental property before handover.',
      priceStarting: 390,
      priceUnit: 'Fixed',
      duration: '4-5 hours',
      icon: '🔑',
      heroImage: '/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg',
      features: JSON.stringify(['Oven & rangehood degreasing', 'Wall mark removals', 'Bathroom tile scrubbing', 'Carpet steam extraction']),
      metaTitle: 'End Of Lease Cleaning Brisbane | Fast & Reliable',
      metaDesc: 'Stress-free end of lease cleaning services across Brisbane.',
      isFeatured: true,
      order: 2,
    },
    {
      name: 'Pre-Sale Cleaning Brisbane',
      slug: 'pre-sale-cleaning-brisbane',
      categoryId: domesticCat.id,
      shortDesc: 'Maximize your property value before open inspections.',
      description: 'Prepare your home to impress prospective buyers with sparkling interiors and spotless curb appeal.',
      priceStarting: 450,
      priceUnit: 'Fixed',
      duration: '5-7 hours',
      icon: '✨',
      heroImage: '/assets/about/home-clean.jpg',
      features: JSON.stringify(['High-pressure exterior wash', 'Window polishing', 'Interior deep clean', 'Deodorizing']),
      metaTitle: 'Pre-Sale Cleaning Brisbane | High ROI Home Staging Clean',
      metaDesc: 'Make your property shine for buyers with Brisbane premier pre-sale cleaning services.',
      isFeatured: false,
      order: 3,
    },
    {
      name: 'Pest Control Brisbane',
      slug: 'pest-control-brisbane',
      categoryId: domesticCat.id,
      shortDesc: 'Safe, pet-friendly and certified eradication of pests.',
      description: 'Comprehensive pest control for cockroaches, ants, spiders, rodents and termites tailored to Brisbane climate.',
      priceStarting: 180,
      priceUnit: 'Fixed',
      duration: '1-2 hours',
      icon: '🛡️',
      heroImage: '/assets/home/image/brisbanecarpetpestexperts-img2-1.jpg',
      features: JSON.stringify(['Eco-safe treatments', 'Targeted pest elimination', 'Warranty on treatments', 'Child & pet safe']),
      metaTitle: 'Pest Control Brisbane | Certified & Safe Pest Exterminators',
      metaDesc: 'Reliable and pet-safe pest control in Brisbane for homes and commercial facilities.',
      isFeatured: true,
      order: 4,
    },
    {
      name: 'Carpet Cleaning',
      slug: 'carpet-cleaning',
      categoryId: commercialCat.id,
      shortDesc: 'Deep hot water extraction and steam carpet cleaning.',
      description: 'Eliminate stubborn stains, deep dust, allergens and pet odors with state-of-the-art steam extraction.',
      priceStarting: 99,
      priceUnit: 'Fixed',
      duration: '1-3 hours',
      icon: '🧼',
      heroImage: '/assets/about/carpet-service-1.jpg',
      features: JSON.stringify(['Hot water extraction', 'Stain pre-treatment', 'Quick dry technology', 'Sanitization']),
      metaTitle: 'Carpet Cleaning Brisbane | Steam & Stain Removal Experts',
      metaDesc: 'Revitalize your carpets with Brisbane trusted carpet steam cleaning service.',
      isFeatured: true,
      order: 5,
    },
    {
      name: 'Office Cleaning',
      slug: 'office-cleaning',
      categoryId: commercialCat.id,
      shortDesc: 'Regular and deep janitorial cleaning for commercial workspaces.',
      description: 'Maintain a pristine, hygienic and productive office atmosphere for staff and visitors.',
      priceStarting: 150,
      priceUnit: 'Hourly',
      duration: '2-4 hours',
      icon: '🏢',
      heroImage: '/assets/about/office-clean.jpg',
      features: JSON.stringify(['Workstation disinfection', 'Rubbish disposal', 'Restroom sanitization', 'Floor buffing']),
      metaTitle: 'Commercial Office Cleaning Brisbane',
      metaDesc: 'Professional commercial office cleaning contracts and one-off cleans.',
      isFeatured: false,
      order: 6,
    },
    {
      name: 'Tile And Grout Cleaning',
      slug: 'tile-and-grout-cleaning',
      categoryId: commercialCat.id,
      shortDesc: 'High-pressure restoration of tiled surfaces and grout lines.',
      description: 'Restore discolored tile and grout lines in kitchens, bathrooms and commercial lobbies.',
      priceStarting: 160,
      priceUnit: 'Fixed',
      duration: '2-3 hours',
      icon: '🧽',
      heroImage: '/assets/about/windowcleaning.jpg',
      features: JSON.stringify(['High-pressure steam', 'Deep grout scrubbing', 'Protective sealing', 'Mold removal']),
      metaTitle: 'Tile and Grout Cleaning Brisbane | Spotless Restoration',
      metaDesc: 'Bring back the original shine of your tiled floors and walls.',
      isFeatured: false,
      order: 7,
    },
    {
      name: 'Upholstery Cleaning',
      slug: 'upholstery-cleaning',
      categoryId: commercialCat.id,
      shortDesc: 'Fabric and leather sofa, couch and mattress revival.',
      description: 'Gentle yet potent steam cleaning that removes deep stains and bacteria from upholstered furniture.',
      priceStarting: 120,
      priceUnit: 'Fixed',
      duration: '1-2 hours',
      icon: '🛋️',
      heroImage: '/sofa-clean.jpg',
      features: JSON.stringify(['Fabric color protection', 'Odor neutralizer', 'Leather conditioning', 'Anti-allergen']),
      metaTitle: 'Upholstery & Sofa Cleaning Brisbane',
      metaDesc: 'Deep sofa and fabric cleaning in Brisbane.',
      isFeatured: false,
      order: 8,
    },
  ];

  for (const s of servicesList) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 6. Blog Categories & Posts
  const blogCats = ['Cleaning', 'Guides', 'DIY', 'Services', 'Tips & Tricks'];
  const catObjMap = new Map<string, string>();
  for (const c of blogCats) {
    const slug = c.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const bCat = await prisma.blogCategory.upsert({
      where: { slug },
      update: {},
      create: { name: c, slug },
    });
    catObjMap.set(c, bCat.id);
  }

  const blogs = [
    {
      title: 'Choosing the Right Carpet and Pest Cleaning Service in Brisbane',
      slug: 'choosing-right-carpet-pest-cleaning-brisbane',
      excerpt: 'Selecting reliable carpet and pest cleaning services in Brisbane is crucial for maintaining a clean, healthy environment.',
      content: `Selecting reliable carpet and pest cleaning services in Brisbane is crucial for maintaining a clean, healthy environment in homes and businesses. Whether you're seeking carpet cleaning to refresh your floors or pest control to safeguard against unwanted invaders, this guide outlines key factors to consider and tips for evaluating service providers in Brisbane.

## Importance of Professional Cleaning Services
Professional cleaning services offer expertise, specialized equipment, and eco-friendly solutions that go beyond regular maintenance. Regular vacuuming and DIY pest control often fall short in Brisbane's humid climate.

### Why Choose Professional Services?
- **Deep Cleaning**: Professional equipment removes dirt, allergens, and bacteria embedded in carpet fibers
- **Pest Prevention**: Experts identify and treat pest hotspots before infestations worsen
- **Health Benefits**: Cleaner carpets and pest-free environments reduce allergies and health risks`,
      featuredImg: '/assets/blog/pages/carpet-and-pest-cleaning.jpg',
      author: 'Brisbane Carpet Experts',
      readTime: 5,
      categoryId: catObjMap.get('Cleaning'),
      tags: 'Carpet Cleaning, Pest Control, Brisbane Tips',
      metaTitle: 'Choosing Carpet and Pest Cleaning in Brisbane',
      metaDesc: 'Key tips to select the best certified carpet and pest cleaners in Brisbane.',
      status: 'PUBLISHED',
    },
    {
      title: 'How Weather Conditions Affect Pest Activity in Brisbane',
      slug: 'weather-conditions-affect-pest-activity-brisbane',
      excerpt: "Brisbane's subtropical climate provides a diverse habitat for pests, influencing their behavior and seasonal activity patterns.",
      content: `Brisbane's subtropical climate provides a diverse habitat for pests, influencing their behavior and seasonal activity patterns throughout the year. Understanding how weather conditions impact pest infestations is crucial for proactive pest management.

## Seasonal Patterns
- **Summer**: High humidity accelerates cockroach and mosquito breeding.
- **Winter**: Rodents seek indoor shelter and warmth.
- **Spring**: Termite swarming seasons commence.`,
      featuredImg: '/assets/blog/pages/weather-conditions-affect.jpg',
      author: 'Pest Specialist Team',
      readTime: 6,
      categoryId: catObjMap.get('Guides'),
      tags: 'Pest Control, Weather, Subtropical',
      metaTitle: 'Weather & Pest Activity in Brisbane | Seasonal Guide',
      metaDesc: 'How humidity and rainfall impact pest activity in Queensland homes.',
      status: 'PUBLISHED',
    },
    {
      title: 'Best Robot Vacuums for Queensland Homes (2026 Guide)',
      slug: 'best-robot-vacuums-2025',
      excerpt: 'Discover the top-rated smart robot vacuums that complement professional carpet maintenance.',
      content: `The smart vacuum market has evolved significantly, offering intelligent cleaning solutions that fit modern busy lifestyles while keeping pet hair and sand at bay.`,
      featuredImg: '/assets/blog/pages/carpet-and-pest-cleaning.jpg',
      author: 'Tech Review Team',
      readTime: 4,
      categoryId: catObjMap.get('Tips & Tricks'),
      tags: 'Robot Vacuum, Gadgets, Cleaning Tips',
      metaTitle: 'Best Robot Vacuums 2026 | Cleaning Guide',
      metaDesc: 'Comparison of top automated vacuums for carpet and hard floors.',
      status: 'PUBLISHED',
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: b,
      create: b,
    });
  }

  // 7. FAQs
  const faqCat = await prisma.faqCategory.upsert({
    where: { slug: 'general-faqs' },
    update: {},
    create: { name: 'General Questions', slug: 'general-faqs', order: 1 },
  });

  const faqs = [
    {
      question: "What services don't you offer?",
      answer: "We don't offer hazardous waste cleaning, heavy industrial machinery lifting, or outdoor construction demolition. We handle all residential and commercial bond, carpet, and pest needs.",
      categoryId: faqCat.id,
      order: 1,
    },
    {
      question: 'How far in advance should I book for bond cleaning?',
      answer: 'You can book as early as you like, or even request same-day service depending on team availability. We recommend 48-72 hours in advance.',
      categoryId: faqCat.id,
      order: 2,
    },
    {
      question: 'Are your cleaning chemicals safe for children and pets?',
      answer: 'Yes! We prioritize eco-friendly, biodegradable, and non-toxic cleaning agents and pest solutions that are safe for pets and children once dry.',
      categoryId: faqCat.id,
      order: 3,
    },
    {
      question: 'What if the real estate property manager is not satisfied?',
      answer: 'We provide a 100% Bond Back Guarantee. If any item on the inspection report requires touch up within 72 hours, we return and fix it at zero extra charge.',
      categoryId: faqCat.id,
      order: 4,
    },
  ];

  for (const f of faqs) {
    const existing = await prisma.faq.findFirst({ where: { question: f.question } });
    if (!existing) {
      await prisma.faq.create({ data: f });
    }
  }

  // 8. Testimonials
  const testimonials = [
    {
      clientName: 'Rebecca Hawland',
      role: 'Homeowner',
      location: 'Sunnybank, Brisbane',
      avatar: '/testimonial/user3.jpg',
      rating: 5,
      review: 'Great response time, staff was on time and got the job done pretty quickly. House looked great when they finished.',
      source: 'Google',
      order: 1,
    },
    {
      clientName: 'Annie Bennedict',
      role: 'Tenant',
      location: 'South Brisbane',
      avatar: '/testimonial/user1.jpg',
      rating: 5,
      review: 'They were mindful of using natural cleaning products for my kids room, which I was very appreciative of. Got 100% of my bond back!',
      source: 'Google',
      order: 2,
    },
    {
      clientName: 'David Miller',
      role: 'Property Manager',
      location: 'Brisbane CBD',
      avatar: '/testimonial/user2.jpg',
      rating: 5,
      review: 'Always our go-to team for end of lease cleans. Thorough checklists, responsive team, and top quality results.',
      source: 'Google',
      order: 3,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { clientName: t.clientName } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  // 9. CMS Pages (including legal policy pages)
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

  for (const page of defaultPages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: page,
      create: page,
    });
  }

  // 10. Site Settings
  const defaultSettings = [
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

  for (const set of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: set.key },
      update: {},
      create: set,
    });
  }

  console.log('✅ Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
