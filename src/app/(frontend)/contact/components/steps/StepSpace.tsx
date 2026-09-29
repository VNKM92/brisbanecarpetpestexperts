"use client";

import Slider from "../Slider";

export default function StepSpace({ next, back }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Space Size</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Slider label="Square Feet" min={300} max={5000} value={800} onChange={() => {}} />
        <Slider label="Rooms" min={1} max={10} value={2} onChange={() => {}} />
        <Slider label="Bathrooms" min={1} max={10} value={1} onChange={() => {}} />
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
