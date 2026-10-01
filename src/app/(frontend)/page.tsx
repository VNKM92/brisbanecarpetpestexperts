import Hero from './components/Hero';
import Testimonials from "./components/Testimonials";
import SuperCard from './components/SuperCard';
import HomeAbout from './components/HomeAbout';
import EstimatePage from './components/EstimatePage';
import MainCard from './components/homepage/MainCard';
import Floatingbubbles from './components/homepage/Floatingbubbles';
import { prisma } from '@/lib/prisma';
import { getPageMetadata } from '@/lib/metadata';
import { DEFAULT_HOMEPAGE_SECTIONS } from '@/lib/homepage-defaults';
import Link from 'next/link';
import { Phone, ArrowRight, Sparkles } from 'lucide-react';

export const revalidate = 60; // Instant response with background revalidation

export async function generateMetadata() {
  return getPageMetadata({
    slug: 'home',
    focusKeyword: 'carpet cleaning brisbane',
    defaultTitle: 'Brisbane Carpet & Pest Experts | Bond & Carpet Steam Cleaning Brisbane',
    defaultDescription:
      'Brisbane’s #1 trusted experts for professional carpet steam cleaning, bond cleaning, end of lease cleaning, and pest control in Brisbane, QLD. 100% Bond Back Guarantee.',
    keywords: [
      'carpet cleaning brisbane',
      'bond cleaning brisbane',
      'end of lease cleaning brisbane',
      'pest control brisbane',
      'carpet steam cleaning brisbane',
      'couch cleaning brisbane',
      'exit clean brisbane',
      'vacate cleaning brisbane',
    ],
    path: '/',
  });
}

export default async function Home() {
  let dbArticles: any[] = [];
  let homepageSections = DEFAULT_HOMEPAGE_SECTIONS;

  try {
    const [blogs, settingRecord] = await Promise.all([
      prisma.blog.findMany({
        where: { status: 'PUBLISHED' },
        include: { category: true },
        orderBy: { publishedAt: 'desc' },
        take: 3,
      }),
      prisma.siteSetting.findUnique({
        where: { key: 'homepage_sections' },
      }),
    ]);

    if (settingRecord && settingRecord.value) {
      try {
        const parsed = JSON.parse(settingRecord.value);
        homepageSections = { ...DEFAULT_HOMEPAGE_SECTIONS, ...parsed };
      } catch (e) {}
    }

    if (blogs && blogs.length > 0) {
      dbArticles = blogs.map((b) => ({
        image: b.featuredImg || '/images/article1.jpg',
        title: b.title,
        date: new Date(b.publishedAt || b.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        category: b.category?.name || 'Cleaning Tips',
        description: b.excerpt || (b.content ? b.content.slice(0, 120) + '...' : ''),
        link: `/blog/${b.slug}`,
      }));
    }
  } catch (err) {
    console.error('Error loading homepage dynamic data:', err);
  }

  const fallbackArticles = [
    {
      image: '/images/article1.jpg',
      title: 'Choosing the Right Carpet and Pest Cleaning Service in Brisbane',
      date: 'June 30, 2024',
      category: 'Cleaning Services Selection',
      description: 'Selecting reliable carpet and pest cleaning services in Brisbane is crucial for maintaining a clean, healthy environment...',
      link: '/blog/choosing-the-right-carpet-and-pest-cleaning-service-in-brisbane',
    },
    {
      image: '/images/article2.jpg',
      title: 'How Weather Conditions Affect Pest Activity in Brisbane',
      date: 'June 30, 2024',
      category: 'Weather and Pest Activity',
      description: 'Brisbane’s subtropical climate provides a diverse habitat for pests, influencing their behavior and seasonal activity patterns...',
      link: '/blog/how-weather-conditions-affect-pest-activity-in-brisbane',
    },
    {
      image: '/images/article3.jpg',
      title: 'Pet-Friendly Pest Control Solutions for Brisbane Homes',
      date: 'June 30, 2024',
      category: 'Pet-Friendly Pest Control',
      description: 'Pets are cherished members of our families, and their safety and well-being are paramount when dealing with pest control...',
      link: '/blog/pet-friendly-pest-control-solutions-for-brisbane-homes',
    },
  ];

  const articles = dbArticles.length > 0 ? dbArticles : fallbackArticles;
  const cta = homepageSections.whatCanWeClean || DEFAULT_HOMEPAGE_SECTIONS.whatCanWeClean;

  return (
    <div className="w-full min-h-screen bg-[#f9f7f3] text-[#1a1f2c] overflow-x-hidden">
      {/* 1. Hero & Top Slider */}
      <Hero />

      {/* 2. Value Propositions & Trust Section */}
      <HomeAbout />

      {/* 3. Interactive Pricing Estimator */}
      <EstimatePage />

      {/* 4. Residential, Commercial & Specialty Tab Showcase */}
      <MainCard />

      {/* 5. Contact CTA & Popular Service Details */}
      <Floatingbubbles />

      {/* 6. Verified Customer Testimonials */}
      <Testimonials />

      {/* 7. Recent Articles & Tips */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Insights & Guides
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Recent Articles & Cleaning Tips
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Expert advice from certified Brisbane cleaners and pest managers.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <SuperCard key={index} {...article} />
          ))}
        </div>
      </section>

      {/* 8. Responsive "What Can We Clean For You Today?" CTA Banner */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 md:p-14 text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4 sm:space-y-6">
              <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-bold uppercase tracking-wider border border-white/30">
                100% Satisfaction & Bond Back Guarantee
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                {cta.heading || "What Can We Clean For You Today?"}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
                {cta.subheading || "Book your clean now with Brisbane's trusted carpet steam and bond cleaning specialists."}
              </p>

              {/* Call & Booking Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={`tel:${cta.phoneTel || '0434061188'}`}
                  className="bg-white hover:bg-orange-50 text-orange-600 font-bold px-6 py-3.5 rounded-full shadow-lg transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <Phone className="w-5 h-5 text-orange-500" />
                  Call {cta.phone || "0434 061 188"}
                </a>

                <Link
                  href="/contact"
                  className="bg-black/20 hover:bg-black/30 border border-white/30 text-white font-bold px-6 py-3.5 rounded-full backdrop-blur-sm transition flex items-center gap-2 text-sm sm:text-base"
                >
                  Get A Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Visual / Badge */}
            <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center max-w-xs w-full">
                <div className="w-16 h-16 rounded-full bg-white text-orange-500 mx-auto flex items-center justify-center text-3xl shadow-md mb-3">
                  🛡️
                </div>
                <h4 className="font-bold text-lg text-white">REIQ Approved Checklist</h4>
                <p className="text-xs text-white/80 mt-1">
                  72-Hour Free Re-Clean Warranty on all End-of-Lease cleans.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
