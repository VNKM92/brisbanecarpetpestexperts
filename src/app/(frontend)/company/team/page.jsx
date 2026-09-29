"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Clock, CheckCircle, Users, Target, Zap } from "lucide-react";
import TeamCard from "./components/TeamCard";


export default function TeamPage() {
  const [faqOpen, setFaqOpen] = useState(false);


  //data
   const team = [
    {
      name: "Mangan Sana",
      role: "Managing Director",
      img: "/assets/home/team/member1.jpg", 
    },
    {
      name: "Richard Muldoone",
      role: "Legal Officer",
      img: "/assets/home/team/member2.jpg",
    },
    {
      name: "Maria Andaloro",
      role: "HR Officer",
      img: "/assets/home/team/member3.jpg",
    },
    {
      name: "Richard Muldoone",
      role: "Legal Officer",
      img: "/assets/home/team/member2.jpg",
    },
    {
      name: "Maria Andaloro",
      role: "HR Officer",
      img: "/assets/home/team/member3.jpg",
    },
    {
      name: "Jack Mudson",
      role: "Manager",
      img: "/assets/home/team/member4.jpg",
    },
  ];
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

   

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 ">
        {/* py-10 px-4 */}
        {/* <SectionA /> */}
        {/* <SectionB /> */}
        {/* <FullWidthSlider />  */}
        {/* <ServicesSlider />   */}

        

        {/* Banner Section */}
        <section
          className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] 
                    bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/home/team/images/brisbanecarpetpestexperts-slider-image2-1.jpg')" }}
         >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-900/50"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">
             Our Team
            </h1>
            <p className="text-white text-base md:text-lg max-w-2xl">
              Our team comprises highly trained and experienced specialists in carpet cleaning and pest control. Each member is equipped with the latest knowledge and tools to tackle a wide range of challenges, ensuring that your home receives the best care possible.</p>
          </div>
        </section>

        {/* <desing new page  /> */}
        <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-10">Our Team</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {team.map((member, idx) => (
                <TeamCard
                  key={idx}
                  name={member.name}
                  role={member.role}
                  img={member.img}
                />
              ))}
            </div>
          </div>
        </div>
        
         
      </div>
    </>
  );
}
