"use client";

import React from "react";

export default function Slider({ label, value, min, max, onChange }: any) {
  return (
    <div>
      <label className="text-sm text-gray-700">{label}</label>
      <input
        type="range"
        className="w-full mt-2"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <p className="text-center font-medium mt-1">{value}</p>
    </div>
  );
}
