"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      className="px-4 py-2 rounded-lg border hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}
    </motion.button>
  );
}
