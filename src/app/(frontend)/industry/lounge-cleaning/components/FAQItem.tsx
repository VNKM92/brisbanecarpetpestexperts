"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  title: string;
  content: string;
  open: boolean;
  onToggle: () => void;
}

export default function FAQItem({ title, content, open, onToggle }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-md transition p-5">
      <button
        onClick={() => {
          onToggle();
          setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 120);
        }}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={open}
        aria-controls={`faq-content-${title}`}
      >
        <span className="font-semibold text-gray-900 dark:text-white">{title}</span>

        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-gray-500"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            id={`faq-content-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm leading-relaxed pr-2">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
