"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Props {
  images: string[];
}

export default function Gallery({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const nextImg = () =>
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));

  const prevImg = () =>
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + images.length) % images.length : null
    );

  const close = () => setSelectedIndex(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="cursor-pointer rounded overflow-hidden shadow hover:opacity-80 transition"
          >
            <Image
              src={src}
              alt={`Gallery image ${idx + 1}`}
              width={600}
              height={400}
              className="object-cover w-full h-56"
            />
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-white text-4xl font-bold"
          >
            ×
          </button>

          {/* Slide Container */}
          <div className="relative max-w-3xl w-full">
            <Image
              src={images[selectedIndex]}
              alt="Selected"
              width={1000}
              height={700}
              className="rounded shadow-lg mx-auto"
            />

            {/* Prev button */}
            <button
              onClick={prevImg}
              className="absolute top-1/2 left-0 -translate-y-1/2 text-white text-4xl p-4"
            >
              ‹
            </button>

            {/* Next button */}
            <button
              onClick={nextImg}
              className="absolute top-1/2 right-0 -translate-y-1/2 text-white text-4xl p-4"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
}
