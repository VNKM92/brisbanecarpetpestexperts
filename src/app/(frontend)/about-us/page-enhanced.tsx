'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle2, Award, Users, Target } from 'lucide-react';

export default function AboutUsPage() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
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
    hidden: { opacity: 0, scale: 0 },
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.6
      }
    })
  };

  // Stats data
  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users, color: 'from-blue-600 to-cyan-600' },
    { number: '10+', label: 'Years Experience', icon: Award, color: 'from-green-600 to-emerald-600' },
    { number: '2000+', label: 'Projects Completed', icon: Target, color: 'from-purple-600 to-pink-600' },
  ];

  // Features
  const features = [
    { title: 'Professional Team', description: 'Certified and trained professionals' },
    { title: 'Quality Assurance', description: 'High standards on every project' },
    { title: 'Eco-Friendly', description: 'Safe and sustainable solutions' },
    { title: '24/7 Support', description: 'Always available for you' },
  ];

  return (
    <div className="w-full bg-black text-white">
      {/* Hero Section with Two Columns */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            {/* Left Column - Image */}
            <motion.div
              variants={imageVariants}
              className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10" />
              <img
                src="/assets/about/team.jpg"
                alt="Professional Cleaning Team"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: false }}
                className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg"
              >
                <p className="text-sm font-semibold text-gray-900">Est. 2014</p>
                <p className="text-xs text-gray-600">Trusted Excellence</p>
              </motion.div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              {/* Header */}
              <motion.div variants={itemVariants}>
                <span className="inline-block px-4 py-2 rounded-full bg-blue-600/20 border border-blue-500/50 text-blue-400 text-sm font-semibold mb-4">
                  About Our Company
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Professional Cleaning Excellence
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We are dedicated to providing top-quality cleaning services for both residential and commercial properties. Our commitment to excellence and customer satisfaction has made us the trusted choice for thousands of happy clients.
                </p>
              </motion.div>

              {/* Features List */}
              <motion.div
                variants={containerVariants}
                className="space-y-4"
              >
                {features.slice(0, 2).map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white hover:shadow-lg transition-all duration-300"
              >
                Learn More →
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-4"
            >
              Our Track Record
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Proven excellence in delivering exceptional cleaning services
            </motion.p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={statsVariants}
                  whileHover={{ y: -10 }}
                  className="group p-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className={`inline-block p-4 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <p className="text-gray-300">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Two Column Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-4"
            >
              Why Choose Us
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              Comprehensive cleaning solutions with dedication to excellence
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 10 }}
                className="group p-8 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/40 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section - Two Column */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-slate-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {/* Left - Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  Our Expert Team
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Our team consists of trained professionals who are passionate about delivering exceptional results. We invest in continuous training to stay updated with the latest cleaning techniques and technologies.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                className="space-y-4"
              >
                {['Certified Professionals', 'Trained & Experienced', 'Customer-Focused'].map(
                  (item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex gap-3 items-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-600/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-lg text-gray-300">{item}</span>
                    </motion.div>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              variants={imageVariants}
              className="relative h-96 lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 z-10" />
              <img
                src="/assets/about/office.jpg"
                alt="Our Office"
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold mb-6"
          >
            Ready to Experience Excellence?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          >
            Contact us today for a free consultation and discover why we're the trusted choice for professional cleaning services.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-all duration-300"
            >
              Get Free Quote
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-400 hover:bg-blue-600/10 rounded-lg font-semibold transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
