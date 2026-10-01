"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Shield, Clock, Sparkles } from "lucide-react";

export default function ServiceCard() {
  return (
    <section className="w-full bg-[#f9f7f3] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            Guaranteed Standards
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Why Choose Brisbane Carpet & Pest Experts
          </h2>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-gray-700 font-medium">
            <span className="flex items-center gap-1.5 bg-emerald-50/70 px-3 py-1.5 rounded-full text-emerald-900 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 font-bold" /> Background-checked Cleaners
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50/70 px-3 py-1.5 rounded-full text-emerald-900 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 font-bold" /> $10M Public Liability Insurance
            </span>
            <span className="flex items-center gap-1.5 bg-emerald-50/70 px-3 py-1.5 rounded-full text-emerald-900 border border-emerald-100">
              <Check className="w-4 h-4 text-emerald-600 font-bold" /> 100% Fixed Rates & No Surprise Fees
            </span>
          </div>
        </div>

        {/* Highlight Card */}
        <div className="mt-10 bg-gradient-to-r from-[#faf8f4] to-[#f4f7f4] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 border border-gray-200/60">
          
          {/* IMAGE */}
          <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-white">
            <Image
              src="/images/sofa-clean.jpg"
              alt="Upholstery & Sofa Steam Cleaning Brisbane"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              ✨ Deep Steam Extraction
            </div>
          </div>

          {/* CONTENT */}
          <div className="w-full md:w-1/2">
            <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">
              Popular Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-3">
              A Sparkling Clean & Healthy Home
            </h3>

            <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
              Our advanced hot-water steam extraction removes deep-seated dust mites, allergen buildup, tough food stains, and pet odours from carpets and couches.
            </p>

            <ul className="space-y-2.5 text-gray-700 text-sm font-medium mb-6">
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                Deep carpet & upholstery hot water steam wash
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                Eco-friendly sanitisation & deodorising treatment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                Quick drying technology (walkable in hours)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">✓</span>
                Compliant with real estate lease return checklists
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/industry/carpet-cleaning"
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md transition flex items-center gap-2"
              >
                View Carpet Cleaning <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="text-orange-600 hover:text-orange-700 font-bold text-sm underline"
              >
                Request Free Quote →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
