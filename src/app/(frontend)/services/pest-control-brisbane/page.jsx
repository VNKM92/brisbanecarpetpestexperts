"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import WhyUs from "./components/WhyUs";
import ServicesSidebar from "./components/ServicesSidebar";

// Note: SEO metadata is managed in parent layout for client components

const TAB_DATA = {
  residential: {
    title: "Residential",
    icon: "🏠",
    description: "Our residential pest control covers homes, apartments, and family properties. We use eco-friendly methods to eliminate cockroaches, ants, spiders, termites, and rodents.",
    features: [
      "Safe for children and pets",
      "Eco-friendly treatments",
      "Regular inspection schedules",
      "Preventative solutions"
    ],
    price: "From $150"
  },
  commercial: {
    title: "Commercial",
    icon: "🏢",
    description: "Professional pest control for businesses, restaurants, offices, and retail spaces. We ensure compliance with health regulations and maintain pest-free environments.",
    features: [
      "Compliance guaranteed",
      "Minimal disruption",
      "Regular monitoring",
      "Customized treatment plans"
    ],
    price: "From $300"
  },
  outdoor: {
    title: "Outdoor",
    icon: "🏡",
    description: "Our outdoor pest control covers patios, balconies, gardens, and exterior areas. We provide pressure washing, debris removal, and comprehensive outdoor pest management.",
    features: [
      "Garden pest control",
      "Pressure washing",
      "Debris removal",
      "Landscape protection"
    ],
    price: "From $200"
  }
};

export default function EndofleasePage() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("outdoor");

  return (
    <>
        {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
             Pest Control Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Protect your home or business with our effective pest control services in Brisbane. We offer tailored solutions to address a wide range of pest infestations, ensuring a pest-free environment year-round. Trust our experienced team for reliable service and lasting results.</p>
          </div>
        </section>
        <div className="w-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* SIDEBAR */}
            <div className="space-y-6">

              {/* Services */}
               <ServicesSidebar />
               

              {/* Homeowners */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="bg-emerald-400 rounded-xl p-6 text-white shadow-md"
              >
                <h3 className="text-xl font-bold">
                  Safe and nurturing surroundings for your loved ones
                </h3>

                <p className="mt-2 text-sm opacity-90">
                  We ensure top-notch cleaning quality backed by established processes and safety.
                </p>

                <button className="mt-4 bg-white text-emerald-500 px-4 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
                  Explore Our Offers →
                </button>

                <p className="mt-4 text-sm">📞 0434061188</p>
              </motion.div>

              {/* Brochure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-lg p-6 shadow-md"
              >
                <h2 className="text-lg font-semibold mb-4">Download Brochure</h2>

                <button className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-emerald-400 hover:text-white transition mb-2">
                  Company Report 2025
                </button>

                <button className="w-full px-4 py-2 bg-gray-100 rounded hover:bg-emerald-400 hover:text-white transition">
                  Company Brochure
                </button>
              </motion.div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:col-span-3 space-y-10">

              {/* Overview */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="mt-4 text-gray-700 leading-relaxed">
                 Pest control in Brisbane is essential for maintaining a safe and hygienic environment in homes and businesses. As a subtropical city, Brisbane is susceptible to a variety of pests, including cockroaches, ants, spiders, termites, and rodents, which can pose health risks and damage property.
                 <br className="hidden sm:inline" />

                  Professional pest control services aim to eradicate these pests through safe and effective methods, tailored to the specific needs of each client. Our team of experienced technicians conducts thorough inspections to identify pest infestations and assess the extent of the problem. Using eco-friendly and pet-safe treatments, we ensure minimal disruption to your daily life or business operations while achieving maximum results.
                   <br className="hidden sm:inline" />

                  We offer both residential and commercial pest control solutions, customizable to address the unique challenges of each environment. With a focus on prevention as well as elimination, our services are designed to provide long-term protection against pests. Whether you're dealing with an immediate infestation or seeking proactive pest management, our comprehensive services are here to safeguard your property and peace of mind.
                  
                </p>
              </motion.div>

              {/* Outdoor Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-orange-300 p-6 rounded-xl"
              >
                <div className="bg-white p-10 rounded-xl shadow-md">

                  {/* Tab Buttons */}
                  <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    {Object.entries(TAB_DATA).map(([key, data]) => (
                      <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                          activeTab === key
                            ? "bg-emerald-500 text-white shadow-lg scale-105"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {data.icon} {data.title}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-center"
                    >
                      <h3 className="text-3xl font-bold mb-4 text-emerald-500">
                        {TAB_DATA[activeTab].title}
                      </h3>

                      <p className="text-gray-700 max-w-xl mx-auto mb-6">
                        {TAB_DATA[activeTab].description}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-left max-w-lg mx-auto">
                        {TAB_DATA[activeTab].features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <span className="text-emerald-500 text-xl">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price and Button */}
                      <div className="space-y-4">
                        <p className="text-xl font-bold text-emerald-500">
                          {TAB_DATA[activeTab].price}
                        </p>
                        <button className="bg-emerald-400 text-white px-6 py-2 rounded hover:bg-emerald-500 transition font-semibold">
                          Purchase Now →
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold">Stats & Charts</h2>
                <p className="text-gray-700 mt-2 max-w-2xl">
                  Over 95% of our clients get their full bond back due to our meticulous cleaning.</p>
                  <p className="text-gray-700 mt-2 max-w-2xl"> 
                  We pride ourselves on delivering exceptional results, and our customer satisfaction statistics reflect this. Over 95% of our clients have received their full bond deposit back, thanks to our meticulous cleaning standards. Below are some charts showing our performance metrics and customer feedback ratings.</p>
                  <p className="text-gray-700 mt-2 max-w-2xl"> 
                  Customer satisfaction is a critical metric for any service-oriented business. High satisfaction rates indicate that customers are happy with the service they received and are likely to recommend it to others. Our customer satisfaction rates have consistently been high, demonstrating our commitment to quality and reliability.
                </p>

                <div className="mt-6 flex justify-center">
                  <div className="w-72 h-72 bg-gray-50 rounded-full flex items-center justify-center">

                    <Image
                    src="/assets/home/image/chart.png"
                    alt="Cleaning Team"
                    width={250}
                    height={250}
                    className="object-cover"
                  />
                    <p className="text-gray-500 text-sm">l</p>
                  </div>
                </div>
              </motion.div>

              {/* How It Works */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl font-bold">How It Works?</h2>

                <ul className="mt-4 space-y-3 text-gray-700">
                  <li><b>Booking:</b> Schedule your cleaning online or via phone.</li>
                  <li><b>Inspection:</b> We inspect your property and note requirements.</li>
                  <li><b>Cleaning:</b> Full checklist-driven cleaning.</li>
                  <li><b>Review:</b> Final inspection before handover.</li>
                  <li><b>Completion:</b> Ready for landlord/agent check.</li>
                </ul>
              </motion.div>

              {/* Video / Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg"
                    alt="Cleaning Team"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    {/* <button className="bg-white text-emerald-500 px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition">
                      ▶ Play Video
                    </button> */}
                    <button
                      onClick={() => setShowVideo(true)}
                      className="bg-white text-emerald-500 px-5 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                    >
                      ▶ Play Video
                    </button>

                    {/* ================= VIDEO POPUP MODAL ================= */}
                    <AnimatePresence>
                      {showVideo && (
                        <motion.div
                          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[999]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {/* Modal Content */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="bg-black rounded-xl shadow-lg overflow-hidden w-[90%] max-w-3xl"
                          >
                            {/* Close Button */}
                            <button
                              onClick={() => setShowVideo(false)}
                              className="absolute top-4 right-4 text-white text-2xl font-bold hover:text-emerald-300"
                            >
                              ✕
                            </button>

                            {/* Embedded YouTube Video */}
                            <div className="w-full h-[250px] sm:h-[400px] md:h-[500px]">
                              <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/uQm-0Ex18nM?autoplay=1"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </motion.div>
                      <WhyUs />
            </div>
          </div>
        </div>
    </>
  );
}
