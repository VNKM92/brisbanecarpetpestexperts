"use client";
import Hero from './components/Hero';
import AnimatedCards from "./components/AnimatedCards";
import Testimonials from "./components/Testimonials";
import FeatureSection from './components/FeatureSection';
import SuperCard from './components/SuperCard';
import Carousel from './components/Carousel';
import HomeAbout from './components/HomeAbout';
import EstimatePage from './components/EstimatePage';
import FeatureCard from './components/homepage/FeatureCard';
import MainCard from './components/homepage/MainCard';
import Floatingbubbles from './components/homepage/Floatingbubbles';


export default function Home() {


  const articles = [
    {
      image: '/images/article1.jpg',
      title: 'Choosing the Right Carpet and Pest Cleaning Service in Brisbane',
      date: 'June 30, 2024',
      category: 'Cleaning Services Selection',
      description: 'Selecting reliable carpet and pest cleaning services in Brisbane is crucial for maintaining a clean, healthy environment...',
      link: '#',
    },
    {
      image: '/images/article2.jpg',
      title: 'How Weather Conditions Affect Pest Activity in Brisbane',
      date: 'June 30, 2024',
      category: 'Weather and Pest Activity',
      description: 'Brisbane’s subtropical climate provides a diverse habitat for pests, influencing their behavior and seasonal activity patterns...',
      link: '#',
    },
    {
      image: '/images/article3.jpg',
      title: 'Pet-Friendly Pest Control Solutions for Brisbane Homes',
      date: 'June 30, 2024',
      category: 'Pet-Friendly Pest Control',
      description: 'Pets are cherished members of our families, and their safety and well-being are paramount when dealing with pest control...',
      link: '#',
    },
  ];

  return (
      <>
       {/* dark:bg-gray-100 */}
    <div  className="min-h-screen flex flex-col items-center justify-center bg-[#f9f7f3]  py-10 px-4">
       <Hero /> 
       <HomeAbout />
       <EstimatePage />
       <MainCard />
       <Floatingbubbles />
       {/* <FeatureCard /> */}
       {/* <Carousel /> */}
       {/* <AnimatedCards /> */}
       <Testimonials />
       {/* <FeatureSection /> */}

        <div className="flex justify-center px-6 fade-in">
           
        </div>
      
      <div className="mt-15 container mx-auto p-6">
        <h1 className=" text-3xl font-bold text-center text-green-700 mb-6">Recent Articles - Tips, News & Updates</h1>
        <div className="mt-15 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <SuperCard key={index} {...article} />
          ))}
        </div>
      </div>

      {/* data set what can we clan */}

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

            {/* <!-- Call Button --> */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-pulseRing"></div>
                <button className="relative w-14 h-14 bg-white text-orange-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition">
                  📞
                </button>
              </div>

              <p className="text-lg font-semibold">
                Call us: <span className="font-bold">(844) 242-9464</span>
              </p>
            </div>
          </div>
          {/* <!-- Image Wrapper --> */}
          <div className="absolute right-0 bottom-0 md:top-0 md:bottom-auto w-full md:w-1/2 flex justify-center md:justify-end pointer-events-none">
            <img
              src="/assets/home/we-are.png"
              alt="Cleaner"
              className="max-h-[420px] md:max-h-[520px] object-contain translate-y-6 md:translate-y-0 transition-all duration-700"
            />
          </div>

              {/* <!-- Award Badge --> */}
          <div className="absolute top-6 right-6 z-20">
            <img
              src="/assets/home/100-Satisfaction.png"
              alt="Award"
              className="w-20 md:w-24 drop-shadow-lg"
            />
          </div>
        </div>
      </section>
       
    </div>
    </>
  );
}



