"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

const defaultTestimonials = [
  {
    text:
      "Great response time, staff was on time and got the job done pretty quickly. House looked great when they finished.",
    name: "Rebecca Hawland",
    avatar: "/testimonial/user3.jpg",
  },
  {
    text:
      "They were mindful of using natural cleaning products for my kids room, which I was very appreciative of.",
    name: "Annie Bennedict",
    avatar: "/testimonial/user1.jpg",
  },
];

export default function Testimonials() {
  const [items, setItems] = useState(defaultTestimonials);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data && json.data.length > 0) {
          setItems(
            json.data.map((t: any) => ({
              text: t.review,
              name: t.clientName,
              avatar: t.avatar || "/testimonial/user1.jpg",
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <section className="relative max-w-7xl mx-auto bg-[#43934a] rounded-[30px] overflow-hidden">

      {/* Bubbles */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full bubble" />
      <div className="absolute bottom-20 left-32 w-14 h-14 bg-white/20 rounded-full bubble delay-200" />
      <div className="absolute top-16 right-24 w-16 h-16 bg-white/20 rounded-full bubble delay-500" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center p-6 lg:p-14">

        {/* LEFT */}
        <div className="text-white space-y-6">

          <p className="italic text-sm opacity-90">Testimonials</p>

          <h2 className="text-3xl lg:text-4xl font-bold">
            What Our Clients Think
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-2 bg-white/90 text-black px-4 py-2 rounded-full w-fit">
            <Image
              src="/testimonial/google.svg"
              width={16}
              height={16}
              alt="Google"
            />
            
            <span className="text-yellow-400">★★★★★</span>
            <span className="text-sm font-semibold">4.7</span>
          </div>

          {/* Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((item, i) => (
                <div key={i} className="min-w-full pr-4">
                  <div className="bg-white text-gray-800 rounded-2xl p-6 shadow-lg">
                    <span className="text-orange-500 text-3xl font-bold">“</span>
                    <p className="text-sm mt-2">{item.text}</p>

                    <div className="flex items-center gap-3 mt-4">
                      <Image
                        src={item.avatar}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt={item.name}
                      />
                      <div>
                        <p className="font-semibold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Client</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {items.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    index === i ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <Image
            src="/testimonial/testimonial.jfif"
            width={600}
            height={600}
            className="rounded-2xl object-cover shadow-xl"
            alt="Client"
          />
        </div>

      </div>
    </section>
  )
}
