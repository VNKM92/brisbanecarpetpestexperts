"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProcessSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-quart",
      once: true,
    });
  }, []);

  const steps = [
    {
      title: "Share Your Facility The Details",
      desc: "Share specific details about your age care facility, including size and cleaning needs, to help us tailor our services.",
      icon: "https://cdn-icons-png.flaticon.com/512/1047/1047711.png",
      delay: 0,
    },
    {
      title: "Select the Right Plan For You",
      desc: "Choose the cleaning plan that best fits your facility’s requirements and schedule, ensuring it meets all your needs.",
      icon: "https://cdn-icons-png.flaticon.com/512/2920/2920248.png",
      delay: 200,
    },
    {
      title: "Schedule Online Effortlessly",
      desc: "Easily schedule your cleaning services online with just a few clicks, making the process quick and convenient.",
      icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
      delay: 400,
    },
    {
      title: "Thorough Cleaning & Swift Departure",
      desc: "Our team performs thorough cleaning with attention to detail, then leaves promptly to minimize disruption.",
      icon: "https://cdn-icons-png.flaticon.com/512/809/809957.png",
      delay: 600,
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-green-300 via-green-200 to-green-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Title Block */}
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="text-green-700 text-xl font-semibold mb-2">
            Discover Our Process!
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
            Simple Steps to Achieve a <br /> Clean and Healthy Space
          </h2>
        </div>

        {/* Timeline */}
        <div
          className="relative flex justify-between items-center mb-20"
          data-aos="fade-up"
        >
          <div className="absolute top-1/2 left-0 w-full border-t border-green-500/40 -z-10"></div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-white border-4 border-green-500 rounded-full shadow-md"
            ></div>
          ))}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {steps.map((s, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={s.delay}
              className="
                group
                bg-white/40 
                backdrop-blur-sm
                rounded-xl 
                p-6 
                shadow-md 
                transition-all 
                duration-300 
                hover:shadow-2xl 
                hover:-translate-y-2 
                hover:bg-white/60
              "
            >
              <h3 className="text-xl font-semibold text-green-900 mb-4 leading-snug">
                {s.title}
              </h3>

              <p className="text-green-800/70 mb-6">{s.desc}</p>

              <div className="flex justify-center">
                <img
                  src={s.icon}
                  className="w-14 opacity-80 transition-transform duration-300 group-hover:scale-110"
                  alt="icon"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
