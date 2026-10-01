"use client";

import Link from "next/link";
import { Phone, Mail, ArrowRight, MessageSquare } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function Floatingbubbles() {
  return (
    <div className="w-full bg-[#f9f7f3]">
      {/* Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="relative bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-8 sm:p-12 md:p-16 text-white shadow-xl overflow-hidden text-center">
          
          {/* Subtle decorative circles */}
          <div className="absolute w-40 h-40 bg-white/10 rounded-full -left-10 -top-10 blur-xl pointer-events-none" />
          <div className="absolute w-48 h-48 bg-emerald-400/10 rounded-full -right-10 -bottom-10 blur-xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-600/30">
              Fast Booking Across Brisbane
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready for a Cleaner, Fresher Home?
            </h2>

            <p className="mt-4 text-emerald-100/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Book online in 60 seconds, call our dispatch team directly, or send us your property cleaning requirements.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/request-estimate"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-full text-sm sm:text-base shadow-lg transition flex items-center gap-2"
              >
                Book Online Now <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="tel:0434061188"
                className="bg-white/15 hover:bg-white/25 text-white font-bold px-6 py-4 rounded-full text-sm sm:text-base border border-white/30 backdrop-blur-sm transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-400" /> Call 0434 061 188
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Highlight Section */}
      <ServiceCard />
    </div>
  );
}
