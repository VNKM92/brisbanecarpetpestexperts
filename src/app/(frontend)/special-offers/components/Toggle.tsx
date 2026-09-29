"use client";

export default function Toggle({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span
          className={`absolute inset-0 rounded-full transition 
          ${checked ? "bg-green-600" : "bg-gray-300"}`}
        ></span>
        <span
          className={`absolute h-5 w-5 bg-white rounded-full top-0.5 left-0.5 
          transform transition 
          ${checked ? "translate-x-6" : ""}`}
        ></span>
      </div>
      <span className="text-gray-700">{label}</span>
    </label>
  );
}
