"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

const FullWidthSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      id: 1,
      image: "/assets/about/aboutus-slider.jpg",
      title: "Professional Cleaning Services",
      subtitle: "Expert care for your space",
      description: "Transform your environment with our premium cleaning solutions"
    },
    {
      id: 2,
      image: "/images/article2.jpg",
      title: "Commercial & Residential",
      subtitle: "Tailored to your needs",
      description: "Comprehensive cleaning services for homes and businesses"
    },
    {
      id: 3,
      image: "/images/article3.jpg",
      title: "Eco-Friendly Solutions",
      subtitle: "Safe for your family & planet",
      description: "Using sustainable products and methods for a greener clean"
    }
  ];

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh] overflow-hidden bg-green-800">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out transform ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Image Layer */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="100vw"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
            </div>

            {/* Content Layer */}
            <div className="relative h-full flex flex-col justify-end pb-16 sm:pb-24 px-6 sm:px-8 md:px-12 lg:px-16">
              <div className="max-w-7xl mx-auto w-full">
                <h3 className="text-sm sm:text-base md:text-lg text-blue-400 font-medium mb-2 opacity-0 animate-fadeInUp" style={{animationDelay: '0.2s'}}>
                  {slide.subtitle}
                </h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 opacity-0 animate-fadeInUp" style={{animationDelay: '0.4s'}}>
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl opacity-0 animate-fadeInUp" style={{animationDelay: '0.6s'}}>
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
        disabled={isAnimating}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
        disabled={isAnimating}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => !isAnimating && setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentSlide === index 
                ? 'w-6 bg-white' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    </div>
  );
};

export default FullWidthSlider;