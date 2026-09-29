"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { easeInOut } from "framer-motion";
import { fadeUp, floatFast, floatSlow } from "./motionVariants";
import ServiceCard from "./ServiceCard";

export default function Floatingbubbles() {
  return (
    <>
    {/* <section className="relative h-[320px] md:h-[400px] rounded-b-[60px] overflow-hidden"> */}
      {/* <!-- HERO --> */}
    {/* <section className="relative bg-orange-500 h-[320px] md:h-[380px] rounded-b-[60px] overflow-hidden" > */}

     <section className="w-full mt-15 flex items-center relative bg-orange-500 overflow-hidden bg-[url('/assets/home/hero-bg.jpg')] bg-cover bg-center bg-no-repeat h-[320px] md:h-[380px] rounded-b-[19px] overflow-hidden  rounded-[50px] px-6 md:px-16 py-16 shadow-lg" >
 
        
        {/* <!-- Floating bubbles --> */}
        <div className="absolute w-24 h-24 bg-white/30 rounded-full left-10 top-20 animate-float"></div>
        <div className="absolute w-32 h-32 bg-white/20 rounded-full right-20 top-10 animate-floatSlow"></div>

        {/* <!-- Content --> */}
        <div className="max-w-7xl mx-auto h-full flex items-center justify-center px-4">
          <div className="text-center text-white animate-fadeUp">
            <p className="text-xl italic font-cursive opacity-90">Contact us</p>
            <h1 className="text-2xl md:text-4xl font-semibold mt-2">
              Book online, by phone, or <br className="hidden md:block" />
              through social media.
            </h1>

            {/* <!-- Social icons --> */}
            <div className="flex justify-center gap-4 mt-6">
              <span className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition">f</span>
              <span className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition">◎</span>
              <span className="w-9 h-9 flex items-center justify-center bg-white/20 rounded-full cursor-pointer hover:bg-white/30 transition">✕</span>

              <button className="ml-4 bg-white text-orange-500 px-4 py-2 rounded-full font-medium hover:scale-105 transition">
                Book Online →
              </button>
            </div>
          </div>
        </div>
      </section>
 
    <ServiceCard />
    </>
  );
}
