"use client";

import { useState, useMemo } from "react";
import FAQItem from "./FAQItem";

interface Category {
  name: string;
  items: { title: string; content: string }[];
}

export default function FAQSection({ categories }: { categories: Category[] }) {
  const [activeTab, setActiveTab] = useState(categories[0].name);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const currentCategory = categories.find(c => c.name === activeTab)!;

  const filteredItems = useMemo(() => {
    if (!search.trim()) return currentCategory.items;
    return currentCategory.items.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, currentCategory]);

  return (
    <div className="max-w-6xl mx-auto mt-12">

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => {
              setActiveTab(cat.name);
              setOpenIndex(null);
              setSearch("");
            }}
            className={`px-5 py-2 rounded-full border transition 
            ${activeTab === cat.name
              ? "bg-green-600 text-white border-green-600"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-10">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map((item, index) => (
          <FAQItem
            key={index}
            title={item.title}
            content={item.content}
            open={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
}
