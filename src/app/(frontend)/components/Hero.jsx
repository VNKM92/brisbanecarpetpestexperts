"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, PhoneCall, ArrowRight, CheckCircle2 } from "lucide-react";
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

          {/* Sofa Image Wrapper with Background "we clean" Watermark and Pointer System */}
          <div className="relative w-full max-w-5xl mx-auto flex justify-center items-center z-10 px-2 sm:px-4 mt-8 sm:mt-12">
            
            {/* Stable Fully-Responsive "we clean" Watermark (No jump on scroll) */}
            <div
              className="pointer-events-none absolute -top-8 sm:-top-14 md:-top-20 lg:-top-24 left-1/2 -translate-x-1/2 text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[12rem] font-black text-[#43934a]/12 uppercase tracking-tighter whitespace-nowrap z-0 select-none leading-none"
              aria-hidden="true"
            >
              we clean
            </div>

            <div className="relative w-full flex justify-center items-center z-10">
              <img
                src="https://qleen.bold-themes.com/demo-01/wp-content/uploads/sites/2/2025/07/hero_image_01.png"
                alt="Furniture Cleaning"
                className="w-full max-w-5xl h-auto object-contain drop-shadow-xl"
              />

              {/* Pointer System on the Sofa */}
              <div
                className="absolute z-20 pointer-events-none"
                style={{
                  bottom: "36%",
                  left: "50%",
                  transform: "translateX(-20%)",
                }}
              >
                <div className="relative flex items-center">
                  {/* Animated Start Circle */}
                  <span
                    className="relative w-3.5 h-3.5 sm:w-5 sm:h-5 bg-[#ff8a00] rounded-full pulse-circle shadow-md"
                    style={{
                      position: "absolute",
                      left: "3px",
                      bottom: "-22px",
                      transform: "rotate(-45deg)",
                    }}
                  />

                  {/* Angled Line */}
                  <span
                    className="bg-[#ff8a00]"
                    style={{
                      height: "2px",
                      width: "1.8em",
                      position: "absolute",
                      left: "1px",
                      bottom: "-0.6em",
                      transform: "rotate(-45deg)",
                      transformOrigin: "left bottom",
                    }}
                  />

                  {/* Straight Horizontal Line */}
                  <span className="ml-[1.4em] sm:ml-[2em] w-16 sm:w-28 lg:w-36 h-[2px] bg-[#ff8a00]" />

                  {/* End Circle */}
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#ff8a00] rounded-full -ml-1" />

                  {/* Cursive Label "Furniture Cleaning" */}
                  <span
                    className="absolute -top-6 sm:-top-7 left-[1.5em] sm:left-[2.2em] italic text-xs sm:text-base lg:text-lg font-bold text-gray-800 whitespace-nowrap bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md shadow-2xs"
                    style={{
                      fontFamily: "Caveat, 'Brush Script MT', cursive, sans-serif",
                    }}
                  >
                    Furniture Cleaning
                  </span>
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
