'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FullWidthAnimatedSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Professional Cleaning Services',
      subtitle: 'Experience the Difference with Expert Care',
      description: 'Transform your space with our premium cleaning solutions',
      image: '/assets/home/image/slider1.jpg',
      bgColor: 'from-slate-900/70 to-gray-800/70',
      accent: 'blue',
    },
    {
      id: 2,
      title: 'Bond Cleaning Specialists',
      subtitle: 'Get Your Deposit Back Guaranteed',
      description: 'Certified bond cleaning that meets all requirements',
      image: '/assets/home/image/slider2.jpg',
      bgColor: 'from-gray-900/70 to-slate-800/70',
      accent: 'emerald',
    },
    {
      id: 3,
      title: 'Deep Cleaning Excellence',
      subtitle: 'Every Corner, Every Surface',
      description: 'Thorough cleaning for a healthier environment',
      image: '/assets/home/image/slider3.jpg',
      bgColor: 'from-slate-900/70 to-gray-900/70',
      accent: 'amber',
    },
    {
      id: 4,
      title: 'Eco-Friendly Approach',
      subtitle: 'Clean Safe & Sustainable',
      description: 'Environment-friendly products for your peace of mind',
      image: '/assets/home/image/slider4.jpg',
      bgColor: 'from-green-900/70 to-slate-900/70',
      accent: 'green',
    },
  ];

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: {
      y: 50,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    enter: {
      x: -100,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        type: 'spring',
        stiffness: 100,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    enter: {
      scale: 1.1,
      opacity: 0,
    },
    center: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      scale: 0.95,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, currentSlide]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentSlide((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gray Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${slide.bgColor} z-10 transition-all duration-1000`}
      />

      {/* Additional Overlay for Better Text Visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-white space-y-4 lg:space-y-6"
              >
                {/* Subtitle */}
                <motion.div
                  variants={titleVariants}
                  className={`inline-block px-4 py-2 rounded-full bg-${slide.accent}-500/20 border border-${slide.accent}-500/50 backdrop-blur-sm`}
                >
                  <p className={`text-sm lg:text-base font-semibold text-${slide.accent}-300`}>
                    {slide.subtitle}
                  </p>
                </motion.div>

                {/* Title */}
                <motion.h1
                  variants={titleVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  variants={{
                    ...titleVariants,
                    center: {
                      ...titleVariants.center,
                      transition: {
                        ...titleVariants.center.transition,
                        delay: 0.4,
                      },
                    },
                  }}
                  className="text-lg sm:text-xl text-gray-200 max-w-md leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  variants={{
                    ...titleVariants,
                    center: {
                      ...titleVariants.center,
                      transition: {
                        ...titleVariants.center.transition,
                        delay: 0.5,
                      },
                    },
                  }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <button
                    className={`px-8 py-3 bg-${slide.accent}-500 hover:bg-${slide.accent}-600 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95`}
                  >
                    Get Started
                  </button>
                  <button className="px-8 py-3 border-2 border-white/50 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                    Learn More
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Decorative Element */}
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
                  className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/10"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute z-30 bottom-8 lg:bottom-1/2 lg:translate-y-1/2 left-8 lg:left-12 right-8 lg:right-auto flex lg:flex-col gap-4">
        <button
          onClick={() => paginate(-1)}
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/50 group"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => paginate(1)}
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/50 group"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoplay(false)}
            onMouseLeave={() => setIsAutoplay(true)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? `w-12 h-3 bg-white`
                : `w-3 h-3 bg-white/40 hover:bg-white/60`
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute z-30 top-8 right-8 text-white text-sm lg:text-base font-semibold">
        <span className="text-2xl lg:text-3xl font-bold">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <span className="text-white/50"> / {String(slides.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default FullWidthAnimatedSlider;
