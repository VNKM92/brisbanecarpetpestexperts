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

export default function TileandgroutPage() {
   const [showVideo, setShowVideo] = useState(false);
  const pathname = usePathname();

  return (
    <>
    {/* Banner Section */}
        <section
          className="min-h-screen relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/Choosing-the-Right-Carpet-and-Pest-Cleaning-Service-in-Brisbane-840x560.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Tile & Grout Cleaning Brisbane
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              High-pressure heated tile and grout cleaning across Brisbane. Remove embedded dirt, grime, and stubborn bathroom mold from ceramic, porcelain, and slate tiles.
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
            At Brisbane Carpet and Pest Control, we understand that maintaining the cleanliness and appearance of your tiles and grout is crucial for both aesthetic appeal and hygiene. Over time, tiles and grout lines can become stained, discolored, and grimy, making them look worn and aged. Our professional tile and grout cleaning services are designed to restore the shine and freshness of your surfaces, ensuring they look as good as new.<br /><br />

Tiles are a popular choice for flooring and wall surfaces due to their durability, versatility, and ease of maintenance. However, despite their resistance to dirt and stains, tiles are not completely immune to grime build-up. The grout lines between tiles are particularly susceptible to staining because they are more porous and can absorb spills and dirt. This is where our expertise comes into play. Our dedicated team at Brisbane Carpet and Pest Control utilizes advanced cleaning techniques and high-quality products to tackle the toughest stains and restore your tiles to their original brilliance.<br /><br />

Our tile and grout cleaning service begins with a thorough assessment of your surfaces to determine the best cleaning approach. We use state-of-the-art equipment, including powerful steam cleaners and specialized brushes, to penetrate deep into the grout lines and tile surfaces. Our cleaning solutions are specifically formulated to break down and lift dirt, grime, and stains, without causing any damage to your tiles or grout. We ensure that every corner and crevice is cleaned meticulously, leaving your surfaces spotless and revitalized.<br /><br />

We also understand that different types of tiles—be it ceramic, porcelain, natural stone, or others—require different care and cleaning methods. Our team is trained and experienced in handling various tile materials, ensuring that the cleaning process is tailored to meet the specific needs of your surfaces. Whether it’s removing mold and mildew from bathroom tiles or tackling heavy-duty grime in high-traffic areas, we are equipped to deliver outstanding results.<br /><br />

Beyond just cleaning, we also offer grout sealing services to protect your grout lines from future staining and discoloration. Our grout sealers provide a protective barrier that repels dirt and moisture, helping to extend the life of your grout and maintain its pristine appearance.<br /><br />

At Brisbane Carpet and Pest Control, we pride ourselves on delivering exceptional customer service and high-quality results. Our team is committed to ensuring your satisfaction with every job we undertake. We are transparent about our pricing, providing you with a clear understanding of the costs involved before we begin any work. Our goal is to offer a hassle-free experience, with minimal disruption to your daily routine.<br /><br />

Choose Brisbane Carpet and Pest Control for your tile and grout cleaning needs and experience the difference of professional care. Our expertise, advanced techniques, and dedication to excellence will leave your tiles and grout looking immaculate and revitalized. Contact us today to schedule an appointment and let us help you restore the beauty of your home.
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
                    src="/assets/home/image/Choosing-the-Right-Carpet-and-Pest-Cleaning-Service-in-Brisbane-840x560.jpg"
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
