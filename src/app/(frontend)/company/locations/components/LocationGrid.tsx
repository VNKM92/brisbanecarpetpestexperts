"use client";

import LocationPinIcon from "./LocationPinIcon";

export default function LocationGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10">
      {items.map((item) => (
        <div
          key={item}
          className="flex flex-col items-center gap-3 animate-fadeIn"
        >
          <LocationPinIcon className="w-20 h-20 text-blue-900" />
          <span className="text-sm text-gray-800 text-center">{item}</span>
        </div>
      ))}
    </div>
  );
}
