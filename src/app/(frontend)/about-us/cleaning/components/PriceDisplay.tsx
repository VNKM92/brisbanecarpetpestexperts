"use client";
import { motion } from "framer-motion";

export default function PriceDisplay({ amount }: { amount: number }) {
  return (
    <motion.div
      key={amount}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold"
    >
      ${amount.toFixed(2)}
    </motion.div>
  );
}
