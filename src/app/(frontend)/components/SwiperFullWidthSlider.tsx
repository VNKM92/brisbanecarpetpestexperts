'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface SwiperSlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  bgColor: string;
  accentColor: string;
}

const SwiperFullWidthSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides: SwiperSlideData[] = [
    {
      id: 1,
      title: 'Professional Cleaning Services',
      subtitle: 'Experience Excellence',
      description: 'Transform your space with our premium cleaning solutions',
      image: '/assets/home/image/slider1.jpg',
      bgColor: 'from-slate-900/70 to-gray-800/70',
      accentColor: '#3B82F6',
    },
    {
      id: 2,
      title: 'Bond Cleaning Specialists',
      subtitle: 'Guaranteed Results',
      description: 'Certified bond cleaning that meets all requirements',
      image: '/assets/home/image/slider1.jpg',
      bgColor: 'from-gray-900/70 to-slate-800/70',
      accentColor: '#10B981',
    },
    {
      id: 3,
      title: 'Deep Cleaning Excellence',
      subtitle: 'Comprehensive Care',
      description: 'Thorough cleaning for a healthier environment',
      image: '/assets/home/image/slider1.jpg',
      bgColor: 'from-slate-900/70 to-gray-900/70',
      accentColor: '#F59E0B',
    },
    {
      id: 4,
      title: 'Eco-Friendly Solutions',
      subtitle: 'Sustainable Practice',
      description: 'Environment-friendly products for your peace of mind',
      image: '/assets/home/image/slider1.jpg',
      bgColor: 'from-green-900/70 to-slate-900/70',
      accentColor: '#059669',
    },
  ];

  const currentSlide = slides[activeIndex];

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.15,
        duration: 0.8,
      },
    }),
  } as const;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => `
            <span class="${className} custom-bullet" style="width: ${
            index === activeIndex ? '48px' : '12px'
          }; background-color: white; border-radius: 9999px; transition: all 0.3s ease;"></span>
          `,
        }}
        navigation={{
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full group">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1 }}
              />
            </div>

            {/* Overlay Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} z-10 transition-all duration-1000`}
            />

            {/* Bottom Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-10" />

            {/* Content */}
            <div className="relative z-20 w-full h-full flex items-center justify-center">
              <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Text Content */}
                  <motion.div
                    className="text-white space-y-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                  >
                    {/* Badge */}
                    <motion.div
                      custom={0}
                      variants={textVariants}
                      className="inline-block"
                    >
                      <div
                        className="px-4 py-2 rounded-full bg-opacity-20 border border-opacity-50 backdrop-blur-sm inline-block"
                        style={{
                          backgroundColor: `${slide.accentColor}33`,
                          borderColor: `${slide.accentColor}80`,
                        }}
                      >
                        <p
                          className="text-sm lg:text-base font-semibold"
                          style={{ color: slide.accentColor }}
                        >
                          {slide.subtitle}
                        </p>
                      </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                      custom={1}
                      variants={textVariants}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      custom={2}
                      variants={textVariants}
                      className="text-lg sm:text-xl text-gray-200 max-w-md leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                      custom={3}
                      variants={textVariants}
                      className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                        style={{ backgroundColor: slide.accentColor }}
                      >
                        Get Started
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 border-2 border-white/50 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </motion.div>

                  {/* Decorative Right Section */}
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="hidden lg:flex justify-center"
                  >
                    <div className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                      <motion.div
                        animate={{
                          y: [0, -20, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(135deg, ${slide.accentColor}33, ${slide.accentColor}11)`,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="swiper-prev absolute z-30 left-8 lg:left-12 bottom-8 lg:bottom-1/2 lg:translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="swiper-next absolute z-30 left-24 lg:left-auto lg:right-12 bottom-8 lg:bottom-1/2 lg:translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </Swiper>

      {/* Custom Pagination Container */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          display: flex;
          gap: 12px;
        }

        .swiper-pagination-bullet {
          opacity: 1;
          background: rgba(255, 255, 255, 0.4);
          margin: 0;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: white;
          width: 48px !important;
        }

        .swiper-pagination-bullet:hover {
          background: rgba(255, 255, 255, 0.6);
        }

        .swiper-button-disabled {
          opacity: 0;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .swiper-pagination {
            bottom: 16px;
            gap: 8px;
          }

          .swiper-pagination-bullet-active {
            width: 32px !important;
          }
        }
      `}</style>

      {/* Slide Counter */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute z-30 top-8 right-8 text-white text-sm lg:text-base font-semibold"
      >
        <span className="text-2xl lg:text-3xl font-bold">
          {String(activeIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-white/50"> / {String(slides.length).padStart(2, '0')}</span>
      </motion.div>
    </div>
  );
};

export default SwiperFullWidthSlider;
