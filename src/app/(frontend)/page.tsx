import Hero from './components/Hero';
import Testimonials from "./components/Testimonials";
import SuperCard from './components/SuperCard';
import HomeAbout from './components/HomeAbout';
import EstimatePage from './components/EstimatePage';
import MainCard from './components/homepage/MainCard';
import Floatingbubbles from './components/homepage/Floatingbubbles';
import { prisma } from '@/lib/prisma';
import { getPageMetadata } from '@/lib/metadata';

export const revalidate = 60; // Instant response with background revalidation

export async function generateMetadata() {
  return getPageMetadata({
    slug: 'home',
    defaultTitle: 'Brisbane Carpet & Pest Experts - Professional Cleaning Services Brisbane',
    defaultDescription: 'Brisbane\'s top-rated bond cleaning, pest control, and carpet cleaning experts. 100% bond back guarantee, experienced cleaners, satisfaction guaranteed.',
    path: '/',
  });
}

export default async function Home() {
  let dbArticles: any[] = [];

  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });

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
    console.error('Error loading homepage articles:', err);
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7f3] py-10 px-4">
      <Hero />
      <HomeAbout />
      <EstimatePage />
      <MainCard />
      <Floatingbubbles />
      <Testimonials />

      <div className="mt-15 container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Recent Articles - Tips, News & Updates
        </h2>
        <div className="mt-15 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <SuperCard key={index} {...article} />
          ))}
        </div>
      </div>

      {/* What Can We Clean Section */}
      <section className="mt-30 w-full max-w-7xl mx-auto px-4">
        <div className="relative bg-[#ff7f00] rounded-[40px] overflow-hidden min-h-[420px] md:min-h-[500px] flex items-center">
          <div className="relative z-10 p-8 md:p-16 max-w-xl text-white animate-slideFade">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              What Can We Clean<br />
              For You Today?
            </h1>

            <p className="text-lg mb-10">
              Book Your Clean Now
            </p>

            {/* Call Button */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-pulseRing"></div>
                <a
                  href="tel:0434061188"
                  className="relative w-14 h-14 bg-white text-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                  aria-label="Call Us"
                >
                  📞
                </a>
              </div>

              <p className="text-lg font-semibold">
                Call us: <a href="tel:0434061188" className="font-bold hover:underline">0434 061 188</a>
              </p>
            </div>
          </div>

          {/* Image Wrapper */}
          <div className="absolute right-0 bottom-0 md:top-0 md:bottom-auto w-full md:w-1/2 flex justify-center md:justify-end pointer-events-none">
            <img
              src="/assets/home/we-are.png"
              alt="Professional Brisbane Cleaner"
              className="max-h-[420px] md:max-h-[520px] object-contain translate-y-6 md:translate-y-0 transition-all duration-700"
            />
          </div>

          {/* Award Badge */}
          <div className="absolute top-6 right-6 z-20">
            <img
              src="/assets/home/100-Satisfaction.png"
              alt="100% Satisfaction Guarantee"
              className="w-20 md:w-24 drop-shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
