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

      {/* Search */}
      

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
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
