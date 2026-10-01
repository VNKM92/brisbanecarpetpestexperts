"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Building2, Trees, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MainCard() {
  const [active, setActive] = useState("residential");

  const tabs = [
    {
      id: "residential",
      title: "Residential Cleaning",
      shortTitle: "Residential",
      icon: <Home className="w-5 h-5 sm:w-6 sm:h-6" />,
      image: "/assets/home/image/brisbanecarpetpestexperts-slider-image2-1.jpg",
      badge: "Most Popular",
      heading: "Comprehensive Home, Bond & Carpet Care",
      content:
        "Our residential bond and steam cleaning service caters to all homes across Greater Brisbane—from studio apartments to large multi-story residences. We sanitize living rooms, bedrooms, carpets, kitchens, and tiled areas with eco-friendly products for a pristine, healthy living space.",
      features: [
        "Full End-of-Lease & Bond Guarantee",
        "Deep Carpet Hot Water Extraction",
        "Mattress & Sofa Sanitisation",
        "Safe for Children & Domestic Pets",
      ],
      link: "/services/bond-cleaning-brisbane",
    },
    {
      id: "commercial",
      title: "Commercial & Office Cleaning",
      shortTitle: "Commercial",
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />,
      image: "/assets/home/image/office-clean.jpg",
      badge: "Business Grade",
      heading: "Hygienic Workplaces & Commercial Properties",
      content:
        "We deliver reliable, recurring, and one-off commercial cleaning for corporate offices, medical clinics, retail centers, and hospitality venues in Brisbane. We keep your workspace sanitised, compliant, and welcoming for staff and clients.",
      features: [
        "Flexible After-Hours Scheduling",
        "High-Traffic Carpet Maintenance",
        "Tile, Hard Floor & Grout Polishing",
        "Custom Invoicing & SLA Reporting",
      ],
      link: "/industry/office-cleaning",
    },
    {
      id: "outdoor",
      title: "Pest Management & Specialized",
      shortTitle: "Pest & Specialty",
      icon: <Trees className="w-5 h-5 sm:w-6 sm:h-6" />,
      image: "/assets/home/image/outdoor.jpg",
      badge: "Certified Experts",
      heading: "Certified Pest Management & Exterior Pressure Wash",
      content:
        "Protect your property with certified pest management for cockroaches, spiders, ants, fleas, and rodents. Plus exterior high-pressure washing for driveways, patios, and outdoor surfaces.",
      features: [
        "End of Lease Flea & Pest Treatment",
        "Targeted Cockroach & Spider Control",
        "High-Pressure Driveway & Patio Wash",
        "Qld Health Compliant Licenced Technicians",
      ],
      link: "/services/pest-control-brisbane",
    },
  ];

  const currentTab = tabs.find((t) => t.id === active) || tabs[0];

  return (
    <section className="w-full bg-[#f9f7f3] py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-orange-500 font-bold text-xs uppercase tracking-wider bg-orange-50 px-3.5 py-1.5 rounded-full border border-orange-200">
            Tailored Cleaning Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Services Built for Every Property
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Whether it's your family home, an office, or an end-of-lease tenancy, we have the right team and equipment.
          </p>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200 inline-flex max-w-full overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer whitespace-nowrap ${
                  active === tab.id
                    ? "bg-emerald-700 text-white shadow-md"
                    : "text-gray-600 hover:text-emerald-800 hover:bg-emerald-50/50"
                }`}
              >
                {tab.icon}
                <span>{tab.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Image Section (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] w-full bg-gray-100">
                <Image
                  src={currentTab.image}
                  alt={`${currentTab.title} Brisbane`}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover transition-all duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-sm border border-emerald-100">
                  {currentTab.badge}
                </div>
              </div>
            </div>

            {/* RIGHT: Content & Features (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
                  {currentTab.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 mb-3">
                  {currentTab.heading}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {currentTab.content}
                </p>

                {/* Features Check Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {currentTab.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-100">
                <Link
                  href={currentTab.link}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full text-sm shadow-md transition flex items-center gap-2"
                >
                  Explore Service <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="text-emerald-800 hover:text-emerald-950 font-bold text-sm underline px-2 py-2"
                >
                  Get A Quick Quote →
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
