"use client";

import Image from "next/image";
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
    <>
      {/* Home About Section */}
      <main className="bg-white text-[#111] font-sans w-full">
        <section className="bg-white max-w-7xl mx-auto px-6 py-12 lg:py-20 mt-[-115px] rounded-3xl shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* LEFT SECTION */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Get a Quick Estimate</h1>
              <p className="text-gray-500 mb-10">*For a detailed quote, use extended version</p>

              {/* Type of Cleaning */}
              <div className="mb-6">
                <label className="font-semibold text-gray-700">TYPE OF CLEANING</label>
                <select
                  value={cleaningType}
                  onChange={(e) => setCleaningType(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-orange-400"
                >
                  <option>Home Cleaning</option>
                  <option>Office Cleaning</option>
                  <option>Move-in / Move-out Cleaning</option>
                </select>
              </div>

              {/* Complexity */}
              <div className="mb-6">
                <label className="font-semibold text-gray-700">COMPLEXITY</label>
                <select
                  value={complexity}
                  onChange={(e) => setComplexity(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-orange-400"
                >
                  <option>Deep cleaning</option>
                  <option>Standard cleaning</option>
                  <option>Premium cleaning</option>
                </select>
              </div>

              {/* Slider */}
              <div className="mb-6">
                <label className="font-semibold text-gray-700">SQUARE FOOTAGE</label>
                <div className="flex items-center gap-3 mt-3">
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={footage}
                    onChange={(e) => setFootage(parseInt(e.target.value))}
                    className="w-full accent-orange-500 cursor-pointer"
                  />
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                    {footage}
                  </span>
                </div>
              </div>

              {/* Cleaning Supplies Toggle */}
              <div className="mb-10">
                <label className="font-semibold text-gray-700 block mb-2">CLEANING SUPPLIES</label>
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

              {/* Total Price */}
              <div className="flex justify-between items-center bg-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-md">
                <span>TOTAL</span>
                <span>$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="relative">
              <Image 
                src="/assets/home/image/reliable-cleaning-experts.png" 
                width={500}
                height={400}
                className="w-full rounded-3xl shadow-lg object-cover" 
                alt="Cleaning Image" 
              />
              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl shadow flex items-center gap-3">
                <div className="flex -space-x-3">
                  <Image 
                    src="/testimonial/user1.jpg" 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Avatar 1" 
                  />
                  <Image 
                    src="/testimonial/user2.jpg" 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Avatar 2" 
                  />
                  <Image 
                    src="/testimonial/user3.jpg" 
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full border-2 border-white" 
                    alt="Avatar 3" 
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm">Trusted by <br />200+ clients</p>
              </div>
            </div>
          </div>
        </section>


        {/* book in 60 Sec */}
        <section className="bg-white py-24 px-4 mt-[35px] overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">

            {/* <!-- Label --> */}
            <p className="text-orange-500 font-semibold mb-3 animate-fade-up">
              Book in 60 seconds
            </p>

            {/* <!-- Heading --> */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-24 animate-fade-up delay-100">
              Quick & Easy Booking Process
            </h2>

            {/* <!-- Steps --> */}
            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">

              {/* <!-- Arrow 1 --> */}
              <img
                src="/assets/home/arrow1.png"
                alt=""
                className="hidden md:block absolute left-[32%] top-14 w-28 animate-draw"
              />

              {/* <!-- Arrow 2 (same image, rotated) --> */}
              <img
                src="/assets/home/arrow2.png"
                alt=""
                className="hidden md:block absolute right-[32%] top-50 w-28 rotate-0 animate-draw"
              />

              {/* <!-- Step 1 --> */}
              <div className="flex flex-col items-center animate-fade-up delay-200">
                <div className="w-24 h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4] flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                    <path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Book Consultations</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm pl-33px">
                  Tell us what type of cleaning service you need, the size of your home or space and preferred date and time.
                </p>
              </div>


              {/* <!-- Step 2 --> */}
              <div className="flex flex-col items-center animate-fade-up delay-300">
                <div className="w-24 h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4] flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Choose Package</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm pl-33px">
                  We’ll provide a price and time estimate for the cleaning as well as available time slots that match your schedule.
                </p>
              </div>

              {/* <!-- Step 3 --> */}
              <div className="flex flex-col items-center animate-fade-up delay-400">
                <div className="w-24 h-24 rounded-full bg-[#43934a] ring-8 ring-[#a1c9a4] flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor"  viewBox="0 0 24 24">
                    <path d="M12 3l1.5 3L17 7l-2.5 2.5L15 13l-3-1.5L9 13l.5-3.5L7 7l3.5-1L12 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">We Clean, You Relax</h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                  Our professional team will arrive on time with all supplies and perform a detailed cleaning as estimate agreed.
                </p>
              </div>

            </div>

            {/* <!-- CTA --> */}
            <div className="mt-24 animate-fade-up delay-500">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-12 py-4 rounded-full shadow-lg transition">
                Get Started
              </button>
            </div>

          </div>
        </section>
       {/* next book in 60 sec */}
      </main>
    </>
  );
}
