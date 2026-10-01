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

export default function LoungeclPage() {
   const [showVideo, setShowVideo] = useState(false);
  const pathname = usePathname();

  return (
    <>
    {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-img1-1-840x560.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Lounge Cleaning Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Professional lounge, recliner, and leather sofa cleaning in Brisbane. Deep steam extraction and fabric conditioning for a fresh, hygienic home.
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
           A clean lounge is the heart of a welcoming home. It’s the space where families gather, friends converse, and memories are made. In Brisbane, where the climate can bring a unique set of challenges to home cleanliness, ensuring that your lounge remains spotless is essential for both aesthetics and hygiene. At Brisbane Carpet and Pest Control, we understand the significance of a fresh and inviting lounge. Our specialized lounge cleaning services are designed to tackle the specific needs of your living space, providing a thorough clean that not only rejuvenates the appearance but also extends the life of your furnishings.<br/><br/>

Our team of skilled professionals utilizes advanced cleaning techniques and eco-friendly products to deliver exceptional results. We start with a meticulous inspection to identify any stains, dirt, or allergens that may be lurking within your lounge. With a focus on detail and a commitment to excellence, we employ state-of-the-art equipment to remove even the most stubborn of contaminants. From vacuuming and steam cleaning to spot treatments, every step of our process is tailored to ensure that your lounge is not only visually appealing but also healthier and more comfortable.<br/><br/>

Understanding the unique requirements of lounge areas, our approach goes beyond surface cleaning. We address deep-seated dirt and allergens, ensuring that every corner of your lounge is treated with care. Our services are designed to enhance the longevity of your upholstery and carpets, protecting your investment and ensuring that your lounge remains a safe and pleasant environment for everyone.<br/><br/>

At Brisbane Carpet and Pest Control, we pride ourselves on delivering top-notch service that exceeds expectations. Our commitment to customer satisfaction means that we tailor our cleaning solutions to meet your specific needs, providing personalized service that guarantees a lounge you can be proud of. Whether you have delicate fabrics that require gentle care or high-traffic areas that need a robust cleaning solution, our team is equipped to handle it all.<br/><br/>

Experience the difference that professional lounge cleaning can make. With Brisbane Carpet and Pest Control, you can enjoy a cleaner, healthier, and more comfortable lounge, allowing you to relax and entertain with confidence. Contact us today to schedule your lounge cleaning service and transform your living space into a pristine haven of comfort.<br/><br/>
            
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
                    src="/assets/home/image/brisbanecarpetpestexperts-img1-1-840x560.jpg"
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
