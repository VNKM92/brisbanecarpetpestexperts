"use client";
import React from "react";

export default function Toggle({ label, value, onChange }: any) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-10 h-6 rounded-full transition-all relative 
          ${value ? "bg-orange-500" : "bg-gray-300"}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all
          ${value ? "left-5" : "left-0.5"}`}
        />
      </button>
    </div>
  );
}
