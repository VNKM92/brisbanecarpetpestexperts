"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FeatureCard from './components/FeatureCard';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// Note: SEO metadata is managed in parent layout for client components

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

export default function AgecarecleaningPage() {
   const [showVideo, setShowVideo] = useState(false);
  const pathname = usePathname();

  return (
    <>
    {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-index-image2.png')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
           Carpet Cleaning
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Ensure you get your bond deposit back with our expert bond cleaning services in Brisbane. Our comprehensive cleaning packages are tailored to meet the strict standards of landlords and property managers. With flexible scheduling and a satisfaction guarantee, we make the moving process stress-free and efficient. </p>
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
           At Brisbane Carpet and Pest Control, we understand that clean carpets are not just about aesthetics; they play a crucial role in the health and comfort of your home. With years of experience and a commitment to excellence, our carpet cleaning services are designed to provide you with the highest standard of cleanliness and care. Our team of skilled professionals uses state-of-the-art equipment and eco-friendly products to ensure your carpets are not only spotless but also safe for you and your family.<br/><br/>

            Carpets can easily become a repository for dust, allergens, and stains, which can impact indoor air quality and overall health. Regular cleaning is essential to maintain a hygienic environment and extend the life of your carpets. Whether you’re dealing with stubborn stains, pet odors, or just routine maintenance, our expert technicians are equipped to handle it all. We take pride in our ability to deliver outstanding results that meet and exceed your expectations.<br/><br/>

            Our carpet cleaning process is thorough and meticulous, beginning with a detailed inspection to identify the best approach for your specific needs. We then use advanced cleaning methods, including hot water extraction and dry cleaning, to lift dirt and grime effectively. Our environmentally friendly solutions ensure that your carpets are cleaned without harsh chemicals, making them safe for children and pets.<br/><br/>

            We are dedicated to providing exceptional service and ensuring complete customer satisfaction. Our goal is to make your carpets look and feel as good as new, all while delivering a hassle-free experience. At Brisbane Carpet and Pest Control, we treat every carpet with the care and attention it deserves, ensuring a deep clean that revitalizes your space and enhances your living environment.<br/><br/>

            Choose Brisbane Carpet and Pest Control for your carpet cleaning needs and experience the difference that professional service can make. With our commitment to quality, reliability, and customer satisfaction, we are confident that you will be thrilled with the results. Let us help you maintain a cleaner, healthier home with our premier carpet cleaning services in Brisbane.
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
                    src="/assets/home/image/brisbanecarpetpestexperts-img2-1.jpg"
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
    </>
  );
}
