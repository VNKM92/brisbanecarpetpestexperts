"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Clock, CheckCircle, Users, Target, Zap } from "lucide-react";
// import FeatureCard from './components/FeatureCard';
// import HomeAboutCard from './components/HomeAboutCard';
import LocationDirectory from "./components/LocationDirectory";



export default function LocationPage() {
  const [faqOpen, setFaqOpen] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6
      }
    })
  };

  const suburbs = [
    "Albion",
    "Alderley",
    "Annerley",
    "Ascot",
    "Ashgrove",
    "Auchenflower",
    "Balmoral",
    "Bardon",
    "Belmont",
    "Bowen Hills",
    // Add unlimited more…
  ];


  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 ">
        {/* py-10 px-4 */}
       
        

        {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/image/location.jpeg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
              Location
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Before your first house cleaning service, we'll take the time to talk about your preferences and priorities with you and combine them with cleaning techniques to give your home the greatest possible clean from our personal housekeepers.
            </p>
          </div>
        </section>

        {/* newcmp */}

         <main className="p-6">
           
          <LocationDirectory suburbs={suburbs} />
        </main>
 

      </div>
    </>
  );
}
