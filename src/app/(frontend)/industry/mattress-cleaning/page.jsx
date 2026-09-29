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

export default function MattressPage() {
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
           Mattress Cleaning

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
           Welcome to our Mattress Cleaning services page, where we focus on providing the highest quality care for one of the most essential items in your home – your mattress. At Brisbane Carpet and Pest Control, we understand that a clean mattress is crucial not only for maintaining a healthy living environment but also for ensuring a good night’s sleep. Mattresses accumulate a variety of contaminants over time, including dust mites, allergens, and bacteria, all of which can impact your health and comfort. Our specialized mattress cleaning services are designed to tackle these issues effectively, using advanced techniques and state-of-the-art equipment to ensure that your mattress is not only clean but also free of harmful particles that could affect your well-being.<br/><br/>

            Our expert team is trained in the latest mattress cleaning methods, which include steam cleaning, deep extraction, and allergen removal. We recognize that every mattress is unique, and our cleaning solutions are tailored to address the specific needs of different types of mattresses, from memory foam to traditional spring models. We use eco-friendly cleaning products that are safe for both you and your family, ensuring that your mattress is treated with the utmost care while also being effectively cleaned. Our commitment to high standards means that we don't just clean the surface but delve deep to remove ingrained dirt and debris that can contribute to a variety of health issues.<br/><br/>

            In addition to improving the hygiene of your mattress, our cleaning services also aim to enhance the longevity of your mattress, protecting your investment and ensuring that it remains in optimal condition for years to come. Regular mattress cleaning can help prevent the buildup of unpleasant odors, reduce the risk of bed bugs, and maintain the overall freshness and cleanliness of your bedding. At Brisbane Carpet and Pest Control, we are dedicated to delivering exceptional results that not only meet but exceed your expectations. Our goal is to provide you with a cleaner, healthier mattress that contributes to a better quality of sleep and a more comfortable living environment.<br/><br/>

            We pride ourselves on our attention to detail and customer satisfaction. From the moment you contact us, our friendly and professional staff will work with you to understand your specific needs and schedule a cleaning service that fits your convenience. Our technicians are not only skilled in mattress cleaning but are also committed to providing excellent customer service, ensuring that you have a positive experience from start to finish. We use the latest technology and techniques to ensure that your mattress is thoroughly cleaned and refreshed, leaving you with peace of mind and a cleaner, healthier place to rest.<br/><br/>

            Whether you’re dealing with stains, odors, or simply want to maintain the cleanliness of your mattress, Brisbane Carpet and Pest Control is here to help. Our mattress cleaning services are designed to provide you with a thorough, effective, and eco-friendly solution that aligns with our commitment to quality and customer care. We understand the importance of a good night’s sleep and are dedicated to ensuring that your mattress contributes to your overall health and comfort.<br/><br/>

            Choose Brisbane Carpet and Pest Control for all your mattress cleaning needs and experience the difference that professional, high-quality care can make. Our team is here to ensure that your mattress is not only clean but also treated with the utmost care and attention, providing you with a restful, hygienic, and comfortable sleeping environment. Contact us today to learn more about our mattress cleaning services and to schedule your appointment. Let us help you maintain a cleaner, healthier home with our expert mattress cleaning solutions.<br/><br/>

          
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
