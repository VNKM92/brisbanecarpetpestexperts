"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  SparklesIcon,
  BeakerIcon,
} from "@heroicons/react/24/outline";

export default function WhyUs() {
  const items = [
    {
      icon: <SparklesIcon className="w-14 h-14 text-emerald-500" />,
      title: "Health-conscious teams and social distancing",
      desc: "At Bond Cleaning Brisbane, we prioritize the health and safety of our customers and teams by maintaining strict social distancing protocols and ensuring our teams are in optimal health.",
    },
    {
      icon: <BeakerIcon className="w-14 h-14 text-emerald-500" />,
      title: "High-Quality Disinfectant",
      desc: "Using professional-grade disinfectants, we sanitize and disinfect your property thoroughly, targeting high-touch surfaces and areas prone to germ buildup.",
    },
    {
      icon: <ShieldCheckIcon className="w-14 h-14 text-emerald-500" />,
      title: "Sterilized And Disinfected Cleaning Equipment",
      desc: "Our cleaning tools are meticulously sterilized and disinfected before each use to prevent cross-contamination and ensure hygienic cleaning practices.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Why Us!
        </motion.h2>

        {/* Sub text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-gray-600 space-y-1 mb-10 leading-relaxed"
        >
          <p>Experienced Team: Our professional cleaners have extensive experience in bond cleaning.</p>
          <p>Eco-Friendly Products: We use environmentally friendly cleaning solutions.</p>
          <p>Satisfaction Guarantee: High standards to maximize your chances of getting your bond back.</p>
          <p>Flexible Scheduling: Convenient booking options to suit your timeline.</p>
        </motion.div>

        {/* Grid Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-md transition group"
            >
              {/* Icon */}
              {item.icon}

              {/* Title */}
              <h3 className="mt-4 text-lg md:text-xl font-semibold text-gray-800 group-hover:text-emerald-500 transition">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
