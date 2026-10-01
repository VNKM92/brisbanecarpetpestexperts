"use client";

import Image from "next/image";

export default function HomeAbout() {
  return (
    <div className="bg-[#f9f7f3] antialiased w-full">
      <section className="bg-[#f9f7f3] py-12 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-orange-500 font-semibold mb-2 text-sm sm:text-base">About us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Honest. Simple. Clean.
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Your satisfaction is our priority.
          </p>
        </div>

        {/* 12 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT : 4 Feature Cards (6 Columns) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Feature 1: Trust */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold shadow-xs">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1.5">Trust</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Trust is our paramount value. All of our employees go through work authorization and police checks.
                </p>
              </div>
            </div>

            {/* Feature 2: Quality */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold shadow-xs">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1.5">Quality</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Excellent performance, flat rates, no surprises. Five star rating on Google.
                </p>
              </div>
            </div>

            {/* Feature 3: Care */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold shadow-xs">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1.5">Care</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Average response time is less than 10 minutes. You can call, e-mail, text or message us.
                </p>
              </div>
            </div>

            {/* Feature 4: People */}
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full bg-green-700 text-green-100 text-sm font-bold shadow-xs">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1.5">People</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We pay good wages, health benefits and retirement, and abide strictly by Australian industry standards.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT : Satisfaction Card (6 Columns) */}
          <div className="lg:col-span-6 relative bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col justify-center min-h-[260px] sm:min-h-[300px] overflow-hidden">
            <div className="relative z-10 max-w-xs sm:max-w-sm">
              <h2 className="text-5xl sm:text-6xl font-bold text-green-600 mb-2">
                96%
              </h2>
              <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                Satisfaction Rate*
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                *Based on 356+ verified reviews on Google
              </p>
            </div>

            {/* Image on bottom-right */}
            <img
              src="/assets/home/image/home-about.png"
              alt="Satisfaction Guarantee"
              className="absolute right-0 bottom-0 w-32 sm:w-44 md:w-52 object-contain pointer-events-none opacity-90 sm:opacity-100"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
