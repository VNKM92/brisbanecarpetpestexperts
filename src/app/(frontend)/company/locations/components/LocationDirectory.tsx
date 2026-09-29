"use client";

import { useState, useMemo } from "react";
import LocationGrid from "./LocationGrid";

export default function LocationDirectory({ suburbs }: { suburbs: string[] }) {
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const filtered = suburbs.filter((s) =>
      s.toLowerCase().includes(query.toLowerCase())
    );

    return filtered.reduce((acc: any, suburb) => {
      const letter = suburb[0].toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(suburb);
      return acc;
    }, {});
  }, [query, suburbs]);

  const letters = Object.keys(grouped).sort();

  return (
    <div className="w-full max-w-6xl mx-auto p-6">

      {/* Search */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search suburbs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Letter Sidebar (desktop only) */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col gap-3">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="text-blue-700 font-semibold hover:text-blue-900"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Section list */}
      <div className="space-y-20">
        {letters.map((letter) => (
          <section id={letter} key={letter}>
            <h2 className="text-lg font-semibold mb-4">{letter}</h2>
            <hr className="border-gray-300 mb-8" />

            <LocationGrid items={grouped[letter]} />
          </section>
        ))}
      </div>
    </div>
  );
}
