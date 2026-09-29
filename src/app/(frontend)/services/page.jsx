"use client";
import Hero from '../components/Hero';
import AnimatedCards from "../components/AnimatedCards";
import Testimonials from "../components/Testimonials";
import FeatureSection from '../components/FeatureSection';
import SuperCard from '../components/SuperCard';
import Carousel from '../components/Carousel';
import ServicesSlider from '../components/ServicesSlider';
import FullWidthSlider from '../components/FullWidthSlider';

// Note: SEO metadata is managed in parent layout
 
import HeroServ from "./components/HeroServ";

import '../components/slider.css';

import RoundCercalCard from '../components/RoundCercalCard';
// import Image from "next/image";
// export const metadata = {
//   title: "Brisbane | Home",
//   description: "Professional cleaning services for your home and office.",
// };


export default function ServicesPage() {


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
    <div className="min-h-screen flex flex-col bg-[#fffdf8]">
      <FullWidthSlider />
      <div className="w-full py-10 px-4">
        <HeroServ />
        <Hero />
        <ServicesSlider />
        <Carousel />
        <AnimatedCards />
        <Testimonials />
        <FeatureSection />
        <RoundCercalCard />
        
        
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Recent Articles - Tips, News & Updates</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <SuperCard key={index} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}



