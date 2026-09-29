"use client";

import Toggle from "../Toggle";

export default function StepAddons({ next, back }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Add-On Services</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        <Toggle label="Fridge Cleaning" />
        <Toggle label="Oven Cleaning" />
        <Toggle label="Windows" />
        <Toggle label="Carpet Cleaning" />
        <Toggle label="Balcony Cleaning" />
        <Toggle label="Laundry" />
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={back} className="px-6 py-3 rounded-lg border">
          ← Back
        </button>
        <button onClick={next} className="px-6 py-3 bg-brand.orange text-white rounded-lg">
          Continue →
        </button>
      </div>
    </div>
  );
}
