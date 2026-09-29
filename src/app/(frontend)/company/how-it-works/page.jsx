"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Clock, CheckCircle, Users, Target, Zap } from "lucide-react";
import FeatureCard from './components/FeatureCard';
import HomeAboutCard from './components/HomeAboutCard';
import ProcessSection from "./components/ProcessSection";
import ServiceTabs from "./components/ServiceTabs";

import ServicesSlider from './components/ServicesSlider';
// import FullWidthSlider from '../components/FullWidthSlider';

// import SectionA from "./components/SectionA";
// import SectionB from "./components/SectionB";

export default function HoweworkPage() {
  const [faqOpen, setFaqOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6
      }
    })
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 ">
        {/* py-10 px-4 */}
        {/* <SectionA /> */}
        {/* <SectionB /> */}
        {/* <FullWidthSlider />  */}
        {/* <ServicesSlider />   */}

        

        {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbane-carpet-and-pest-image1-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              How It Works
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
            </p>
          </div>
        </section>
        <ProcessSection />
        <ServiceTabs />
        <FeatureCard />
        {/* <HomeAboutCard /> */}
         
        <main className="bg-[#f9f7f2] text-[#111] font-sans w-full">

          {/* Enhanced About Section with Two Columns */}
          <motion.section 
            className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-16 py-20 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Content Column */}
          </motion.section>

          {/* Stats Section */}
          <motion.section 
            className="px-6 md:px-16 py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: Award, value: '96%', label: 'Satisfaction Rate', details: 'Based on 356 Google reviews' },
                { icon: Users, value: '5K+', label: 'Happy Customers', details: 'Trusted by families and businesses' },
                { icon: Target, value: '10K+', label: 'Projects Completed', details: 'Consistent excellence delivered' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div 
                    key={index}
                    custom={index}
                    variants={statsVariants}
                    className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-blue-50 transition-colors duration-300"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gradient-to-r from-orange-400 to-green-400 rounded-full">
                        <Icon className="text-white" size={32} />
                      </div>
                    </div>
                    <h3 className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                    <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
                    <p className="text-sm text-gray-600">{stat.details}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Step by Step Section */}
          <motion.section 
            className="bg-gradient-to-br from-gray-50 to-gray-100 px-6 md:px-16 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-16">
              <h3 className="text-orange-500 italic font-semibold text-lg">Step by step</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">How Our Process Works</h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: '📅', 
                  title: 'Booking Made Easy',
                  description: 'Schedule your cleaning online, by phone, or via text. Choose the date, time, and service type that fits your needs.' 
                },
                { 
                  icon: '🧹', 
                  title: 'Expert Service',
                  description: 'Our professional team arrives on time and completes the cleaning according to our high standards and your specific requirements.' 
                },
                { 
                  icon: '⭐', 
                  title: 'Personalized Service',
                  description: 'We confirm your booking and tailor the service to your home and preferences.' 
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{step.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-green-400 text-white font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            className="px-6 md:px-16 py-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl shadow-2xl p-12 text-center"
            >
              <h3 className="text-orange-300 italic font-semibold text-lg mb-2">Ready to experience clean?</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Book Your Clean Today</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers. Our team is ready to transform your space into a spotless sanctuary.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Book Now
                </button>
                <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition-all duration-300">
                  Learn More
                </button>
              </div>
            </motion.div>
          </motion.section>

          {/* Contact Form Section */}
          <motion.section 
            className="px-6 md:px-16 py-20 bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            
          </motion.section>
 
        </main>

      </div>
    </>
  );
}
