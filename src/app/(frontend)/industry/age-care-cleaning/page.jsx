"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FeatureCard from './components/FeatureCard';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
 
 
  


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
          style={{ backgroundImage: "url('/assets/home/image/brisbanecarpetpestexperts-img3-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
             Age Care Cleaning
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Ensure you get your bond deposit back with our expert bond cleaning services in Brisbane. Our comprehensive cleaning packages are tailored to meet the strict standards of landlords and property managers. With flexible scheduling and a satisfaction guarantee, we make the moving process stress-free and efficient. </p>
          </div>
        </section>
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
          
          {/* Sidebar */}
          <aside className="w-full md:w-1/4 bg-white shadow-sm">
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
                        ? 'bg-green-600 text-white font-semibold'
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
                Welcome to Brisbane Carpet and Pest Control, where we specialize in providing exceptional age care cleaning services tailored to meet the unique needs of elderly care facilities. Our mission is to deliver a level of cleanliness that not only meets but exceeds industry standards, ensuring a safe and hygienic environment for residents. Understanding the importance of a clean and well-maintained facility, we are committed to offering thorough and reliable cleaning solutions that contribute to the well-being of both residents and staff.
              </p>

              <p className="text-gray-700 leading-relaxed">
               The necessity for specialized cleaning in age care facilities stems from several factors. Elderly individuals often have compromised immune systems, making them more susceptible to infections and illnesses. This makes maintaining a high standard of cleanliness crucial. Our cleaning practices are tailored to address these unique requirements, ensuring that every area of the facility is thoroughly cleaned and sanitized. From resident rooms to common areas and bathrooms, our services are designed to tackle the challenges specific to age care settings.
              </p>

              <p className="text-gray-700 leading-relaxed">
               Adhering to industry standards and regulations is a fundamental aspect of our age care cleaning services. These standards are established to safeguard the health of residents and ensure a safe living environment. Our team is well-versed in the regulations governing age care facilities and implements cleaning protocols that comply with these guidelines. By staying updated with the latest standards, we ensure that our cleaning practices contribute to the overall safety and hygiene of the facility.
              </p>

              <p className="text-gray-700 leading-relaxed">
                At Brisbane Carpet and Pest Control, we offer a range of age care cleaning services tailored to meet the specific needs of each facility. Our services include daily cleaning routines, deep cleaning, sanitation, and infection control. We work closely with facility managers to customize our services based on the unique requirements of their facility. This approach ensures that every aspect of the facility is addressed, from routine maintenance to more specialized cleaning tasks.Our approach to age care cleaning is characterized by meticulous attention to detail and a commitment to excellence. We utilize state-of-the-art equipment and advanced cleaning techniques to achieve the highest standards of cleanliness. Our staff undergoes rigorous training to ensure they are equipped with the skills and knowledge needed to perform their duties effectively. We take pride in our thorough cleaning processes and our dedication to delivering exceptional service.
              </p>
              {/* Add rest of the content similarly */}
            </div>

            {/* Video / Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative mt-6 w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-md">
                  <Image
                    src="/assets/home/image/brisbanecarpetpestexperts-slider.jpg"
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
          </main>
        </div>

        <FeatureCard />
        {/* FAQ Section */}
    </>
  );
}
