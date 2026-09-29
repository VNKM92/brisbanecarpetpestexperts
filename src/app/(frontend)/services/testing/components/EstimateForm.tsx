"use client";

import { useState } from "react";

export default function EstimateForm() {
  const [complexity, setComplexity] = useState("deep");
  const [square, setSquare] = useState(40);
  const [supplies, setSupplies] = useState(false);

  // simple dynamic pricing calculation
  const total =
    (complexity === "deep" ? 15 : 10) * square +
    (supplies ? 25 : 0);

  return (
    <div className="w-full md:w-1/2 p-8 md:p-12">
      <h2 className="text-2xl font-semibold">Get a Quick Estimate</h2>
      <p className="text-gray-500 text-sm mb-6">*For a detailed quote, use extended version</p>

      {/* Type */}
      <label className="text-sm font-semibold">TYPE OF CLEANING</label>
      <select className="w-full border rounded-lg mt-1 px-4 py-2 text-sm">
        <option>Home Cleaning</option>
        <option>Office Cleaning</option>
      </select>

      {/* Complexity */}
      <label className="text-sm font-semibold mt-5 block">COMPLEXITY</label>
      <select
        className="w-full border rounded-lg mt-1 px-4 py-2 text-sm"
        value={complexity}
        onChange={(e) => setComplexity(e.target.value)}
      >
        <option value="deep">Deep cleaning</option>
        <option value="standard">Standard cleaning</option>
      </select>

      {/* Slider */}
      <label className="text-sm font-semibold mt-5 block">SQUARE FOOTAGE: {square}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={square}
        onChange={(e) => setSquare(Number(e.target.value))}
        className="w-full mt-2"
      />

      {/* Supplies */}
      <label className="text-sm font-semibold mt-5 block">CLEANING SUPPLIES</label>
      <label className="inline-flex items-center cursor-pointer mt-2">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={supplies}
          onChange={() => setSupplies(!supplies)}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 relative 
        after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 
        after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
      </label>

      {/* Total */}
      <div className="flex justify-between items-center mt-8">
        <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold">TOTAL</button>
        <span className="text-xl font-bold text-orange-500">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
