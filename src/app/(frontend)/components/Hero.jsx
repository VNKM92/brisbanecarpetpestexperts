"use client";
import { useEffect, useRef, useState } from "react";
import HeadServicesSlider from '../components/HeadServicesSlider';

import Image from "next/image";
// import Link from "next/link";
// import { ChevronDown } from "lucide-react"; // added import

export default function Hero() {
  const heroRef = useRef(null);
  const bigTextRef = useRef(null);

    const [navSolid, setNavSolid] = useState(false);

  useEffect(() => {
    function onScroll() {
      setNavSolid(window.scrollY > 20);
      // parallax
      if (bigTextRef.current) {
        const y = window.scrollY;
        const offset = Math.min(y * 0.2, 120);
        bigTextRef.current.style.transform = `translateY(${offset}px) scale(${1 - Math.min(y/2000,0.08)})`;
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // intersection observer for hero elements (fade-in)
    const hero = heroRef.current;
    if (!hero) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-[#f9f7f3] antialiased"> 

      {/* Hero */}
      <main className="pt-30 h-screen flex items-center relative overflow-hidden">

        {/*  bg-[url('/home-clean.jpg')] bg-cover bg-center bg-no-repeat */}
        
        <section className="relative  ">
          <div className="max-w-7xl mx-auto px-6 flex items-center gap-10 mt-6 md:mt-30 lg:mt-7">
            <h1 ref={bigTextRef} className="pointer-events-none absolute left-9 top-[-9rem] text-[5rem] p-[1px]   md:text-[8rem] md:mt-[149px] lg:text-[12rem] lg:mt-[35px] xl:text-[14rem] xl:mt-[35px] sm:text-[1rem] font-extrabold text-[#43934a]   transform transition-transform duration-700">we clean</h1>
            <div className="flex-1 z-10" />
            {/* <!-- Right: furniture image --> */}
            {/* start */}
            {/* Image Wrapper */}
            <div className="relative w-full flex justify-center z-10 px-4 mt-12">
              <img
              src="https://qleen.bold-themes.com/demo-01/wp-content/uploads/sites/2/2025/07/hero_image_01.png"
              alt="Furniture Cleaning"
              className="w-full max-w-6xl h-auto"
              />
              {/* Pointer System */}
                <div className="hidden md:block msdata mt-[67px] absolute mr-[63px]  " >
                  <div
                    className="absolute
                    bottom-[36%] sm:bottom-[40%] lg:bottom-[42%]
                    left-1/2 -translate-x-1/2"
                  >
                    <div className="relative flex items-center">

                      {/* Animated Start Circle */}
                      <span
                        className="relative w-5 h-5 bg-[#ff8a00] rounded-full pulse-circle"
                        style={{
                          position: "absolute",
                          left: "5px",
                          bottom: "-26px",
                          transform: "rotate(-45deg)",
                        }}
                      />

                      {/* Angled Line */}
                      <span
                        className="bg-[#ff8a00]"
                        style={{
                          height: "1px",
                          width: "2.5em",
                          position: "absolute",
                          left: "1px",
                          bottom: "-0.7em",
                          transform: "rotate(-45deg)",
                        }}
                      />

                      {/* Straight Line */}
                      <span className="ml-[2.2em] mt-[1px] w-20 sm:w-28 lg:w-36 h-[1px] bg-[#ff8a00]" />

                      {/* End Circle */}
                      <span className="w-2 h-2 bg-[#ff8a00] rounded-full ml-0" />

                      {/* Label */}
                      <span
                        className="font-cursive absolute -top-6 left-[2.2em] font-caveat
                        italic text-sm sm:text-base lg:text-lg
                        text-gray-100 whitespace-nowrap"
                      >
                        Furniture Cleaning
                      </span>
                    </div>
                  </div>
                </div>
            </div>
            {/* end */}
          </div>
          <div  />
        </section>
        {/* <!-- Section Container --> */}
           
      </main>
      {/* slider section */}
      <HeadServicesSlider />   
      {/* slider section end */}
    </div>
  );
}
