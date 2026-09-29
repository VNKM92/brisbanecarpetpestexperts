"use client";

import Image from "next/image";
import { services } from "../data/services";

export default function ServicesCarousel() {
  return (
    <div className="relative max-w-5xl mx-auto mt-10 overflow-x-hidden">

      {/* Left Arrow */}
      <button className="absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border flex items-center justify-center bg-white shadow z-10">
        &lt;
      </button>

      {/* Slider */}
      <div className="flex gap-6 overflow-x-auto px-12 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-100">
        {services.map(service => (
          <div key={service.id} className="min-w-[200px] bg-white shadow rounded-xl overflow-hidden">
            <Image
              src={service.image}
              alt={service.title}
              width={300}
              height={200}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{service.title}</h3>
              <p className="text-sm text-green-600 mt-2">From ${service.priceFrom}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button className="absolute right-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border flex items-center justify-center bg-white shadow">
        &gt;
      </button>
    </div>
  );
}
