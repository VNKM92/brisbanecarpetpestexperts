"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import StepService from "./steps/StepService";
import StepSpace from "./steps/StepSpace";
import StepAddons from "./steps/StepAddons";
import StepInfo from "./steps/StepInfo";
import StepTotal from "./steps/StepTotal";

export default function Wizard() {
  const [step, setStep] = useState(1);

  const steps = [
    <StepService key={1} next={() => setStep(2)} />,
    <StepSpace key={2} next={() => setStep(3)} back={() => setStep(1)} />,
    <StepAddons key={3} next={() => setStep(4)} back={() => setStep(2)} />,
    <StepInfo key={4} next={() => setStep(5)} back={() => setStep(3)} />,
    <StepTotal key={5} back={() => setStep(4)} />,
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg mt-10">
      <div className="flex justify-between mb-8">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold 
              ${n === step ? "bg-brand.orange text-white" : "bg-gray-300 dark:bg-gray-700"}
            `}
          >
            {n}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {steps[step - 1]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
