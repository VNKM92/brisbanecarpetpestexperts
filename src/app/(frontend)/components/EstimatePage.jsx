"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function EstimatePage() {
  const [cleaningType, setCleaningType] = useState("Home Cleaning");
  const [complexity, setComplexity] = useState("Deep cleaning");
  const [footage, setFootage] = useState(40);
  const [includesSupplies, setIncludesSupplies] = useState(false);
  const [totalPrice, setTotalPrice] = useState(740);

  // Calculate price whenever any state changes
  useEffect(() => {
    let basePrice = 700;
    let footageCharge = footage;
    let suppliesCharge = includesSupplies ? 40 : 0;

    // Adjust base price based on complexity
    const complexityMultiplier = {
      "Deep cleaning": 1.2,
      "Standard cleaning": 1.0,
      "Premium cleaning": 1.5,
    };

    const multiplier = complexityMultiplier[complexity] || 1.0;
    const adjustedBase = basePrice * multiplier;

    // Adjust footage charge based on cleaning type
    const footageMultiplier = {
      "Home Cleaning": 1.0,
      "Office Cleaning": 0.8,
      "Move-in / Move-out Cleaning": 1.3,
    };

    const footageMultiplierValue = footageMultiplier[cleaningType] || 1.0;
    const adjustedFootage = footageCharge * footageMultiplierValue;

    const finalPrice = adjustedBase + adjustedFootage + suppliesCharge;
    setTotalPrice(Math.round(finalPrice * 100) / 100);
  }, [footage, complexity, cleaningType, includesSupplies]);

  return (
    <div className="bg-white text-[#111] font-sans w-full antialiased">
      {/* 1. Get a Quick Estimate Section */}
      <section className="bg-white max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 rounded-3xl shadow-lg border border-gray-100 my-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          
          {/* LEFT SECTION: Calculator Controls */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Get a Quick Estimate</h2>
            <p className="text-gray-500 text-sm mb-8">*For a detailed quote, use extended version</p>

            {/* Type of Cleaning */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                TYPE OF CLEANING
              </label>
              <select
                value={cleaningType}
                onChange={(e) => setCleaningType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 shadow-xs focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
              >
                <option>Home Cleaning</option>
                <option>Office Cleaning</option>
                <option>Move-in / Move-out Cleaning</option>
              </select>
            </div>

            {/* Complexity */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                COMPLEXITY
              </label>
              <select
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 shadow-xs focus:ring-2 focus:ring-orange-400 outline-none text-sm sm:text-base"
              >
                <option>Deep cleaning</option>
                <option>Standard cleaning</option>
                <option>Premium cleaning</option>
              </select>
            </div>

            {/* Square Footage Range Slider */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                SQUARE FOOTAGE
              </label>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={footage}
                  onChange={(e) => setFootage(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-gray-200 rounded-lg"
                />
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-xs shrink-0">
                  {footage}
                </span>
              </div>
            </div>

            {/* Cleaning Supplies Toggle */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                CLEANING SUPPLIES
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={includesSupplies}
                  onChange={(e) => setIncludesSupplies(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 rounded-full peer peer-checked:bg-orange-500 transition-colors"></div>
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-7 transition-transform"></div>
              </label>
            </div>

            {/* Total Price Pill */}
            <div className="flex justify-between items-center bg-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-md">
              <span>TOTAL</span>
              <span>$ {totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* RIGHT SECTION: Image + Trust Badge */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-lg">
              <img
                src="/assets/home/image/reliable-cleaning-experts.png"
                alt="Reliable Cleaning Experts"
                className="w-full h-auto object-cover rounded-3xl"
              />
              
              {/* Floating Trust Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-3 border border-gray-100">
                <div className="flex -space-x-2">
                  <img
                    src="/testimonial/user1.jpg"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    alt="Client 1"
                  />
                  <img
                    src="/testimonial/user2.jpg"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    alt="Client 2"
                  />
                  <img
                    src="/testimonial/user3.jpg"
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    alt="Client 3"
                  />
                </div>
                <p className="text-gray-800 font-bold text-xs sm:text-sm leading-tight">
                  Trusted by <br />
                  <span className="text-orange-500">200+ clients</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Quick & Easy Booking Process (Book in 60 Sec) */}
      <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          
          {/* Label */}
          <p className="text-orange-500 font-semibold mb-2 text-sm sm:text-base">
            Book in 60 seconds
          </p>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16 sm:mb-20">
            Quick & Easy Booking Process
          </h2>

          {/* Steps 1, 2, 3 Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
            
            {/* Arrow 1 (Desktop) */}
            <img
              src="/assets/home/arrow1.png"
              alt=""
              className="hidden md:block absolute left-[28%] top-8 w-24 lg:w-28 opacity-80 pointer-events-none"
            />

            {/* Arrow 2 (Desktop) */}
            <img
              src="/assets/home/arrow2.png"
              alt=""
              className="hidden md:block absolute right-[28%] top-8 w-24 lg:w-28 opacity-80 pointer-events-none"
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4]/60 flex items-center justify-center mb-6 shadow-md">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                  <path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Book Consultations</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Tell us what type of cleaning service you need, the size of your home or space and preferred date and time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4]/60 flex items-center justify-center mb-6 shadow-md">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Package</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                We’ll provide a price and time estimate for the cleaning as well as available time slots that match your schedule.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4]/60 flex items-center justify-center mb-6 shadow-md">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3l1.5 3L17 7l-2.5 2.5L15 13l-3-1.5L9 13l.5-3.5L7 7l3.5-1L12 3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">We Clean, You Relax</h3>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Our professional team will arrive on time with all supplies and perform a detailed cleaning as estimate agreed.
              </p>
            </div>

          </div>

          {/* CTA Button */}
          <div className="mt-14 sm:mt-16">
            <Link
              href="/request-estimate"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:shadow-orange-500/25 transition-all duration-300 text-base"
            >
              Get Started
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
