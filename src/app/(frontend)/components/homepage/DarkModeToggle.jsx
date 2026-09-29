"use client";

import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-4 py-2 bg-white dark:bg-gray-700 shadow rounded-lg text-sm"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
