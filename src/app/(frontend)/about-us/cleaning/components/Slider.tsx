"use client";
import React from "react";

export default function Slider({ value, min = 0, max = 500, onChange }: any) {
  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-orange-500"
      />
      <div className="text-sm font-semibold text-center mt-1">{value}</div>
    </div>
  );
}
