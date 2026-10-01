"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FeatureCard from './components/FeatureCard';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import ProcessSteps from "./components/ProcessSteps";
const industries = [
  { slug: 'age-care-cleaning', label: 'Age Care Cleaning' },
  { slug: 'carpet-cleaning', label: 'Carpet Cleaning' },
  { slug: 'hotel-cleaning-brisbane', label: 'Hotel Cleaning Brisbane' },
  { slug: 'industrial-cleaning', label: 'Industrial Cleaning' },
  { slug: 'lounge-cleaning', label: 'Lounge Cleaning' },
  { slug: 'mattress-cleaning', label: 'Mattress Cleaning' },
  { slug: 'office-cleaning', label: 'Office Cleaning' },
  { slug: 'tile-and-grout-cleaning', label: 'Tile And Grout Cleaning' },
  { slug: 'upholstery-cleaning', label: 'Upholstery Cleaning' },
];

export default function IndustryPage() {
   const [showVideo, setShowVideo] = useState(false);
  const pathname = usePathname();

  return (
    <>
    {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-img5-1-840x560.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Commercial & Industrial Cleaning Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Heavy-duty industrial and warehouse cleaning across Greater Brisbane. High-powered floor scrubbing, factory degreasing, and industrial facility maintenance.
            </p>
          </div>
        </section>
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-gray-200 shadow-sm">
        <nav className="p-4 space-y-2">
          {industries.map((item) => {
            const href = `/industry/${item.slug}`;
            const isActive = pathname === href || pathname?.startsWith(href + '/');
            return (
              <Link
                key={item.slug}
                href={href}
                className={
                  'block px-4 py-2 rounded transition ' +
                  (isActive
                    ? 'bg-green-500 text-white font-semibold'
                    : 'text-gray-700 hover:bg-green-100')
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Introduction
          </h1>
          <p className="text-gray-700 leading-relaxed">
           In the bustling world of industrial operations, maintaining a clean and hygienic environment is not just a matter of aesthetics but a crucial component of operational efficiency and safety. At Brisbane Carpet and Pest Control, we understand the unique challenges that industrial environments present. From manufacturing facilities and warehouses to factories and distribution centers, every industrial space has its specific cleaning needs, driven by the nature of the work conducted and the scale of operations.<br /><br />

Industrial cleaning is more than just a routine task; it involves meticulous attention to detail, specialized equipment, and expertise to handle the demanding conditions of large-scale environments. Our professional cleaning services are designed to address these challenges head-on, ensuring that your industrial facility remains pristine and operational.<br /><br />

Our approach to industrial cleaning encompasses a wide range of services tailored to meet the specific needs of your facility. We employ advanced cleaning technologies and techniques to effectively manage dust, dirt, and debris that accumulate in high-traffic areas. Our team of trained professionals is adept at handling everything from routine cleaning tasks to more intensive deep cleaning procedures.<br /><br />

Safety is paramount in any industrial setting, and our cleaning protocols are designed with this in mind. We adhere to strict safety standards to protect your workforce and maintain compliance with regulatory requirements. Our cleaning solutions are environmentally friendly, ensuring that we contribute to a healthier workplace while minimizing our impact on the environment.<br /><br />

At Brisbane Carpet and Pest Control, we are committed to delivering exceptional industrial cleaning services that enhance the functionality and longevity of your facility. Whether you need regular maintenance or a one-time deep clean, our team is equipped to handle the job with efficiency and professionalism. Let us help you create a cleaner, safer, and more productive industrial environment.
          </p>
          {/* Add rest of the content similarly */}

          {/* Video / Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mt-6 w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/image/brisbanecarpetpestexperts-img5-1-840x560.jpg"
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
        </div>
      </main>
    </div>
    <FeatureCard />
     <ProcessSteps />
    </>
  );
}
