"use client";

import Select from "../Select";

export default function StepInfo({ next, back }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Additional Info</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <Select label="Preferred Time" value="Business Hours" options={["Business Hours", "Morning", "Evening"]} />
        <Select label="Pets" value="No" options={["Yes", "No"]} />
        <Select label="Home Type" value="Apartment" options={["Apartment", "House", "Townhouse"]} />
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
