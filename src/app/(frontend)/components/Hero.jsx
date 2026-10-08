"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, PhoneCall, ArrowRight, CheckCircle2, ShieldCheck, Flame } from "lucide-react";
import HeadServicesSlider from "../components/HeadServicesSlider";

export default function Hero() {
  return (
    <div className="bg-[#f9f7f3] antialiased w-full overflow-hidden">
      {/* Hero Section */}
      <main className="pt-28 pb-8 sm:pt-36 sm:pb-12 md:pt-40 md:pb-16 flex flex-col items-center relative overflow-hidden">
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Intro Section (After Navbar) */}
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs sm:text-sm font-semibold mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Brisbane’s Premier Steam Cleaning & Pest Specialists</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0e2a1b] tracking-tight leading-tight">
              Spotless Homes, Fresh Carpets & Guaranteed Bond Return
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Professional steam carpet cleaning, deep furniture revitalization, and certified pest control across Greater Brisbane. Eco-friendly, pet-safe, and 100% satisfaction guaranteed.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/request-estimate"
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-orange-500/25 transition-all duration-300 flex items-center gap-2"
              >
                Get Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:0434061188"
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold text-sm sm:text-base shadow-sm transition-all duration-300 flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" /> 0434 061 188
              </a>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 font-medium mt-6">
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gray-200/70 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> 100% Bond Back Guarantee
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gray-200/70 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> IICRC Certified Cleaners
              </span>
              <span className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-full border border-gray-200/70 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Same Day Emergency Service
              </span>
            </div>
          </div>

          {/* Sofa Image Wrapper with Background "we clean" Watermark and Responsive Pointer System */}
          <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center z-10 px-2 sm:px-4 mt-6 sm:mt-10">
            
            {/* Stable Fully-Responsive "we clean" Watermark */}
            <div
              className="pointer-events-none absolute -top-8 sm:-top-14 md:-top-20 lg:-top-24 left-1/2 -translate-x-1/2 text-[15vw] sm:text-[13vw] md:text-[11vw] lg:text-[11.5rem] font-black text-[#43934a]/12 uppercase tracking-tighter whitespace-nowrap z-0 select-none leading-none"
              aria-hidden="true"
            >
              we clean
            </div>

            {/* Sofa Image Container with Responsive Pointer Overlay */}
            <div className="relative w-full max-w-4xl flex justify-center items-center z-10 select-none">
              <img
                src="https://qleen.bold-themes.com/demo-01/wp-content/uploads/sites/2/2025/07/hero_image_01.png"
                alt="Professional Sofa and Furniture Steam Cleaning Brisbane"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />

              {/* =========================================================================
                  POINTER SYSTEM 1: Main "Furniture Cleaning" Callout (Left Cushion)
                  Responsive vector-drawn leader line + glowing hotspot radar pin
                  ========================================================================= */}
              <div 
                className="absolute top-[33%] sm:top-[35%] md:top-[37%] left-[28%] sm:left-[32%] md:left-[35%] z-20 pointer-events-auto group"
                title="Professional Furniture & Upholstery Deep Cleaning"
              >
                <div className="relative flex items-center">
                  {/* Glowing Radar Pulse Dot */}
                  <span className="relative flex h-3.5 w-3.5 sm:h-5 sm:w-5 items-center justify-center shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-yellow-400 border-2 border-white shadow-lg shadow-orange-950/40"></span>
                  </span>

                  {/* High-Precision SVG Leader Line (Angled + Horizontal) */}
                  <svg
                    className="w-20 ml-[-13px] sm:w-32 md:w-40 h-10 sm:h-14 md:h-16 -ml-1 -mt-7 sm:-mt-10 md:-mt-12 overflow-visible pointer-events-none"
                    viewBox="0 0 160 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 6 54 L 45 14 L 154 14"
                      stroke="#ff7a00"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                    <circle cx="154" cy="14" r="3.5" fill="#ff7a00" />
                  </svg>

                  {/* Cursive Label Pill Badge */}
                  <div className="absolute -top-9 sm:-top-13 md:-top-15 left-10 sm:left-14 md:left-18 flex flex-col items-start">
                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-xl shadow-lg border border-orange-200/90 flex items-center gap-1 sm:gap-1.5 hover:scale-105 transition-transform duration-200 ring-1 ring-black/5">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-orange-500 shrink-0" />
                      <span className="font-caveat font-bold text-xs sm:text-base md:text-lg text-gray-900 whitespace-nowrap leading-tight">
                        Furniture Cleaning
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* =========================================================================
                  POINTER SYSTEM 2: "Deep Steam & Stain Removal" (Right Cushion - Tablet/Desktop)
                  ========================================================================= */}
              <div 
                className="hidden sm:block absolute top-[44%] md:top-[46%] right-[20%] md:right-[24%] z-20 pointer-events-auto group"
                title="Deep Steam Extraction & Odor Elimination"
              >
                <div className="relative flex items-center flex-row-reverse">
                  {/* Glowing Radar Pulse Dot */}
                  <span className="relative flex ml-[-15px] h-4 w-4 sm:h-5 sm:w-5 items-center justify-center shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
                    <span className="relative inline-flex rounded-full  h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 bg-gradient-to-tr from-emerald-600 via-teal-500 to-emerald-300 border-2 border-white shadow-lg shadow-emerald-950/40"></span>
                  </span>

                  {/* SVG Leader Line Going Up-Left */}
                  <svg
                    className="w-24 sm:w-32 md:w-36 h-10 sm:h-12 -mr-1 -mt-7 sm:-mt-9 overflow-visible pointer-events-none"
                    viewBox="0 0 140 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 134 44 L 95 12 L 6 12"
                      stroke="#10b981"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-sm"
                    />
                    <circle cx="6" cy="12" r="3.5" fill="#10b981" />
                  </svg>

                  {/* Cursive Label Pill Badge */}
                  <div className="absolute -top-9 sm:-top-11 right-10 sm:right-14 flex flex-col items-end">
                    <div className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-xl shadow-lg border border-emerald-200/90 flex items-center gap-1 sm:gap-1.5 hover:scale-105 transition-transform duration-200 ring-1 ring-black/5">
                      <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                      <span className="font-caveat font-bold text-xs sm:text-sm md:text-base text-gray-900 whitespace-nowrap leading-tight">
                        Deep Steam & Stain Removal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </section>
      </main>

      {/* Services Slider Section */}
      <HeadServicesSlider />
    </div>
  );
}
