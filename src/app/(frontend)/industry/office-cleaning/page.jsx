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

export default function OfficecleanPage() {
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
          Office Cleaning
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
            Welcome to Brisbane Carpet and Pest Control, where we bring professional and meticulous office cleaning solutions to businesses across Brisbane. In today’s fast-paced corporate world, maintaining a clean and organized office environment is essential not just for the well-being of employees but also for creating a positive impression on clients and visitors. Our office cleaning services are designed to ensure that your workplace remains spotless, hygienic, and conducive to productivity.<br/><br/>

At Brisbane Carpet and Pest Control, we understand that every office has unique cleaning needs. Whether you run a small startup, a bustling corporate office, or a large industrial workspace, our team is equipped to handle a diverse range of cleaning challenges. Our services are tailored to address your specific requirements, ensuring that every corner of your office is thoroughly cleaned and maintained.<br/><br/>

Our commitment to excellence is reflected in our comprehensive cleaning approach. We use advanced cleaning technologies and eco-friendly products to ensure that your office space is not only clean but also safe for both employees and the environment. Our team of trained and experienced cleaners is dedicated to delivering high-quality results with a keen eye for detail. From dusting and vacuuming to sanitizing surfaces and emptying trash bins, no task is too small or too large for our skilled professionals.<br/><br/>

We recognize that a clean office contributes significantly to employee morale and productivity. A tidy and well-maintained workspace fosters a positive atmosphere, reduces the spread of germs, and enhances overall job satisfaction. By outsourcing your office cleaning to us, you can focus on your core business activities while we take care of maintaining a pristine work environment.<br/><br/>

Our office cleaning services are flexible and can be scheduled according to your convenience. Whether you need daily, weekly, or monthly cleaning, we offer customized plans to fit your schedule and budget. We are committed to providing reliable and efficient cleaning solutions that meet your specific needs and exceed your expectations.<br/><br/>

Customer satisfaction is at the heart of our business. We take pride in our transparent communication, timely service delivery, and the high standards of cleanliness we maintain. Our team is always ready to address any concerns or special requests you may have, ensuring that your office cleaning experience is smooth and hassle-free.<br/><br/>

Choosing Brisbane Carpet and Pest Control for your office cleaning needs means choosing a partner dedicated to delivering exceptional results. Our goal is to help you create a healthier, more organized, and aesthetically pleasing workspace that reflects the professionalism and success of your business. Let us handle the cleaning, so you can concentrate on what you do best. 
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
        </div>
      </main>
    </div>
    <FeatureCard />
    <processSteps />
    </>
  );
}
