'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const services = [
  {
    title: 'Sofa Steam\nCleaning Louth',
    price: 'Read More',
    image: '/images/sofa-clean.jpg', // replace with your image
  },
  {
    title: 'Home\nCleaning',
    price: 'Read More',
    image: '/images/home-clean.jpg',
  },
  {
    title: 'Office\nCleaning',
    price: 'Read More',
    image: '/images/office-clean.jpg',
  },
  {
    title: 'qqOffice\nCleaning',
    price: 'Read More',
    image: '/images/sofa-clean.jpg',
  },
];

export default function HeadServicesSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const next = (prev + 1) % services.length;
          if (sliderRef.current) {
            sliderRef.current.scrollTo({
              left: next * (window.innerWidth < 768 ? 320 : 440), // Responsive slide width
              behavior: 'smooth',
            });
          }
          return next;
        });
      }, 4000); // Change slide every 4 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovered]);

  const slide = (dir: number) => {
    if (!sliderRef.current) return;
    const newSlide = (currentSlide + dir + services.length) % services.length;
    setCurrentSlide(newSlide);
    const slideWidth = window.innerWidth < 768 ? 320 : 440; // Responsive slide width
    sliderRef.current.scrollTo({
      left: newSlide * slideWidth,
      behavior: 'smooth',
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slideWidth = window.innerWidth < 768 ? 320 : 440;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      slide(1);
    } else if (isRightSwipe) {
      slide(-1);
    }
  };

  return (
    <section className="bg-[#FFF9F2] py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 overflow-x-hidden">
        <div
          className="relative bg-white rounded-[40px] p-6 md:p-10 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >

          {/* Slider */}
          <div
            ref={sliderRef}
            className="slider-container flex gap-4 md:gap-8 overflow-x-hidden scroll-smooth scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="slider-item min-w-[300px] md:min-w-[420px] flex items-center gap-4 md:gap-6 flex-shrink-0"
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden flex-shrink-0">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-semibold leading-tight whitespace-pre-line">
                    {service.title}
                  </h3>
                  <button className="mt-3 md:mt-4 px-4 md:px-6 py-2 border border-green-600 text-green-600 rounded-full font-medium text-sm md:text-base hover:bg-green-600 hover:text-white transition-colors">
                    {service.price}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows - Desktop */}
          <button
            onClick={() => slide(-1)}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full items-center justify-center text-2xl hover:bg-green-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            onClick={() => slide(1)}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg w-12 h-12 rounded-full items-center justify-center text-2xl hover:bg-green-50 transition-colors z-10"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Mobile Navigation arrows */}
          <button
            onClick={() => slide(-1)}
            className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full items-center justify-center text-xl hover:bg-green-50 transition-colors z-10"
            aria-label="Previous slide"
          >
            ‹
          </button>

          <button
            onClick={() => slide(1)}
            className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full items-center justify-center text-xl hover:bg-green-50 transition-colors z-10"
            aria-label="Next slide"
          >
            ›
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-green-600 scale-125'
                    : 'bg-gray-300 hover:bg-green-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm shadow-lg w-10 h-10 rounded-full items-center justify-center text-lg hover:bg-white transition-colors z-10"
            aria-label={isAutoPlaying ? 'Pause auto-play' : 'Start auto-play'}
          >
            {isAutoPlaying ? ' ' : ' '}
          </button>

        </div>
      </div>
    </section>
  );
}
