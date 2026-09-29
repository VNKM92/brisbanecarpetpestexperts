"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "./motionVariants";

export default function ServiceCard() {
  return (
    <section className="w-full relative -mt-15">
      <div className="max-w-7xl mx-auto bg-white rounded-[50px] px-6 md:px-16 py-16 shadow-lg">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-semibold">
            Popular Services by Brisbane
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-600">
            {[
              "Background checked cleaners",
              "Insurance coverage up to $1M",
              "No Contracts or Commitments",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 bg-[#43934a] rounded-full text-white" > ✔ </span>
                  {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CARD */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 bg-[#faf7f2] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8"
        >
          {/* IMAGE WITH ORANGE FALLBACK */}
          <div className="relative w-full md:w-1/2 flex justify-center items-center">
            <div className="absolute inset-0 bg-brandOrange rounded-2xl" />

            <Image
              src="/assets/about/carpet-service-1.jpg"
              alt="Cleaning Service"
              width={360}
              height={360}
              className="relative z-10 object-contain p-6"
              onError={(e) =>
                ((e.target as HTMLImageElement).style.display = "none")
              }
            />
          </div>

          {/* CONTENT */}
          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              A Sparkling Clean Home
            </h3>

            <p className="text-gray-600 mb-5 text-sm md:text-base">
              A worry-free recurring cleaning service to keep your home tidy,
              fresh, and healthy.
            </p>

            <ul className="space-y-2 text-gray-600 text-sm">
              <li>✔ Bathroom cleaning</li>
              <li>✔ Kitchen wipe-down</li>
              <li>✔ Vacuuming & mopping floors</li>
              <li>✔ Dusting all surfaces</li>
            </ul>
          </div>
        </motion.div>

        {/* PRICE */}
        <div className="flex justify-end mt-[-56px] mr-[-12px]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-tl-3xl rounded-tr-2xl rounded-bl[20px] px-16 py-3 flex items-center gap-3"
          >
             {/* shadow-sm  */}
            <span className="text-3xl font-semibold">$29</span>
            <span className="text-sm text-gray-500">/ per hour</span>
            <span className="w-8 h-8 bg-[#ff7f00] text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all duration-300 hover:scale-110">
              →
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
