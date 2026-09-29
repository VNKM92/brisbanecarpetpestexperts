"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServiceTabs() {
  const [active, setActive] = useState("residential");

  const tabs = [
    {
      id: "residential",
      title: "Residential",
      icon: "https://img.icons8.com/ios/50/home--v1.png",
      image: "/assets/home/image/brisbanecarpetpestexperts-slider-image2-1.jpg",
      content:
        "Our residential bond cleaning service caters to all types of homes, from apartments to large houses. We clean all rooms, including living areas, bedrooms, bathrooms, kitchens, and more. Our team uses eco-friendly products to ensure a safe and healthy environment for the next occupants.",
    },
    {
      id: "commercial",
      title: "Commercial",
      icon: "https://img.icons8.com/?size=100&id=39829&format=png&color=000000",
      image: "/assets/home/image/office-clean.jpg",
      content:
        "We provide reliable commercial cleaning for offices, retail spaces, and business properties. Our team ensures a hygienic and organized environment, helping your business operate efficiently.",
    },
    {
      id: "outdoor",
      title: "Outdoor",
      icon: "https://img.icons8.com/?size=100&id=MAgYupB4462c&format=png&color=000000",
      image: "/assets/home/image/outdoor.jpg",
      content:
        "Our outdoor cleaning service includes pressure washing, garden cleanup, driveway cleaning, and exterior maintenance. Designed to refresh and restore the exterior of your home or business.",
    },
  ];
  

  return (
    <>
    <section className="w-full bg-gradient-to-b from-green-100 to-green-200 py-16 px-6  rounded-[10px] px-6 md:px-16 py-16 shadow-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Image Section */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-xl">
            {tabs.map((tab) => (
              <Image
                key={tab.id}
                src={tab.image}
                alt={`${tab.title} Service`}
                width={500}
                height={400}
                className={`w-full rounded-3xl shadow-xl transition-all duration-500 ease-in-out object-cover ${
                  active === tab.id
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute inset-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Right Side */}
        <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">

          {/* Tabs */}
          <div className="flex justify-center gap-10 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex flex-col items-center text-center transition-all ${
                  active === tab.id
                    ? "text-orange-600 font-semibold"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                <img src={tab.icon} className="w-10 mb-1 opacity-80" />
                <span
                  className={`${
                    active === tab.id ? "underline underline-offset-4" : ""
                  }`}
                >
                  {tab.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
            {tabs.find((t) => t.id === active).title}
          </h2>

          <p className="text-gray-600 text-center leading-relaxed mb-8">
            {tabs.find((t) => t.id === active).content}
          </p>

          {/* Button */}
          <div className="text-center">
            

            {/* BUTTON */}
            <Link href="/special-offers">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition flex items-center mx-auto">
              Read More →
            </button>
            </Link>
          </div>
          
          {/* Divider */}
          <div className="mt-10 border-t border-gray-200"></div>
        </div>
      </div>
    </section>


    </>
  );
}
