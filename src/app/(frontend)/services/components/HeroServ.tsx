import Image from "next/image";
import { useEffect, useRef, useState } from "react";
export default function HeroServ() {

     const bigTextRef = useRef(null);
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-heroBg overflow-x-hidden">

      {/* Background Text */}
      {/* <h1
        className="absolute inset-0 flex justify-center items-start
        text-[90px] sm:text-[160px] lg:text-[280px]
        font-extrabold text-primary/20
        leading-none select-none pointer-events-none"
      >
        We Clean
      </h1> */}
      <h1 ref={bigTextRef} className="pointer-events-none absolute left-9 top-[-9rem] text-[5rem] p-[1px]   md:text-[8rem] md:mt-[149px] lg:text-[12rem] lg:mt-[35px] xl:text-[14rem] xl:mt-[35px] sm:text-[1rem] font-extrabold text-[#43934a]   transform transition-transform duration-700">we clean</h1>

      {/* Image Wrapper */}
      <div className="relative w-full flex justify-center z-10 px-4">
        <img
            src="https://qleen.bold-themes.com/demo-01/wp-content/uploads/sites/2/2025/07/hero_image_01.png"
            alt="Furniture Cleaning"
            className="w-full max-w-6xl h-auto"
            />

        {/* Pointer System */}
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
                left: "3px",
                bottom: "-0.5em",
                transform: "rotate(-45deg)",
              }}
            />

            {/* Straight Line */}
            <span className="ml-[2.2em] w-20 sm:w-28 lg:w-36 h-[1px] bg-[#ff8a00]" />

            {/* End Circle */}
            <span className="w-3 h-3 bg-[#ff8a00] rounded-full ml-0" />

            {/* Label */}
            <span
              className="absolute -top-6 left-[2.2em]
              italic text-sm sm:text-base lg:text-lg
              text-gray-600 whitespace-nowrap"
            >
              Furniture Cleaning
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
