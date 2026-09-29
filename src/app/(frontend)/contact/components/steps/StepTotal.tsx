"use client";

import { motion } from "framer-motion";

export default function StepTotal({ back }: any) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">Your Estimated Total</h2>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-brand.green text-white px-10 py-6 rounded-xl text-3xl font-bold inline-block"
      >
        $354.00
      </motion.div>

      <div className="flex justify-center mt-10 gap-4">
        <button onClick={back} className="px-6 py-3 rounded-lg border">
          ← Back
        </button>
        <button className="px-8 py-3 bg-brand.orange text-white rounded-lg font-semibold">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
