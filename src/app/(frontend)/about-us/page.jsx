"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Clock, CheckCircle, Users, Target, Zap } from "lucide-react";
import FeatureCard from './components/FeatureCard';
import HomeAboutCard from './components/HomeAboutCard';
import ServicesSlider from '../components/ServicesSlider';
import FullWidthSlider from '../components/FullWidthSlider';

// Note: SEO metadata is managed in parent layout for client components
 
export default function AboutUs() {
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
        
        {/* <FullWidthSlider />  */}
        {/* <ServicesSlider />   */}

        

        {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/about/aboutus-slider.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              About Us
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
            </p>
          </div>
        </section>
        {/* <HomeAboutCard /> */}
        {/* <FeatureCard /> */}
         
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
            <motion.div className="lg:w-1/2 space-y-6" variants={itemVariants}>
              <h3 className="text-orange-500 italic font-semibold text-lg">About us</h3>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Honest. Simple. <span className="text-green-600">Brisbane.</span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed">
                With over a decade of experience, we've transformed thousands of homes and offices into sparkling clean spaces. Our commitment to excellence and customer satisfaction sets us apart.
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <motion.div variants={itemVariants}>
                  <p className="font-semibold text-lg flex items-center gap-2 text-green-600">
                    <CheckCircle size={24} /> Trust
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Trust is our paramount value. All of our employees go through work authorization check.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="font-semibold text-lg flex items-center gap-2 text-blue-600">
                    <Zap size={24} /> Quality
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Excellent performance, flat rates, no surprises. Five star rating on Google.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="font-semibold text-lg flex items-center gap-2 text-orange-500">
                    <Clock size={24} /> Care
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Average response time is less than 10 minutes. You can call, e-mail, text or message us.
                  </p>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <p className="font-semibold text-lg flex items-center gap-2 text-purple-600">
                    <Users size={24} /> People
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    We pay good wages, health benefits and retirement, and abide by the laws.
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Image Column */}
            <motion.div 
              className="lg:w-1/2 flex justify-center"
              variants={imageVariants}
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-green-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-8 hover:shadow-3xl transition-shadow duration-300">
                  <Image
                    src="/assets/about/aboutus-slider.jpg"
                    alt="Our Team"
                    width={400}
                    height={400}
                    className="rounded-2xl w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
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
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl p-12">
              <h3 className="text-orange-500 italic font-semibold text-lg">Get in touch</h3>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>
              
              <form className="space-y-6">
                <motion.div variants={itemVariants}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-300"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <textarea
                    placeholder="Enter your message..."
                    rows={4}
                    className="w-full border-2 border-gray-300 rounded-xl p-4 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/20 transition-all duration-300 resize-none"
                  />
                </motion.div>
                
                <motion.button 
                  variants={itemVariants}
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </motion.button>
              </form>
              
              <motion.p variants={itemVariants} className="text-gray-600 text-sm mt-8 text-center">
                All you have to do is click the Book Now button or send a message with your details (name, address, phone number, your home size, and any extras you require). We'll reply the same business day confirming the appointment and arrival time.
              </motion.p>
            </motion.div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section 
            className="px-6 md:px-16 pb-20 bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-12">
              <h3 className="text-orange-500 italic font-semibold text-lg">FAQ</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </motion.div>

            <div className="space-y-4 max-w-3xl">
              {[
                { 
                  q: 'What services don\'t you offer?',
                  a: 'We don\'t offer hazardous cleaning, heavy lifting, or outdoor construction cleanup. However, we handle most standard residential and commercial cleaning needs.'
                },
                { 
                  q: 'How far in advance should I book?',
                  a: 'You can book as early as you like, or even same-day service depending on availability. We recommend booking at least 48 hours in advance for best scheduling.'
                },
                { 
                  q: 'Are your products eco-friendly?',
                  a: 'We offer both standard and eco-friendly cleaning options. Just let us know your preference when booking, and we\'ll use sustainable products.'
                },
                { 
                  q: 'What if I\'m not satisfied with the service?',
                  a: 'We stand behind our work with a 100% satisfaction guarantee. If you\'re not happy, we\'ll come back and make it right at no additional cost.'
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <button
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className="font-semibold text-lg text-gray-900">{faq.q}</span>
                    <span className="text-green-600 text-2xl font-bold">+</span>
                  </button>
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </main>

      </div>
    </>
  );
}
